export default function About() {
    return (
        <div className="flex-grow flex flex-col pt-0 w-full z-10">
            <div className="max-w-7xl mx-auto w-full px-4 md:px-8 relative z-10 mt-0">
                <div className="bg-[#EFEEE9]/80 backdrop-blur-md px-6 md:px-12 lg:px-16 border border-t-0 border-white/40 shadow-sm relative z-10 pb-16 md:pb-24 pt-10 rounded-b-[3rem]">
                    <div className="flex flex-col md:flex-row gap-8 lg:gap-16 mt-4 max-w-6xl mx-auto">
                        {/* Shalini Keshri */}
                        <div className="flex-1 bg-[#F5F5F3]/60 rounded-[3rem] p-8 lg:p-12 border border-white/80 shadow-md flex flex-col items-center gap-10">
                            <div className="w-full max-w-[280px] aspect-[3/4] border-[1px] border-black/80 flex items-center justify-center text-center text-[#1A1A1A] font-medium bg-[#FAFAFA] shadow-sm">
                                <span className="text-lg leading-relaxed">
                                    *insert image<br />of<br />Shalini Keshri
                                </span>
                            </div>
                            <div className="bg-[#FAFAFA]/90 rounded-[2.5rem] p-10 w-full border-[1.5px] border-black/20 shadow-sm min-h-[220px] flex items-center justify-center text-center">
                                <span className="font-bold text-[#5C3A21] text-2xl lg:text-3xl">*Insert brief intro and description</span>
                            </div>
                        </div>

                        {/* Dr. Priyanka Dey */}
                        <div className="flex-1 bg-[#F5F5F3]/60 rounded-[3rem] p-8 lg:p-12 border border-white/80 shadow-md flex flex-col items-center gap-10">
                            <div className="w-full max-w-[280px] aspect-[3/4] border-[1px] border-black/80 flex items-center justify-center text-center text-[#1A1A1A] font-medium bg-[#FAFAFA] shadow-sm">
                                <span className="text-lg leading-relaxed">
                                    *insert image<br />of<br />Dr. Priyanka Dey
                                </span>
                            </div>
                            <div className="bg-[#FAFAFA]/90 rounded-[2.5rem] p-10 w-full border-[1.5px] border-black/20 shadow-sm min-h-[220px] flex items-center justify-center text-center">
                                <span className="font-bold text-[#5C3A21] text-2xl lg:text-3xl">*Insert brief intro and description</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
