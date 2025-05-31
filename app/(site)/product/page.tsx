import { Suspense } from "react";
import ProductsView from "./products-view";

export default async function ProductsPage() {
    return (
        <main>
            <h2 className="text-center font-semibold text-lg whitespace-nowrap mb-3 text-neutral-700">
                {" "}
                Discover amazing items!{" "}
            </h2>

            <Suspense fallback={<ProductsLoading />}>
                <ProductsView />
            </Suspense>
        </main>
    );
}

import { Skeleton } from "@/components/ui/skeleton";

const ProductsLoading = () => {
    return (
        <div className="grid grid-cols-2 gap-3 md:gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {Array.from({ length: 10 }).map((_, i) => (
                <Skeleton
                    key={i}
                    className="w-[11.5rem]  h-[25rem] rounded-xl"
                />
            ))}
        </div>
    );
};
