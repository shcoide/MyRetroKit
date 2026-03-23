"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavigationTab() {
    const pathname = usePathname();
    if (pathname === '/') return null;

    const tabs = [
        { label: "Home", path: "/" },
        { label: "User Guide", path: "/user-guide" },
        { label: "#Pick_your_retrofit", path: "/pick-your-retrofit" },
        { label: "Visualize", path: "/visualize" },
        { label: "Feedback", path: "/feedback" },
        { label: "About Us & Contact", path: "/about" },
    ];

    return (
        <div className="w-full max-w-7xl mx-auto z-20 pb-2">
            <div className="flex flex-wrap justify-center gap-2 items-center w-full">
                {tabs.map((tab) => {
                    const isActive = pathname === tab.path || (tab.path !== '/' && pathname.startsWith(tab.path));
                    return (
                        <Link key={tab.path} href={tab.path}
                            className={`rounded-full px-4 md:px-5 py-2 text-xs md:text-sm lg:text-base font-black shadow-sm transition-all text-center whitespace-nowrap border-[1.5px]
                  ${isActive ? "bg-white text-[#1A1A1A] border-black/40" : "bg-white/60 text-[#3D2C20] hover:bg-white border-transparent"}`}>
                            {tab.label}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}