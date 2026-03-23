import { performanceData } from "./data";

export type EnvelopeType = "windows" | "roof" | "walls" | "combo";

const normalizeCode = (input: string) =>
    input
        .replace(/\s+/g, "")
        // Excel-derived keys sometimes end up with double/trailing underscores (ex: `R_7_`),
        // so normalize multiple underscores to a single underscore.
        .replace(/_+/g, "_")
        .replace(/^_+|_+$/g, "");

export const getEnergyColor = (value: number, type: EnvelopeType) => {
    // Thresholds extracted from Excel:
    // - Windows tab (energy): 0..1.5 => red, 1.5..3 => yellow, >3 => green
    // - Roof/Walls tab (energy): 0..10 => red, 10..20 => yellow, >20 => green
    // - Windows + Roof + Walls tab (energy): 0..10 => red, 10..20 => yellow, >20 => green
    if (type === "windows") {
        if (value > 0 && value < 1.5) return { color: "#800000", label: "Least Impact" };
        if (value >= 1.5 && value <= 3) return { color: "#F9A602", label: "Moderate Impact" };
        if (value > 3) return { color: "#033500", label: "Best Performance" };
        return { color: "#800000", label: "Least Impact" };
    }

    // roof | walls | combo
    if (value > 0 && value < 10) return { color: "#800000", label: "Least Impact" };
    if (value >= 10 && value <= 20) return { color: "#F9A602", label: "Moderate Impact" };
    if (value > 20) return { color: "#033500", label: "Best Performance" };
    return { color: "#800000", label: "Least Impact" };
};

export const getCostColor = (value: number, type: EnvelopeType) => {
    // Thresholds extracted from Excel:
    // - Windows tab (cost): 0..1.5 => red, 1.5..3 => yellow, >3 => green
    // - Roof/Walls/Combo tab (cost): 0..5 => red, 5..10 => yellow, >10 => green
    if (type === "windows") {
        if (value > 0 && value < 1.5) return { color: "#800000", label: "Least Impact" };
        if (value >= 1.5 && value <= 3) return { color: "#F9A602", label: "Moderate Impact" };
        if (value > 3) return { color: "#033500", label: "Best Performance" };
        return { color: "#800000", label: "Least Impact" };
    }

    // roof | walls | combo
    if (value > 0 && value < 5) return { color: "#800000", label: "Least Impact" };
    if (value >= 5 && value <= 10) return { color: "#F9A602", label: "Moderate Impact" };
    if (value > 10) return { color: "#033500", label: "Best Performance" };
    return { color: "#800000", label: "Least Impact" };
};

export const calculateSavings = (
    combinationCode: string,
    storey: string,
    components?: {
        window?: string;
        roof?: string;
        wall?: string;
    }
) => {
    const cleanCode = normalizeCode(combinationCode);
    const s = normalizeCode(storey);

    // 1. Try exact match first (might be a pre-calculated combo)
    const exactMatchKey = Object.keys(performanceData).find((key) => {
        const normalizedKey = normalizeCode(key);
        return normalizedKey === cleanCode;
    });

    if (exactMatchKey) {
        const result = performanceData[exactMatchKey];
        let savings: number[] = [0, 0];
        if (s === "G" || s === "G.floor") savings = result.ground;
        else if (s === "G+1") savings = result.g1;
        else if (s === "G+2") savings = result.g2;
        return {
            energyReduction: savings[0],
            costReduction: savings[1],
            found: true,
        };
    }

    // 2. Fallback: Sum individual components if components are provided
    if (components) {
        let totalEnergy = 0;
        let totalCost = 0;
        let foundAny = false;

        const addContribution = (partCode: string) => {
            const key = Object.keys(performanceData).find(k => normalizeCode(k) === normalizeCode(partCode));
            if (key) {
                const result = performanceData[key];
                let savings: number[] = [0, 0];
                if (s === "G" || s === "G.floor") savings = result.ground;
                else if (s === "G+1") savings = result.g1;
                else if (s === "G+2") savings = result.g2;

                totalEnergy += savings[0];
                totalCost += savings[1];
                foundAny = true;
            }
        };

        if (components.window) addContribution(components.window);
        if (components.roof) addContribution(components.roof);
        if (components.wall) addContribution(components.wall);

        if (foundAny) {
            return {
                energyReduction: parseFloat(totalEnergy.toFixed(2)),
                costReduction: parseFloat(totalCost.toFixed(2)),
                found: true
            };
        }
    }

    return { energyReduction: 0, costReduction: 0, found: false };
};