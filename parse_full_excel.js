const xlsx = require('xlsx');
const fs = require('fs');

const workbook = xlsx.readFile('./public/data/Website data_1-7-2025.xlsx');
const sheet = workbook.Sheets['Page 3- #Pick_your_retrofit'];

const json = xlsx.utils.sheet_to_json(sheet, { header: 1 });
const result = {};
const toPct = (val) => {
    if (typeof val === 'number') {
        const pct = -val * 100;
        return parseFloat(pct.toFixed(2));
    }
    return 0;
};

// Start explicitly parsing
// Frame offsets:
// 24-33: Wooden (F1)
// 34-42: Aluminium (F2) (Wait, 9 items: BC, 1 to 8)
// Let's just do it sequentially. The labels are in column 1 (index 1) or 0?
// Wait, Aluminum starts at row 34. Let's trace it.
let currentPrefix = "F1";
for (let i = 24; i < json.length; i++) {
    const row = json[i] || [];
    if (row.length === 0) continue;

    // Find string that contains F1_ or F_ etc.
    // The case code seems to be the last or second last element.
    let code = null;
    let label1 = String(row[0] || "");
    if (label1.includes("Wooden")) currentPrefix = "F1";
    if (label1.includes("Aluminium")) currentPrefix = "F2";
    if (label1.includes("MS Steel")) currentPrefix = "F3";
    if (label1.includes("Fibreglass")) currentPrefix = "F4";
    if (label1.includes("PVC / Vinyl")) currentPrefix = "F5";

    for (const cell of row) {
        if (typeof cell === 'string' && (cell.includes('F1_') || cell.includes('F2_') || cell.includes('_GLAZE'))) {
            code = cell.trim();
        }
    }

    if (code) {
        // If code incorrectly starts with F1_ but we are in Aluminium, fix it:
        code = code.replace(/^F1_/, currentPrefix + "_");

        // Windows only have Energy reduction (no Cost reduction). We'll set cost to energy!
        // The last 3 numbers before the code are G2, G1, G
        let nums = row.filter(x => typeof x === 'number');
        if (nums.length >= 3) {
            let g = toPct(nums[nums.length - 3]);
            let g1 = toPct(nums[nums.length - 2]);
            let g2 = toPct(nums[nums.length - 1]);
            result[code] = { ground: [g, g], g1: [g1, g1], g2: [g2, g2] };
        }
    }
}

// Now process Roof and Walls (from the bottom?)
// Actually, earlier parse_excel.js missed Wall codes that weren't exact layout.
// Let's just re-use the generic parser for Roof and Walls
for (let i = 0; i < json.length; i++) {
    const row = json[i];
    if (!row || row.length === 0) continue;

    let code = null;
    for (const cell of row) {
        if (typeof cell === 'string' && (cell.match(/^R_\d+$/) || cell.match(/^W_\d+$/) || cell === 'BCR' || cell === 'BCW' || cell.includes('_BCR_') || cell.includes('_BCW'))) {
            code = cell.trim();
        }
    }

    if (code && !result[code]) {
        // Find the 6 numbers
        let nums = row.filter(x => typeof x === 'number');
        if (nums.length >= 6) {
            result[code] = {
                ground: [toPct(nums[nums.length - 6]), toPct(nums[nums.length - 5])],
                g1: [toPct(nums[nums.length - 4]), toPct(nums[nums.length - 3])],
                g2: [toPct(nums[nums.length - 2]), toPct(nums[nums.length - 1])]
            };
        }
    }
}

fs.writeFileSync('./public/calculation_data.json', JSON.stringify(result, null, 2));
console.log("Extracted keys length:", Object.keys(result).length);
