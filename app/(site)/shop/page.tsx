import { Suspense } from "react";
import ShopsView from "./shops-view";

export default async function Shop() {
    return (
        <main className="mx-[2rem] md:mx-[10rem]">
            <h2 className="text-center font-semibold text-lg whitespace-nowrap mb-3">
                {" "}
                Shops{" "}
            </h2>

            <Suspense fallback={<ShopsLoading />}>
                <ShopsView />
            </Suspense>
        </main>
    );
}

import { Skeleton } from "@/components/ui/skeleton";

const ShopsLoading = () => {
    return (
        <div className="flex flex-wrap gap-6 justify-center">
            {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton
                    key={i}
                    className="w-full mx-[1.5rem] h-[22rem] rounded-xl"
                />
            ))}
        </div>
    );
};
