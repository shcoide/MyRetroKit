const fs = require('fs');

const calcData = require('./public/calculation_data.json');
let dataTs = fs.readFileSync('./src/lib/data.ts', 'utf-8');

const startStr = 'export const performanceData: Record<string, { ground: number[], g1: number[], g2: number[] }> = {';

let performanceDataIndex = dataTs.indexOf('export const performanceData = {');
if (performanceDataIndex === -1) {
    performanceDataIndex = dataTs.indexOf('export const performanceData');
}

if (performanceDataIndex !== -1) {
    // replace everything from performanceDataIndex to the end.
    let newDataTs = dataTs.substring(0, performanceDataIndex);
    newDataTs += startStr + '\n';

    const keys = Object.keys(calcData);
    for (let i = 0; i < keys.length; i++) {
        newDataTs += `  "${keys[i]}": ${JSON.stringify(calcData[keys[i]])}${i < keys.length - 1 ? ',' : ''}\n`;
    }
    newDataTs += '};\n';

    fs.writeFileSync('./src/lib/data.ts', newDataTs);
    console.log("Updated data.ts");
} else {
    console.log("Could not find performanceData inside data.ts");
}
