"use client";
import { usePathname } from "next/navigation";
import NavigationTab from "./NavigationTab";

export default function AppHeader() {
    const pathname = usePathname();

    return (
        <div className="w-full relative z-30 px-4 md:px-10 lg:px-12 pt-6 flex flex-col gap-3">
            {/* Logo row — always on its own line */}
            <div className="flex justify-between items-center w-full gap-4 max-w-7xl mx-auto">
                <div className="bg-white/95 rounded-full px-8 md:px-10 py-2.5 shadow-lg border-[1.5px] border-[#18181A]">
                    <h1 className="text-lg md:text-xl lg:text-2xl font-black tracking-wide text-[#1A1A1A]">MyRetroKit.in</h1>
                </div>
                {pathname === "/" && (
                    <div className="hidden sm:flex bg-white/95 rounded-full px-6 py-2 shadow-md border-[1px] border-black/10">
                        <span className="font-bold text-[#1A1A1A] text-sm md:text-base">#Pick_your_retrofit</span>
                    </div>
                )}
            </div>
            {/* Navigation tabs — always below the logo row */}
            <NavigationTab />
        </div>
    );
}
