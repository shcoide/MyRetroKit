"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useMemo, useEffect } from "react";
import { calculateSavings, getCostColor, getEnergyColor, type EnvelopeType } from "@/lib/calculations";
import { siteData, performanceData } from "@/lib/data";

function VisualizeContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const code = searchParams.get("code") || "";
    const storey = searchParams.get("storey") || "";
    const type = (searchParams.get("type") || "") as EnvelopeType;
    const windowFrame = searchParams.get("windowFrame") || "";
    const windowGlaze = searchParams.get("windowGlaze") || "";
    const roofCode = searchParams.get("roofCode") || "";
    const wallCode = searchParams.get("wallCode") || "";

    const hasRequiredData = !!(code && storey && type);

    useEffect(() => {
        if (!hasRequiredData) {
            router.replace("/pick-your-retrofit");
        }
    }, [hasRequiredData, router]);

    const { energyReduction, costReduction, found } = calculateSavings(code, storey, {
        window: windowFrame && windowGlaze ? `${windowFrame}_${windowGlaze}` : undefined,
        roof: roofCode || undefined,
        wall: wallCode || undefined,
    });
    const energyStyle = getEnergyColor(energyReduction, type);
    const costStyle = getCostColor(costReduction, type);

    const houseImageSrc = useMemo(() => {
        return storey === "G"
            ? "/assets/G.jpg"
            : storey === "G+1"
                ? "/assets/G+1.jpg"
                : "/assets/G+2.jpg";
    }, [storey]);

    const windowAssemblyOptions = useMemo(() => {
        const DELIM = "|||";
        const options: Array<{ value: string; label: string; frame: string; glaze: string }> = [];
        for (const f of siteData.windowFrames) {
            for (const g of siteData.windowGlazing) {
                const combinedCode = `${f.codePrefix}_${g.codeSuffix}`;
                const isSupported = Object.keys(performanceData).some(key => key.includes(combinedCode));
                if (isSupported) {
                    options.push({
                        value: `${f.codePrefix}${DELIM}${g.codeSuffix}`,
                        label: `${f.label} frame with ${g.label}`,
                        frame: f.codePrefix,
                        glaze: g.codeSuffix,
                    });
                }
            }
        }
        return options;
    }, []);

    const supportedRoofOptions = useMemo(() => {
        return siteData.roofOptions.filter(r => Object.keys(performanceData).some(key => key.includes(r.code)));
    }, []);

    const supportedWallOptions = useMemo(() => {
        return siteData.wallOptions.filter(w => Object.keys(performanceData).some(key => key.includes(w.code)));
    }, []);

    const windowAssemblyValue = windowFrame && windowGlaze ? `${windowFrame}|||${windowGlaze}` : "";

    const showWindowsValue = type === "windows" || type === "combo";
    const showRoofValue = type === "roof" || type === "combo";
    const showWallsValue = type === "walls" || type === "combo";

    const updateParams = (updates: Record<string, string>) => {
        const params = new URLSearchParams(searchParams.toString());
        for (const [key, value] of Object.entries(updates)) {
            params.set(key, value);
        }
        router.replace(`?${params.toString()}`, { scroll: false });
    };

    if (!hasRequiredData) {
        return (
            <div className="flex-grow flex flex-col items-center justify-center w-full z-10 px-4">
                <div className="bg-white/95 rounded-3xl px-10 py-8 shadow-xl border border-black/10 text-center max-w-md">
                    <div className="text-[#5C3A21] font-black text-xl mb-2">Redirecting…</div>
                    <p className="text-[#3B3B3B] font-semibold text-base">
                        Please fill in your retrofit details first.
                    </p>
                </div>
            </div>
        );
    }

    const inputStyle = { backgroundImage: "url('data:image/svg+xml;utf8,<svg fill=\"black\" height=\"28\" viewBox=\"0 0 24 24\" width=\"28\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7 10l5 5 5-5z\"/><path d=\"M0 0h24v24H0z\" fill=\"none\"/></svg>')", backgroundRepeat: "no-repeat", backgroundPositionX: "98%", backgroundPositionY: "center" };

    return (
        <div className="flex-grow flex flex-col pt-0 w-full z-10 px-4 md:px-0">
            <div className="max-w-6xl mx-auto w-full px-2 md:px-8 relative z-10">
                <div className="bg-[#EFEEE9]/80 backdrop-blur-md px-4 md:px-10 border border-white/40 shadow-sm relative z-10 pb-12 pt-10 rounded-[2rem]">
                    <div className="space-y-4 max-w-4xl mx-auto">
                        
                        {showWindowsValue && (
                            <div className="flex flex-col md:flex-row gap-4 items-center">
                                <div className="bg-white/95 rounded-full px-6 py-2.5 w-full md:w-[260px] font-black shadow-md text-[#5C3A21] text-lg border border-white/60 shrink-0 text-center md:text-left">
                                    Windows:
                                </div>
                                <div className="flex-1 bg-[#FDFDFD] rounded-full px-4 border border-black/40 shadow-sm overflow-hidden flex items-center pr-4 w-full">
                                    <select
                                        className="flex-1 px-4 py-2 bg-transparent font-bold text-base md:text-lg outline-none w-full text-center appearance-none truncate"
                                        style={inputStyle}
                                        value={windowAssemblyValue}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            if (!val) return;
                                            const [frame, glaze] = val.split("|||");
                                            const newCode = type === "combo" ? `${frame}_${glaze}_${roofCode}_${wallCode}` : `${frame}_${glaze}`;
                                            updateParams({ windowFrame: frame, windowGlaze: glaze, code: newCode });
                                        }}
                                    >
                                        <option value="">Baseline (No Retrofit)</option>
                                        {windowAssemblyOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                                    </select>
                                </div>
                            </div>
                        )}

                        {showRoofValue && (
                            <div className="flex flex-col md:flex-row gap-4 items-center">
                                <div className="bg-white/95 rounded-full px-6 py-2.5 w-full md:w-[260px] font-black shadow-md text-[#5C3A21] text-lg border border-white/60 shrink-0 text-center md:text-left">
                                    Roof:
                                </div>
                                <div className="flex-1 bg-[#FDFDFD] rounded-full px-4 border border-black/40 shadow-sm overflow-hidden flex items-center pr-4 w-full">
                                    <select
                                        className="flex-1 px-4 py-2 bg-transparent font-bold text-base md:text-lg outline-none w-full text-center appearance-none truncate"
                                        style={inputStyle}
                                        value={roofCode}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            if (!val) return;
                                            const newCode = type === "combo" ? `${windowFrame}_${windowGlaze}_${val}_${wallCode}` : val;
                                            updateParams({ roofCode: val, code: newCode });
                                        }}
                                    >
                                        <option value="">Baseline (No Retrofit)</option>
                                        {supportedRoofOptions.map(o => <option key={o.code} value={o.code}>{o.label}</option>)}
                                    </select>
                                </div>
                            </div>
                        )}

                        {showWallsValue && (
                            <div className="flex flex-col md:flex-row gap-4 items-center">
                                <div className="bg-white/95 rounded-full px-6 py-2.5 w-full md:w-[260px] font-black shadow-md text-[#5C3A21] text-lg border border-white/60 shrink-0 text-center md:text-left">
                                    Walls:
                                </div>
                                <div className="flex-1 bg-[#FDFDFD] rounded-full px-4 border border-black/40 shadow-sm overflow-hidden flex items-center pr-4 w-full">
                                    <select
                                        className="flex-1 px-4 py-2 bg-transparent font-bold text-base md:text-lg outline-none w-full text-center appearance-none truncate"
                                        style={inputStyle}
                                        value={wallCode}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            if (!val) return;
                                            const newCode = type === "combo" ? `${windowFrame}_${windowGlaze}_${roofCode}_${val}` : val;
                                            updateParams({ wallCode: val, code: newCode });
                                        }}
                                    >
                                        <option value="">Baseline (No Retrofit)</option>
                                        {supportedWallOptions.map(o => <option key={o.code} value={o.code}>{o.label}</option>)}
                                    </select>
                                </div>
                            </div>
                        )}

                    </div>

                    <div className="mt-12 max-w-5xl mx-auto relative">
                        {type !== "combo" && hasRequiredData && (() => {
                            // SVG viewBox: 0 0 1000 500
                            // Layout: left flex-1 (cards) x:0-480, gap ~39 SVG units, right flex-1 (image) x:520-1000
                            // Image (1472x832, AR=1.769) displayed at x:527-993, y:58-378 in SVG space
                            // Energy card center: y≈118 | Cost card center: y≈382
                            // Arrow startX/Y = building feature position mapped to SVG coords (per storey)
                            // Arrow endX = 480 (right edge of left/card column)

                            // Feature start coordinates per type+storey [startX, startY]
                            const featureCoords: Record<string, Record<string, [number, number]>> = {
                                roof: {
                                    "G":   [760, 100],
                                    "G+1": [762, 88],
                                    "G+2": [762, 80],
                                },
                                walls: {
                                    "G":   [880, 218],
                                    "G+1": [870, 244],
                                    "G+2": [815, 250],
                                },
                                windows: {
                                    "G":   [820, 205],
                                    "G+1": [778, 133],
                                    "G+2": [752, 188],
                                },
                            };

                            const [sx, sy] = featureCoords[type]?.[storey] ?? [760, 200];

                            // Control points for smooth cubic bezier curves to each card
                            // Arrow 1 → Energy card (top), endpoint (480, 118)
                            const cp1x = sx - 100, cp1y = Math.min(sy, 118) - 20;
                            const cp2x = 510,      cp2y = 118;
                            // Arrow 2 → Cost card (bottom), endpoint (480, 382)
                            const cp3x = sx - 100, cp3y = Math.max(sy, 382) + 20;
                            const cp4x = 510,      cp4y = 382;

                            return (
                                <div className="absolute inset-0 pointer-events-none hidden lg:flex items-center justify-center z-20">
                                    <svg viewBox="0 0 1000 500" className="w-full h-full">
                                        <defs>
                                            <marker id="arrowHead" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                                <path d="M 0 0 L 10 5 L 0 10 z" fill="#18181A" />
                                            </marker>
                                        </defs>
                                        {/* Arrow to Energy Demand card (top card) */}
                                        <path
                                            d={`M ${sx} ${sy} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, 480 118`}
                                            fill="none" stroke="#18181A" strokeWidth="2.5"
                                            markerEnd="url(#arrowHead)"
                                        />
                                        {/* Arrow to Cost Savings card (bottom card) */}
                                        <path
                                            d={`M ${sx} ${sy} C ${cp3x} ${cp3y}, ${cp4x} ${cp4y}, 480 382`}
                                            fill="none" stroke="#18181A" strokeWidth="2.5"
                                            markerEnd="url(#arrowHead)"
                                        />
                                    </svg>
                                </div>
                            );
                        })()}

                        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-center lg:items-center relative z-10">
                            <div className="flex-1 space-y-6 w-full max-w-md lg:max-w-none">
                                <div className="bg-white/95 px-6 pt-6 pb-8 rounded-[2rem] border border-white/60 shadow-md text-center relative">
                                    <div className="text-lg md:text-xl font-black text-[#5C3A21] tracking-wide mb-1">
                                        Expected Energy Demand reduction
                                    </div>
                                    <div className="text-[12px] font-bold text-[#5C3A21]/70 mb-3">(per annum)</div>

                                    <div className="inline-block bg-[#FDFDFD] border-2 border-dashed border-[#5C3A21]/30 rounded-full px-8 py-3 mb-2 shadow-sm">
                                        <span className="text-2xl md:text-4xl font-black" style={{ color: energyStyle.color }}>
                                            {found ? `${energyReduction}%` : "Calculating..."}
                                        </span>
                                    </div>

                                    {found && (
                                        <div className="mt-1 font-black uppercase tracking-widest text-sm md:text-base px-2" style={{ color: energyStyle.color }}>
                                            {energyStyle.label}
                                        </div>
                                    )}
                                </div>

                                <div className="bg-white/95 px-6 pt-6 pb-8 rounded-[2rem] border border-white/60 shadow-md text-center relative">
                                    <div className="text-lg md:text-xl font-black text-[#5C3A21] tracking-wide mb-1">
                                        Expected Electricity cost savings
                                    </div>
                                    <div className="text-[12px] font-bold text-[#5C3A21]/70 mb-3">(per annum)</div>

                                    <div className="inline-block bg-[#FDFDFD] border-2 border-dashed border-[#5C3A21]/30 rounded-full px-8 py-3 mb-2 shadow-sm">
                                        <span className="text-2xl md:text-4xl font-black" style={{ color: costStyle.color }}>
                                            {found ? `${costReduction}%` : "Calculating..."}
                                        </span>
                                    </div>

                                    {found && (
                                        <div className="mt-1 font-black uppercase tracking-widest text-sm md:text-base px-2" style={{ color: costStyle.color }}>
                                            {costStyle.label}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex-1 w-full max-w-md relative flex flex-col items-center">
                                <div className="rounded-[2rem] border-[6px] border-white shadow-xl bg-white w-full overflow-hidden">
                                    <img
                                        src={houseImageSrc}
                                        alt="Home Reference"
                                        className="w-full h-auto object-contain block"
                                    />
                                </div>

                                <div className="mt-4 text-[11px] md:text-[12px] text-[#5C3A21]/80 leading-relaxed font-bold text-center">
                                    <span className="text-[#5C3A21] font-black">Disclaimer:</span> All images used in this description are AI generated... These visuals are intended solely for conceptual representation...
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Visualize() {
    return (
        <Suspense fallback={<div className="flex-grow flex items-center justify-center"><div className="text-[#5C3A21] font-bold text-lg">Loading...</div></div>}>
            <VisualizeContent />
        </Suspense>
    );
}