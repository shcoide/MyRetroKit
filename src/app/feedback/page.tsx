export default function Feedback() {
    return (
        <div className="flex-grow flex flex-col pt-0 w-full z-10">
            <div className="max-w-7xl mx-auto w-full px-4 md:px-8 relative z-10 mt-0">
                <div className="bg-[#EFEEE9]/80 backdrop-blur-md px-6 md:px-12 border border-t-0 border-white/40 shadow-sm relative z-10 pb-16 md:pb-24 pt-10 rounded-b-[2.5rem]">
                    <div className="bg-white/95 rounded-[2.5rem] p-8 md:p-16 lg:p-20 shadow-md border border-white/60">
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-[#5C3A21] mb-8 pb-4 border-b border-[#5C3A21]/20">
                            Disclaimer & Feedback Request:
                        </h2>

                        <div className="text-[#3B3B3B] text-lg lg:text-[22px] space-y-10 leading-relaxed font-medium">
                            <p className="text-center font-bold">
                                This website is part of an ongoing PhD research project undertaken by:<br />
                                <span className="font-black text-[#5C3A21]">Ms. Shalini Keshri</span> (Research Scholar) and <span className="font-black text-[#5C3A21]">Dr. Priyanka Dey</span> (Assistant Professor)<br />
                                <span className="text-[#5C3A21]/70 font-bold">Department of Architecture and Regional Planning,<br />
                                    Indian Institute of Technology Kharagpur, West Bengal.</span>
                            </p>

                            <p className="font-bold">
                                The content, tools, and analyses presented on this website are part of a continuous research process and may be updated as the work progresses.
                            </p>

                            <p className="font-bold">
                                Your feedback on the website's usability, clarity, and overall experience is highly appreciated and will significantly contribute to the refinement and effectiveness of this research.
                            </p>

                            <p className="font-bold">
                                If you have any suggestions or encounter issues, kindly share your thoughts through the feedback form provided below.<br />
                                The data collected through this form will be used solely for academic research purposes. All responses will be kept confidential and will not be shared with any third parties. Participation is voluntary, and respondents may withdraw at any time without any consequences.
                            </p>

                            <div className="text-center pt-10 mt-10 space-y-4">
                                <a href="https://forms.gle/YrFnAsPM4YN8XaK67" target="_blank" rel="noreferrer" className="text-[#5B42D9] font-black hover:underline inline-block text-xl md:text-2xl">
                                    https://forms.gle/YrFnAsPM4YN8XaK67
                                </a>
                                <p className="font-black text-xl md:text-[26px] text-[#5C3A21]">
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
