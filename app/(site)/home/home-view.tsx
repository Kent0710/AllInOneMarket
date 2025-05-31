import Products from "@/components/products";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

import { getShopAndProducts } from "@/actions/getShopAndProducts";
import { getLikeStatuses } from "@/actions/likeProduct";
import {
    ProductWithVariantsType,
    ShopWithProductsType,
    VariantType,
} from "@/lib/supabase/dbtypes";

import SampleHeader from "@/public/sampleheader.jpg";
import SampleHeader2 from "@/public/2.jpg";
import Image from "next/image";

const HomeView = async () => {
    const shopAndProducts = await getShopAndProducts();
    const variantIds = shopAndProducts
        .flatMap((shop: ShopWithProductsType) => shop.products)
        .flatMap((product: ProductWithVariantsType) => product.variants)
        .map((variant: VariantType) => variant.id);
    const initialLikeStatuses = await getLikeStatuses(variantIds);

    return (
        <>
            <Alert>
                <Terminal className="h-4 w-4" />
                <AlertTitle> Under development </AlertTitle>
                <AlertDescription>
                    The app is still under development. Minor bugs in features and layouting is may occur. 
                </AlertDescription>
            </Alert>

            <Image
                src={SampleHeader}
                alt="sampleheader"
                height={1920}
                width={1080}
                className="w-full  h-[30dvh] md:h-[40dvh] lg:h-[70dvh] object-cover rounded-xl"
            />

            <Image
                src={SampleHeader2}
                alt="sampleheader2"
                height={1920}
                width={1080}
                className="w-full  h-[30dvh] md:h-[40dvh] lg:h-[70dvh] object-cover rounded-xl"
            />

            <section className="py-6 border-b">
                <div className="flex flex-col justify-center  mb-10">
                    <h2 className="text-center font-semibold  text-xl">
                        Your Next Favorite Finds
                    </h2>
                    <p className="text-neutal-500 text-sm text-center">
                        Scroll through trending products and hidden gems — ready
                        to browse, love, and grab.
                    </p>
                </div>

                <Products
                    shopAndProducts={shopAndProducts}
                    initialLikeStatuses={initialLikeStatuses}
                />
            </section>

            <p className="text-center text-xs mb-9">
                {" "}
                You have reached the end of the products available.
            </p>
        </>
    );
};

export default HomeView;
