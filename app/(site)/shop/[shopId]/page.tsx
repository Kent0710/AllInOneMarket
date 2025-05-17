import { Suspense } from "react";
import ShopView from "./shop-view";

export default async function Shop({
    params
} : {
    params : Promise<{shopId : string}>
}) {
    const {shopId} = await params;

    return (
        <Suspense fallback={<>loading</>}>
            <ShopView shopId={shopId} />
        </Suspense>
    );
}
