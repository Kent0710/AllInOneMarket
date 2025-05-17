import React, { Suspense } from "react";
import CheckoutsView from "./checkouts-view";

export default async function Checkouts() {
    return (
        <main className="mx-[2rem] md:mx-[10rem] flex flex-col items-center">
            <h2 className="text-center font-extrabold text-lg whitespace-nowrap mb-3">
                {" "}
                Checkout History{" "}
            </h2>

            <Suspense fallback={<CheckoutsLoading />}>
                <CheckoutsView />
            </Suspense>
        </main>
    );
}

import { Skeleton } from "@/components/ui/skeleton";

const CheckoutsLoading = () => {
    return <Skeleton className="w-full mx-[1.5rem] h-[17rem] rounded-xl" />;
};
