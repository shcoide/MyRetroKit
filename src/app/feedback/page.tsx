export default function Feedback() {
    return (
        <div className="flex-grow flex flex-col pt-0 w-full z-10">
            <div className="max-w-7xl mx-auto w-full px-2 md:px-8 relative z-10 mt-0">
                <div className="bg-[#EFEEE9]/80 backdrop-blur-md px-3 md:px-12 border border-t-0 border-white/40 shadow-sm relative z-10 pb-12 md:pb-24 pt-6 md:pt-10 rounded-b-[2rem] md:rounded-b-[2.5rem]">
                    <div className="bg-white/95 rounded-[1.5rem] md:rounded-[2.5rem] p-5 md:p-16 lg:p-20 shadow-md border border-white/60">
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-[#5C3A21] mb-6 md:mb-8 pb-4 border-b border-[#5C3A21]/20 text-center md:text-left">
                            Disclaimer & Feedback Request:
                        </h2>

                        <div className="text-[#3B3B3B] text-base md:text-lg lg:text-[22px] space-y-6 md:space-y-10 leading-relaxed font-medium">
                            <p className="text-center font-bold">
                                This website is part of an ongoing PhD research project undertaken by:<br className="hidden md:block" />
                                <span className="font-black text-[#5C3A21] block md:inline mt-2 md:mt-0">Ms. Shalini Keshri</span> (Research Scholar) and <span className="font-black text-[#5C3A21]">Dr. Priyanka Dey</span> (Assistant Professor)<br className="hidden md:block" />
                                <span className="text-[#5C3A21]/70 font-bold block mt-2 md:mt-0">Department of Architecture and Regional Planning,<br className="hidden md:block" />
                                    Indian Institute of Technology Kharagpur, West Bengal.</span>
                            </p>

                            <p className="font-bold text-justify md:text-left">
                                The content, tools, and analyses presented on this website are part of a continuous research process and may be updated as the work progresses.
                            </p>

                            <p className="font-bold text-justify md:text-left">
                                Your feedback on the website's usability, clarity, and overall experience is highly appreciated and will significantly contribute to the refinement and effectiveness of this research.
                            </p>

                            <p className="font-bold text-justify md:text-left">
                                If you have any suggestions or encounter issues, kindly share your thoughts through the feedback form provided below.<br className="hidden md:block" />
                                <span className="block mt-2 md:mt-0">The data collected through this form will be used solely for academic research purposes. All responses will be kept confidential and will not be shared with any third parties. Participation is voluntary, and respondents may withdraw at any time without any consequences.</span>
                            </p>

                            <div className="text-center pt-6 md:pt-10 mt-6 md:mt-10 space-y-4">
                                <a href="https://forms.gle/YrFnAsPM4YN8XaK67" target="_blank" rel="noreferrer" className="text-[#5B42D9] font-black hover:underline inline-block text-[17px] md:text-2xl break-all px-2">
                                    https://forms.gle/YrFnAsPM4YN8XaK67
                                </a>
                                <p className="font-black text-lg md:text-[26px] text-[#5C3A21] leading-tight px-2">
                                    Thank you for supporting this academic endeavor.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
