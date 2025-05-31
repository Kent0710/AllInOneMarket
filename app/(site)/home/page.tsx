import { Suspense } from "react";
import HomeView from "./home-view";

export default async function Home() {
    return (
        <div className="space-y-3 mx-[1rem] md:mx-[3rem]">
            <Suspense fallback={<HomeLoading />}>
                <HomeView />
            </Suspense>
        </div>
    );
}

import { Skeleton } from "@/components/ui/skeleton";
import { MarqueeDemo } from "@/components/marquee-test";

const HomeLoading = () => {
    return (
        <div className="space-y-3">
            <Skeleton className="h-[10rem] w-full" />
             
            <section>
                <h2 className="text-center font-extrabold text-lg whitespace-nowrap mb-3">
                    {" "}
                    Shops{" "}
                </h2>

                <div>
                    <MarqueeDemo>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Skeleton
                                key={i}
                                className="w-[17rem]  h-[8rem] mx-3 rounded-xl"
                            />
                        ))}
                    </MarqueeDemo>
                </div>
            </section>

            <section>
                <h2 className="text-center font-extrabold text-lg whitespace-nowrap mb-3">
                    {" "}
                    Discover{" "}
                </h2>

                <div className="grid grid-cols-2 gap-3 md:gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <Skeleton
                            key={i}
                            className="w-[11.5rem]  h-[25rem] rounded-xl"
                        />
                    ))}
                </div>
            </section>

            <p className="text-center text-xs mb-9">
                {" "}
                You have reached the end of the products available.
            </p>
        </div>
    );
};
