const xlsx = require('xlsx');
const fs = require('fs');

const workbook = xlsx.readFile('./public/data/Website data_1-7-2025.xlsx');
const sheet = workbook.Sheets['Page 3- #Pick_your_retrofit'];

const json = xlsx.utils.sheet_to_json(sheet, { header: 1 });

const result = {};

for (let i = 0; i < json.length; i++) {
    const row = json[i];
    if (!row || row.length === 0) continue;

    const code = row[row.length - 1];

    // Check if code is a string and looks like a valid code (R_1, W_2, F1_GLAZE_2_BCR_W_3, BCR, BCW, BC_GLAZE)
    if (typeof code === 'string' && (code.includes('_') || code === 'BCR' || code === 'BCW' || code.includes('GLAZE'))) {

        // Ensure there are enough numbers behind it
        if (row.length >= 7) {
            const ge = row[row.length - 7];
            const gc = row[row.length - 6];
            const g1e = row[row.length - 5];
            const g1c = row[row.length - 4];
            const g2e = row[row.length - 3];
            const g2c = row[row.length - 2];

            // Only parse if they are all numbers
            if (typeof ge === 'number' && typeof gc === 'number' &&
                typeof g1e === 'number' && typeof g1c === 'number' &&
                typeof g2e === 'number' && typeof g2c === 'number') {

                // Convert to percentage and positive savings (by multiplying by -100)
                const toPct = (val) => parseFloat((-val * 100).toFixed(2));

                result[code.trim()] = {
                    ground: [toPct(ge), toPct(gc)],
                    g1: [toPct(g1e), toPct(g1c)],
                    g2: [toPct(g2e), toPct(g2c)]
                };
            }
        }
    }
}

// Write this out to public/calculation_data.json
fs.writeFileSync('./public/calculation_data.json', JSON.stringify(result, null, 2));

console.log("Extracted keys length:", Object.keys(result).length);
console.log("Sample W_23:", result['W_23']);

// Also extract colour thresholds rules from somewhere? We know them: Window/Roof: 10/20 & 5/10. Wall: ? 
// Actually, earlier note showed Roof: 10/20 (energy), 5/10 (cost).
