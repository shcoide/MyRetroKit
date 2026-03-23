"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const [isRevealed, setIsRevealed] = useState(false);
  const [typedText, setTypedText] = useState("");
  const fullText = "Is your house making you and your wallet sweat??";

  // Typing effect
  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      setTypedText(fullText.substring(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(typingInterval);
      }
    }, 40); // speed of typing
    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="flex-grow flex flex-col items-center justify-center px-4 md:px-12 w-full max-w-6xl mx-auto mt-4 md:-mt-10 pb-16 min-h-[70vh]">

      {/* 1. Header Pill (Always visible, types out text) */}
      <div
        className={`w-full max-w-[900px] bg-[#FFFFFF] border-[4px] md:border-[5px] border-[#18181A] shadow-lg rounded-3xl lg:rounded-full px-4 sm:px-6 md:px-8 py-3 sm:py-4 flex items-center justify-center gap-2 md:gap-4 relative z-20 transition-all duration-700
                    ${isRevealed ? "mb-0 md:mb-[-25px] scale-100" : "mb-0 scale-105"}`}
      >
        <div className="text-[17px] sm:text-[22px] lg:text-[28px] leading-tight font-black tracking-wide text-[#674E3C] text-center w-full min-h-[40px] md:min-h-[48px] flex items-center justify-center">
          {typedText}
          <span className="w-1 h-[1em] bg-[#674E3C] ml-1 animate-pulse inline-block"></span>
        </div>
        <button
          onClick={() => setIsRevealed(true)}
          className={`flex-shrink-0 cursor-pointer p-2 rounded-full hover:bg-black/5 transition-colors group ${isRevealed ? 'pointer-events-none opacity-50' : 'animate-bounce'}`}
          disabled={isRevealed}
          title="Click to reveal how to save!"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#674E3C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="sm:w-8 sm:h-8 md:w-10 md:h-10 group-hover:scale-110 transition-transform">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </div>

      {/* REVEALED CONTENT */}
      <div className={`w-full flex flex-col items-center transition-all duration-1000 ease-out transform origin-top
          ${isRevealed ? "opacity-100 translate-y-0 scale-100 z-10" : "opacity-0 -translate-y-20 scale-95 pointer-events-none absolute"}`}>

        {/* 2. Main Pitch Block */}
        <div className="w-full max-w-[850px] bg-[#E8E2D7]/70 backdrop-blur-sm rounded-3xl border border-[#18181A] mt-[50px] pt-[40px] pb-[30px] px-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl md:text-[32px] font-bold text-[#1A1A1A] mb-4">
            Ready to Cut Costs and Boost Comfort?
          </h2>
          <p className="text-lg md:text-[20px] font-semibold text-[#1A1A1A] leading-relaxed max-w-2xl mx-auto">
            Take a quick check to see how much you could save <br className="hidden md:block" />
            — and start your Retrofit journey to a smarter, cooler home.
          </p>
        </div>

        {/* 3. Hash-Tag Pills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mt-12 max-w-4xl">
          {[
            "#SaveOnEnergyBills",
            "#BoostPropertyValue",
            "#YearRoundComfort",
            "#HealthyHomes",
            "#ClimateResilientLiving",
            "#SustainableFuture",
          ].map((t, idx) => (
            <div
              key={t}
              className="bg-[#FAFAFA]/90 rounded-full px-6 py-2.5 shadow-sm hover:shadow-md text-[#1A1A1A] font-bold text-center text-sm md:text-base transform hover:-translate-y-0.5 transition-all duration-300 cursor-default border border-black/5 hover:border-[#674E3C]/20"
              style={{ transitionDelay: isRevealed ? `${idx * 80}ms` : '0ms' }}
            >
              {t}
            </div>
          ))}
        </div>

        {/* 4. Action Row */}
        <div className="flex flex-col md:flex-row w-full max-w-4xl justify-center items-center mt-12 gap-4 px-4 transition-all duration-1000 delay-500">
          <div className="bg-[#FAFAFA]/95 rounded-full px-8 py-3.5 text-[#1A1A1A] font-bold text-base md:text-xl shadow-sm text-center flex-1 border border-black/10">
            Save more. Live better. Build greener.
          </div>
          <button
            onClick={() => router.push("/user-guide")}
            className="w-full md:w-auto bg-[#593E26] text-white px-10 py-3.5 text-lg md:text-xl font-bold hover:bg-[#3D2C1A] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 group relative overflow-hidden"
          >
            <span className="relative z-10">See how it works!</span>
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
          </button>
        </div>
      </div>

    </div>
  );
}