"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useMemo, useEffect } from "react";
import { calculateSavings, getCostColor, getEnergyColor, type EnvelopeType } from "@/lib/calculations";
import { siteData } from "@/lib/data";

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

    // If required params are missing, redirect to pick-your-retrofit
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

    const { windowValue, roofValue, wallsValue, houseImageSrc } = useMemo(() => {
        const frameLabel = siteData.windowFrames.find((f) => f.codePrefix === windowFrame)?.label;
        const glazeLabel = siteData.windowGlazing.find((g) => g.codeSuffix === windowGlaze)?.label;
        const windowValueLocal = frameLabel && glazeLabel ? `${frameLabel} frame with ${glazeLabel}` : "";

        const roofValueLocal = siteData.roofOptions.find((r) => r.code === roofCode)?.label || "";
        const wallsValueLocal = siteData.wallOptions.find((w) => w.code === wallCode)?.label || "";

        const houseImage =
            storey === "G"
                ? "/assets/G-floor reference AI image.jpg"
                : storey === "G+1"
                    ? "/assets/G+1 reference AI image.jpg"
                    : "/assets/G+2 reference AI image.jpg";

        return {
            windowValue: windowValueLocal,
            roofValue: roofValueLocal,
            wallsValue: wallsValueLocal,
            houseImageSrc: houseImage,
        };
    }, [roofCode, wallCode, storey, windowFrame, windowGlaze]);

    const showWindowsValue = type === "windows" || type === "combo";
    const showRoofValue = type === "roof" || type === "combo";
    const showWallsValue = type === "walls" || type === "combo";

    // Show a loading/redirect state while checking
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

    return (
        <div className="flex-grow flex flex-col pt-0 w-full z-10 px-4 md:px-0">
            <div className="max-w-6xl mx-auto w-full px-2 md:px-8 relative z-10">
                <div className="bg-[#EFEEE9]/80 backdrop-blur-md px-4 md:px-10 border border-white/40 shadow-sm relative z-10 pb-12 pt-10 rounded-[2rem]">
                    {/* Windows / Roof / Walls rows */}
                    <div className="space-y-4 max-w-4xl mx-auto">
                        {(
                            [
                                { label: "Windows:", value: showWindowsValue ? windowValue : "" },
                                { label: "Roof:", value: showRoofValue ? roofValue : "" },
                                { label: "Walls:", value: showWallsValue ? wallsValue : "" },
                            ] as const
                        ).map((row) => (
                            <div key={row.label} className="flex flex-col md:flex-row gap-4 items-center">
                                <div className="bg-white/95 rounded-full px-6 py-2.5 w-full md:w-[260px] font-black shadow-md text-[#5C3A21] text-lg border border-white/60 shrink-0 text-center md:text-left">
                                    {row.label}
                                </div>
                                <div className="flex-1 bg-[#FDFDFD] rounded-full px-6 py-2.5 border border-black/20 shadow-sm font-bold text-base md:text-lg w-full text-center text-black flex items-center justify-between">
                                    <span className="truncate">{row.value ? row.value : "Baseline (No Retrofit)"}</span>
                                    <span className="text-black ml-2">▼</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Benefits + image */}
                    <div className="mt-12 max-w-5xl mx-auto relative">
                        {/* ─── DESKTOP ONLY: SVG ARROWS OVERLAY ─── */}
                        {type !== "combo" && hasRequiredData && (
                            <div className="absolute inset-0 pointer-events-none hidden lg:flex items-center justify-center z-20">
                                <svg viewBox="0 0 1000 500" className="w-full h-full">
                                    <defs>
                                        <marker id="arrowHead" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                            <path d="M 0 0 L 10 5 L 0 10 z" fill="#18181A" />
                                        </marker>
                                    </defs>
                                    <path
                                        d={`M ${type === 'roof' ? 700 : type === 'walls' ? 760 : 660
                                            } ${type === 'roof' ? 120 : type === 'walls' ? 240 : 320
                                            } C 600 200, 520 150, 480 150`}
                                        fill="none" stroke="#18181A" strokeWidth="2.5"
                                        markerEnd="url(#arrowHead)"
                                    />
                                    <path
                                        d={`M ${type === 'roof' ? 700 : type === 'walls' ? 760 : 660
                                            } ${type === 'roof' ? 120 : type === 'walls' ? 240 : 320
                                            } C 600 300, 520 350, 480 350`}
                                        fill="none" stroke="#18181A" strokeWidth="2.5"
                                        markerEnd="url(#arrowHead)"
                                    />
                                </svg>
                            </div>
                        )}

                        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-center lg:items-center relative z-10">
                            {/* Left Side: Result Pills */}
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

                            {/* Right Side: Image */}
                            <div className="flex-1 w-full max-w-md relative flex flex-col items-center">
                                <div className="rounded-[2rem] border-[6px] border-white shadow-xl bg-white w-full overflow-hidden">
                                    <img
                                        src={houseImageSrc}
                                        alt="Home Reference"
                                        className="w-full h-auto object-contain block"
                                    />
                                </div>

                                {/* Visual-only disclaimer */}
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