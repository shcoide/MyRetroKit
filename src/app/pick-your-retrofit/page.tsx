"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { siteData, performanceData } from "@/lib/data";

export default function PickYourRetrofit() {
    const router = useRouter();
    const [part, setPart] = useState(1);
    const [formData, setFormData] = useState({ storey: "", envelope: "", roofCode: "", wallCode: "", windowFrame: "", windowGlaze: "" });
    const envelopeType = (() => {
        const v = formData.envelope;
        if (!v) return null;
        if (v === "Windows") return "windows";
        if (v === "Roof") return "roof";
        if (v === "Walls") return "walls";
        if (v === "Windows + Walls + Roof") return "combo";
        // Fallback: if user picked a combined option label, treat it as combo.
        if (v.includes("Windows") && v.includes("Roof") && v.includes("Walls")) return "combo";
        return null;
    })();

    const buildSimulationCode = () => {
        if (!envelopeType) return "";
        if (envelopeType === "windows") {
            if (!formData.windowFrame || !formData.windowGlaze) return "";
            // Excel data for windows-only provides codes like F1_GLAZE_2 (not appended with BCR_BCW)
            return `${formData.windowFrame}_${formData.windowGlaze}`;
        }
        if (envelopeType === "roof") {
            if (!formData.roofCode) return "";
            return formData.roofCode;
        }
        if (envelopeType === "walls") {
            if (!formData.wallCode) return "";
            return formData.wallCode;
        }
        // combo
        if (!formData.windowFrame || !formData.windowGlaze || !formData.roofCode || !formData.wallCode) return "";
        return `${formData.windowFrame}_${formData.windowGlaze}_${formData.roofCode}_${formData.wallCode}`;
    };

    const calculate = () => {
        const code = buildSimulationCode();
        if (!envelopeType) return;
        if (!code) return;
        if (!formData.storey) return;
        router.push(
            `/visualize?code=${encodeURIComponent(code)}&storey=${encodeURIComponent(formData.storey)}&type=${encodeURIComponent(envelopeType)}&windowFrame=${encodeURIComponent(
                formData.windowFrame
            )}&windowGlaze=${encodeURIComponent(formData.windowGlaze)}&roofCode=${encodeURIComponent(
                formData.roofCode
            )}&wallCode=${encodeURIComponent(formData.wallCode)}`
        );
    };

    const lastNavKeyRef = useRef<string>("");

    // Demo behavior:
    // - After `storey` + envelope selection, move from Part 1 -> Part 2.
    // - On Part 2, once the needed dropdowns are selected, navigate to `/visualize`.
    useEffect(() => {
        if (part === 1) {
            if (formData.storey && formData.envelope && envelopeType) {
                setPart(2);
            }
            return;
        }

        if (part === 2) {
            const code = buildSimulationCode();
            if (!envelopeType || !code || !formData.storey) return;

            const navKey = `${code}|${formData.storey}|${envelopeType}`;
            if (lastNavKeyRef.current === navKey) return;
            lastNavKeyRef.current = navKey;

            calculate();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        part,
        formData.storey,
        formData.envelope,
        formData.windowFrame,
        formData.windowGlaze,
        formData.roofCode,
        formData.wallCode,
        envelopeType,
    ]);

    const supportedEnvelopeComponents = useMemo(() => {
        const hasAllThree = (c: string) =>
            c.includes("Windows") && c.includes("Roof") && c.includes("Walls");
        return siteData.envelopeComponents.filter(
            (c) => c === "Windows" || c === "Roof" || c === "Walls" || hasAllThree(c),
        );
    }, []);

    const windowAssemblyOptions = useMemo(() => {
        // Single combined option for the demo UI: "Frame ... with Glass ..."
        const DELIM = "|||";
        const options: Array<{ value: string; label: string; frame: string; glaze: string }> = [];

        for (const f of siteData.windowFrames) {
            for (const g of siteData.windowGlazing) {
                const combinedCode = `${f.codePrefix}_${g.codeSuffix}`;

                // Ensure this specific window configuration actually exists in the Excel calculation data
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
        return siteData.roofOptions.filter(r =>
            Object.keys(performanceData).some(key => key.includes(r.code))
        );
    }, []);

    const supportedWallOptions = useMemo(() => {
        return siteData.wallOptions.filter(w =>
            Object.keys(performanceData).some(key => key.includes(w.code))
        );
    }, []);

    const windowAssemblyValue = formData.windowFrame && formData.windowGlaze
        ? windowAssemblyOptions.find((o) => o.frame === formData.windowFrame && o.glaze === formData.windowGlaze)?.value || ""
        : "";

    const windowsEnabled = envelopeType === "windows" || envelopeType === "combo";
    const roofEnabled = envelopeType === "roof" || envelopeType === "combo";
    const wallsEnabled = envelopeType === "walls" || envelopeType === "combo";

    return (
        <div className="flex-grow flex flex-col pt-0 w-full z-10">
            <div className="max-w-7xl mx-auto w-full px-4 md:px-8 relative z-10">
                <div className="bg-[#EFEEE9]/80 backdrop-blur-md px-6 md:px-10 border border-white/40 shadow-sm relative z-10 pb-20 pt-8 rounded-[2rem]">
                    {part === 1 ? (
                        <div className="space-y-4 max-w-5xl mx-auto">
                            {/* City Row */}
                            <div className="flex flex-col md:flex-row gap-4 items-center">
                                <div className="bg-white/95 rounded-full px-8 py-2 md:py-3 w-full md:w-[320px] font-bold shadow-md text-[#5C3A21] text-base md:text-lg border border-white/60 shrink-0 text-center md:text-left">City:</div>
                                <div className="flex-1 bg-[#FDFDFD] rounded-full px-8 py-2 md:py-3 border border-black/20 shadow-sm font-bold text-base md:text-lg w-full text-center text-black">
                                    {siteData.city}
                                </div>
                            </div>

                            {/* Built-up Area Row */}
                            <div className="flex flex-col md:flex-row gap-4 items-center">
                                <div className="bg-white/95 rounded-full px-8 py-2 md:py-3 w-full md:w-[320px] font-bold shadow-md text-[#5C3A21] text-base md:text-lg border border-white/60 shrink-0 text-center md:text-left">Built-up Area:</div>
                                <div className="flex-1 flex flex-col sm:flex-row gap-3 w-full items-center">
                                    <input type="number" placeholder="-- Enter numeric value --" className="flex-1 rounded-full px-6 py-2 md:py-3 border border-black/20 shadow-sm bg-[#FDFDFD] font-bold text-base md:text-lg outline-none text-center appearance-none placeholder-[#1A1A1A] w-full" />
                                    <select className="flex-1 rounded-full px-8 py-2 md:py-3 border border-black/20 shadow-sm bg-[#FDFDFD] font-bold text-base md:text-lg outline-none text-center appearance-none w-full" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg fill=\"black\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7 10l5 5 5-5z\"/><path d=\"M0 0h24v24H0z\" fill=\"none\"/></svg>')", backgroundRepeat: "no-repeat", backgroundPositionX: "95%", backgroundPositionY: "center" }}>
                                        <option value="">-- Select unit --</option>
                                        {siteData.areaUnits.map((u, i) => <option key={i} value={u}>{u}</option>)}
                                    </select>
                                </div>
                            </div>

                            {/* Number of Storeys Row */}
                            <div className="flex flex-col md:flex-row gap-4 items-center">
                                <div className="bg-white/95 rounded-full px-8 py-2 md:py-3 w-full md:w-[320px] font-bold shadow-md text-[#5C3A21] text-base md:text-lg border border-white/60 shrink-0 text-center md:text-left">Number of Storeys:</div>
                                <select className="flex-1 w-full rounded-full px-8 py-2 md:py-3 border border-black/20 shadow-sm bg-[#FDFDFD] font-bold text-base md:text-lg outline-none text-center appearance-none" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg fill=\"black\" height=\"28\" viewBox=\"0 0 24 24\" width=\"28\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7 10l5 5 5-5z\"/><path d=\"M0 0h24v24H0z\" fill=\"none\"/></svg>')", backgroundRepeat: "no-repeat", backgroundPositionX: "96%", backgroundPositionY: "center" }} value={formData.storey} onChange={e => setFormData({ ...formData, storey: e.target.value })}>
                                    <option value="">-- Number of floors --</option>
                                    {siteData.storeys.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                                </select>
                            </div>

                            {/* Envelope Component Row */}
                            <div className="flex flex-col md:flex-row gap-4 items-center">
                                <div className="bg-white/95 rounded-full px-8 py-2 md:py-3 w-full md:w-[320px] font-bold shadow-md text-[#5C3A21] text-base md:text-lg border border-white/60 shrink-0 text-center md:text-left">Building envelope component:</div>
                                <select className="flex-1 w-full rounded-full px-8 py-2 md:py-3 border border-black/20 shadow-sm bg-[#FDFDFD] font-bold text-base md:text-lg outline-none text-center appearance-none" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg fill=\"black\" height=\"28\" viewBox=\"0 0 24 24\" width=\"28\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7 10l5 5 5-5z\"/><path d=\"M0 0h24v24H0z\" fill=\"none\"/></svg>')", backgroundRepeat: "no-repeat", backgroundPositionX: "96%", backgroundPositionY: "center" }} value={formData.envelope} onChange={e => setFormData({ ...formData, envelope: e.target.value })}>
                                    <option value="">-- Select envelope component --</option>
                                    {supportedEnvelopeComponents.map((c) => {
                                        const isCombo = c.includes("Windows") && c.includes("Roof") && c.includes("Walls");
                                        return (
                                            <option key={c} value={c}>
                                                {isCombo ? "Windows + Walls + Roof" : c}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4 max-w-5xl mx-auto">
                            {/* Windows */}
                            <div className="flex flex-col md:flex-row gap-4 items-center">
                                <div className="bg-white/95 rounded-full px-8 py-2 md:py-3 w-full md:w-[320px] font-bold shadow-md text-[#5C3A21] text-base md:text-lg border border-white/60 shrink-0 text-center md:text-left">Windows:</div>
                                <div className="flex-1 bg-[#FDFDFD] rounded-full px-4 border border-black/40 shadow-sm overflow-hidden flex items-center pr-4">
                                    <select
                                        className="flex-1 px-4 py-2 md:py-3 bg-transparent font-bold text-base md:text-lg outline-none w-full text-center appearance-none disabled:opacity-50"
                                        style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg fill=\"black\" height=\"28\" viewBox=\"0 0 24 24\" width=\"28\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7 10l5 5 5-5z\"/><path d=\"M0 0h24v24H0z\" fill=\"none\"/></svg>')", backgroundRepeat: "no-repeat", backgroundPositionX: "98%", backgroundPositionY: "center" }}
                                        value={windowAssemblyValue}
                                        disabled={!windowsEnabled}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            const [frame, glaze] = value.split("|||");
                                            setFormData({ ...formData, windowFrame: frame || "", windowGlaze: glaze || "" });
                                        }}
                                    >
                                        <option value="">-- Select --</option>
                                        {windowAssemblyOptions.map((o) => (
                                            <option key={o.value} value={o.value}>
                                                {o.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Roof */}
                            <div className="flex flex-col md:flex-row gap-4 items-center">
                                <div className="bg-white/95 rounded-full px-8 py-2 md:py-3 w-full md:w-[320px] font-bold shadow-md text-[#5C3A21] text-base md:text-lg border border-white/60 shrink-0 text-center md:text-left">Roof:</div>
                                <select
                                    className="flex-1 rounded-full px-8 py-2 md:py-3 border border-black/40 shadow-sm bg-[#FDFDFD] font-bold text-base md:text-lg outline-none w-full text-center appearance-none disabled:opacity-50"
                                    style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg fill=\"black\" height=\"28\" viewBox=\"0 0 24 24\" width=\"28\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7 10l5 5 5-5z\"/><path d=\"M0 0h24v24H0z\" fill=\"none\"/></svg>')", backgroundRepeat: "no-repeat", backgroundPositionX: "96%", backgroundPositionY: "center" }}
                                    value={formData.roofCode}
                                    disabled={!roofEnabled}
                                    onChange={(e) => setFormData({ ...formData, roofCode: e.target.value })}
                                >
                                    <option value="">-- Select --</option>
                                    {supportedRoofOptions.map((r) => (
                                        <option key={r.code} value={r.code}>
                                            {r.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Walls */}
                            <div className="flex flex-col md:flex-row gap-4 items-center">
                                <div className="bg-white/95 rounded-full px-8 py-2 md:py-3 w-full md:w-[320px] font-bold shadow-md text-[#5C3A21] text-base md:text-lg border border-white/60 shrink-0 text-center md:text-left">Walls:</div>
                                <select
                                    className="flex-1 rounded-full px-8 py-2 md:py-3 border border-black/40 shadow-sm bg-[#FDFDFD] font-bold text-base md:text-lg outline-none w-full text-center appearance-none disabled:opacity-50"
                                    style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg fill=\"black\" height=\"28\" viewBox=\"0 0 24 24\" width=\"28\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7 10l5 5 5-5z\"/><path d=\"M0 0h24v24H0z\" fill=\"none\"/></svg>')", backgroundRepeat: "no-repeat", backgroundPositionX: "96%", backgroundPositionY: "center" }}
                                    value={formData.wallCode}
                                    disabled={!wallsEnabled}
                                    onChange={(e) => setFormData({ ...formData, wallCode: e.target.value })}
                                >
                                    <option value="">-- Select --</option>
                                    {supportedWallOptions.map((w) => (
                                        <option key={w.code} value={w.code}>
                                            {w.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}