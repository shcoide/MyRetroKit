const xlsx = require('xlsx');

const workbook = xlsx.readFile('./public/data/Website data_1-7-2025.xlsx');
const sheet = workbook.Sheets['Page 3- #Pick_your_retrofit'];
if (sheet) {
    const json = xlsx.utils.sheet_to_json(sheet, { header: 1 });
    console.log(`\n--- Rules Search ---`);
    for (let i = 0; i < json.length; i++) {
        const row = json[i];
        if (row && row.some(cell => typeof cell === 'string' && cell.includes('COLOUR SHADES'))) {
            console.log(`\nFound Rule Header at row ${i}:`);
            for (let j = i; j < i + 10; j++) {
                if (json[j] && json[j].some(c => c)) console.log(`Row ${j}:`, json[j].filter(c => c).join(' | '));
            }
        }
    }
}
