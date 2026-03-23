const xlsx = require('xlsx');
const workbook = xlsx.readFile('./public/data/Website data_1-7-2025.xlsx');
workbook.SheetNames.forEach(sheetName => {
    console.log(`\n\n--- Sheet: ${sheetName} ---`);
    const sheet = workbook.Sheets[sheetName];
    const json = xlsx.utils.sheet_to_json(sheet, { header: 1 });
    // Print first 40 rows
    for (let i = 0; i < Math.min(40, json.length); i++) {
        if (!json[i]) continue;
        console.log(`Row ${i}:`, json[i].filter(c => c !== undefined && c !== '').join(' | '));
    }
});
