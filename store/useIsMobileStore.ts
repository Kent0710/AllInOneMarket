import { useEffect, useState } from "react";

export const useIsMobileStore = (breakpoint = 768) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIsMobile = () => setIsMobile(window.innerWidth < breakpoint);

        checkIsMobile(); // Initial check
        window.addEventListener("resize", checkIsMobile);
        return () => window.removeEventListener("resize", checkIsMobile);
    }, [breakpoint]);

    return isMobile;
};
