import Marquee from "react-fast-marquee";

import React from "react";

interface MarqueeDemoProps {
    children : React.ReactNode;
}
export const MarqueeDemo : React.FC<MarqueeDemoProps> = ({
    children
}) => {
    return (
        <div className="relative overflow-hidden ">
            {/* Left Gradient Shadow */}
            <div className="pointer-events-none absolute left-0 top-0 h-full w-[2rem] md:w-[15rem] bg-gradient-to-r from-neutral-100 to-transparent z-10" />
            {/* Right Gradient Shadow */}
            <div className="pointer-events-none absolute right-0 top-0 h-full w-[2rem] md:w-[15rem] bg-gradient-to-l from-neutral-100 to-transparent z-10" />

            <Marquee pauseOnHover pauseOnClick className="py-2">
                {children}
            </Marquee>
        </div>
    );
};