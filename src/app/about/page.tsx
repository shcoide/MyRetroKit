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
                            <div className="bg-[#FAFAFA]/90 rounded-[2.5rem] p-8 lg:p-10 w-full border-[1.5px] border-black/20 shadow-sm">
                                <h2 className="font-bold text-[#5C3A21] text-xl lg:text-2xl mb-4 text-center">Shalini Keshri</h2>
                                <p className="text-[#3B3B3B] text-sm md:text-base leading-relaxed text-justify">
                                    I am a doctoral candidate in the Department of Architecture and Regional Planning at the Indian Institute of Technology Kharagpur (IIT Kharagpur), India. I hold a Bachelor&apos;s degree in Architecture (B. Arch) and a Master&apos;s degree in Urban and Regional Planning (M. Tech). I am a registered Architect with the Council of Architecture, an Associate Member of the Institute of Town Planners, India (AMITPI) and an IGBC Accredited Professional (IGBC AP).
                                </p>
                                <p className="text-[#3B3B3B] text-sm md:text-base leading-relaxed text-justify mt-4">
                                    My academic journey and professional orientation have consistently centered on sustainability in the built environment, with a particular focus on climate-responsive and energy-efficient design. My current research focuses on energy-efficient retrofit strategies for low-rise residential buildings (G+3 and below) in the warm-humid climatic regions of India. I aim to develop a practical, user-friendly data-driven toolkit that supports homeowners, policy-makers, and industry stakeholders in selecting context-appropriate and cost-effective retrofit solutions. Ultimately, my work is oriented toward contributing to India&apos;s transition toward a net-zero future by advancing informed, inclusive, and scalable design approaches for the existing housing stock.
                                </p>
                            </div>
                        </div>

                        {/* Dr. Priyanka Dey */}
                        <div className="flex-1 bg-[#F5F5F3]/60 rounded-[3rem] p-8 lg:p-12 border border-white/80 shadow-md flex flex-col items-center gap-10">
                            <div className="w-full max-w-[280px] aspect-[3/4] border-[1px] border-black/80 flex items-center justify-center text-center text-[#1A1A1A] font-medium bg-[#FAFAFA] shadow-sm">
                                <span className="text-lg leading-relaxed">
                                    *insert image<br />of<br />Dr. Priyanka Dey
                                </span>
                            </div>
                            <div className="bg-[#FAFAFA]/90 rounded-[2.5rem] p-8 lg:p-10 w-full border-[1.5px] border-black/20 shadow-sm">
                                <h2 className="font-bold text-[#5C3A21] text-xl lg:text-2xl mb-4 text-center">Dr. Priyanka Dey</h2>
                                <p className="text-[#3B3B3B] text-sm md:text-base leading-relaxed text-justify">
                                    Dr. Priyanka Dey is an Assistant Professor in the Department of Architecture and Regional Planning at the Indian Institute of Technology Kharagpur (IIT Kharagpur). With an academic foundation in Architecture (B. Arch) and a Master&apos;s degree in City Planning (MCP), followed by a PhD from IIT Kharagpur, she has developed a research profile grounded in the interdisciplinary relationships between people, place, and planning.
                                </p>
                                <p className="text-[#3B3B3B] text-sm md:text-base leading-relaxed text-justify mt-4">
                                    Her research encompasses a broad spectrum of urban and social issues, including housing and community planning, slum redevelopment, and the socio-cultural and psychological consequences of development-induced displacement and resettlement. She is particularly interested in the intangible dimensions of relocation, such as place attachment, identity formation, and behavioural transitions across diverse population groups. Additionally, her work examines urban morphology and the socio-economic effects of infrastructural and commercial development, with an evolving focus on sustainable and energy-efficient urban development practices.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="mt-12 text-center">
                        <p className="text-[#5C3A21] font-bold text-base md:text-lg">
                            Contact us at:{" "}
                            <a href="mailto:myretrokit.in@gmail.com" className="underline hover:text-[#3D2C1A] transition-colors">
                                myretrokit.in@gmail.com
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
