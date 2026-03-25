"use client";
import { useState } from "react";

export default function UserGuide() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (i: number) => {
        setOpenIndex(openIndex === i ? null : i);
    };

    const list = [
        {
            title: "1. How to select units for measuring the building area:",
            answer: "Please enter the Built-Up Area for your residence, i.e., either in square meters (sq.m.) or Square feet (sq.ft.).",
            note: 'The "Built-up area" is the total covered area on all floors of your house (including carpet or actual usable area, external and internal walls, covered balconies and verandas, staircases, ducts and utility areas that are enclosed) (ODA (Planning and Building Standards) Rules, 2020).'
        },
        {
            title: "2. Selecting the number of storeys in your house:",
            answer: "Please select between the options for your low-rise single-family residential building unit:",
            images: [
                { src: "/assets/G-floor reference AI image.jpg", caption: "Ground-floor only" },
                { src: "/assets/G+1 reference AI image.jpg", caption: "Ground +1 floor" },
                { src: "/assets/G+2 reference AI image.jpg", caption: "Ground +2 floor" },
            ],
            disclaimer: "Disclaimer: All images used in this description are AI-generated using Canva's image generation tool. These visuals are intended solely for conceptual representation and illustrative purposes. They do not depict actual retrofit products, materials, or real-world outcomes."
        },
        {
            title: "3. Selecting the city:",
            answer: "For selecting the city within the website, the current scope is confined to low-rise (Ground to Ground+2) residential buildings situated in India’s warm-humid climate zone. At present, the pilot version of the platform specifically focuses on Bhubaneswar as the case study location"
        },
        {
            title: "4. Selecting building envelope component:",
            answer: "Select the specific parts of the building envelope you wish to retrofit. The website supports analysis for Windows, Walls, Roof, or all three combined."
        },
        {
            title: "5. Selecting construction assembly options for Windows, Roof or Walls:",
            answer: "Choose from the list of construction solutions listed to match your existing or proposed building design"
        }
    ];

    return (
        <div className="flex-grow flex flex-col pt-0 w-full z-10 transition-all duration-300">
            <div className="max-w-7xl mx-auto w-full px-4 md:px-8 relative z-10">
                <div className="bg-[#EFEEE9]/80 backdrop-blur-md px-4 md:px-10 shadow-sm relative z-10 pb-20 pt-8 rounded-[2rem] border border-white/40">
                    <div className="space-y-3 max-w-6xl mx-auto">
                        {list.map((item, i) => {
                            const isOpen = openIndex === i;
                            return (
                                <div
                                    key={i}
                                    className="flex flex-col bg-white/95 rounded-2xl border border-black/10 shadow-sm overflow-hidden transition-shadow duration-300"
                                    style={{ boxShadow: isOpen ? '0 4px 24px rgba(0,0,0,0.08)' : undefined }}
                                >
                                    <button
                                        onClick={() => toggle(i)}
                                        className="w-full text-left px-6 md:px-8 py-3.5 md:py-4 font-bold text-[#1A1A1A] text-base md:text-[18px] flex items-center justify-between hover:bg-black/[0.02] transition-colors flex-shrink-0"
                                    >
                                        <span className="pr-4 leading-snug">{item.title}</span>
                                        <span
                                            className="flex-shrink-0 w-7 h-7 rounded-full bg-black/5 flex items-center justify-center transition-transform duration-300"
                                            style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                                        >
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="6 9 12 15 18 9" />
                                            </svg>
                                        </span>
                                    </button>

                                    <div
                                        className="overflow-hidden transition-all duration-400 ease-in-out"
                                        style={{ maxHeight: isOpen ? '1500px' : '0px', opacity: isOpen ? 1 : 0, transition: 'max-height 0.4s ease-in-out, opacity 0.3s ease-in-out' }}
                                    >
                                        <div className="px-6 md:px-8 pb-6 pt-1">
                                            <div className="border-t border-dashed border-[#1A1A1A]/10 pt-4">
                                                <p className="text-[#3B3B3B] font-semibold text-base md:text-[17px] leading-relaxed">
                                                    {item.answer}
                                                </p>

                                                {item.note && (
                                                    <p className="text-[#5C3A21]/90 font-medium text-sm mt-3 leading-relaxed">
                                                        <span className="text-[#5C3A21] font-bold mr-2">Note:</span>{item.note}
                                                    </p>
                                                )}

                                                {item.images && (
                                                    <div className="mt-6 flex flex-col items-center border border-dashed border-[#6B4F3A]/30 rounded-3xl p-4 md:p-8 bg-[#FAFAFA]">
                                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full">
                                                            {item.images.map((img, idx) => (
                                                                <div key={idx} className="flex flex-col items-center gap-3">
                                                                    <div className="w-full aspect-video rounded-xl overflow-hidden border-2 border-white shadow-sm">
                                                                        <img src={img.src} alt={img.caption} className="w-full h-full object-cover" />
                                                                    </div>
                                                                    <div className="font-bold text-[#5C3A21] text-sm md:text-base text-center">
                                                                        {img.caption}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <div className="mt-6 text-[10px] md:text-[11px] text-[#5C3A21]/70 font-medium leading-relaxed w-full">
                                                            <span className="text-[#5C3A21] font-bold mr-2">Disclaimer:</span>{item.disclaimer?.replace('Disclaimer: ', '')}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
