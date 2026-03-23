export default function Footer() {
    return (
        <div className="w-full bg-white/95 backdrop-blur-sm px-8 py-2 border-t border-gray-200/50 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start text-sm text-gray-700 max-w-7xl mx-auto">
                <div className="mb-2 md:mb-0">
                    <div className="font-bold text-gray-800 mb-1">Website developed and maintained by:</div>
                    <div className="flex gap-8 leading-tight flex-wrap">
                        <div>
                            <div className="font-black text-gray-900">Dr. Priyanka Dey</div>
                            <div className="text-[11px]">
                                Assistant Professor,<br />
                                Dept. of Architecture and Regional Planning,<br />
                                IIT Kharagpur
                            </div>
                        </div>
                        <div>
                            <div className="font-black text-gray-900">Shalini Keshri</div>
                            <div className="text-[11px]">
                                Research Scholar<br />
                                Dept. of Architecture and Regional Planning,<br />
                                IIT Kharagpur
                            </div>
                        </div>
                    </div>
                </div>
                <div className="md:pb-1">
                    <div className="pl-6 pr-4 py-1.5 rounded-full bg-gradient-to-r from-yellow-300 to-orange-400 text-black font-black text-sm shadow-sm font-fredoka">
                        MyRetroKit.in
                    </div>
                </div>
            </div>
        </div>
    )
}