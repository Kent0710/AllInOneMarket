import NoImageFallback from "../../../public/noimage-fallback.jpg";

import Products from "@/components/products";
import { MarqueeDemo } from "@/components/marquee-test";

import { getShopAndProducts } from "@/actions/getShopAndProducts";
import ShopCard from "@/components/shop-card";
import { getLikeStatuses } from "@/actions/likeProduct";
import { HandHeart, Sparkles } from "lucide-react";
import { IoFastFood } from "react-icons/io5";
import {
    ProductWithVariantsType,
    ShopType,
    ShopWithProductsType,
    VariantType,
} from "@/lib/supabase/dbtypes";

const HomeView = async () => {
    const shopAndProducts = await getShopAndProducts();
    const variantIds = shopAndProducts
        .flatMap((shop: ShopWithProductsType) => shop.products)
        .flatMap((product: ProductWithVariantsType) => product.variants)
        .map((variant: VariantType) => variant.id);
    const initialLikeStatuses = await getLikeStatuses(variantIds);

    return (
        <>
            <section className="bg-gradient-to-tl from-blue-300 items-center gap-3 to-blue-500 py-2 px-4 flex h-fit text-white rounded-xl w-full">
                <iframe
                    src="https://lottie.host/embed/0c905eb4-6dc5-4b88-8168-6b206ec5eae5/pUfBs6A5Jg.lottie"
                    className="w-[5rem] h-auto"
                ></iframe>
                <div>
                    <h2 className="font-bold text-2xl">
                        {" "}
                        Too crowded to check what&apos;s available?
                    </h2>
                    <p className="text-sm">
                        {" "}
                        Skip the hassle — browse products in the app, place your
                        order, and claim!
                    </p>
                </div>
            </section>

            <section className="bg-gradient-to-tl from-yellow-400/50 to-yellow-400 space-y-3 py-4 px-8 h-fit w-full rounded-xl">
                <h2 className="font-bold text-white text-xl">
                    {" "}
                    Browse by categories{" "}
                </h2>

                <ul className="flex gap-3 items-center">
                    <li className="text-white w-[6rem] flex flex-col items-center border p-3 rounded-xl border-white bg-neutral-50/30">
                        <IoFastFood fill="white" color="white" size={27} />
                        <p className="font-semibold"> Food </p>
                    </li>
                    <li className="text-white w-[6rem] flex flex-col items-center border p-3 rounded-xl border-white bg-neutral-50/30">
                        <Sparkles fill="white" color="white" size={27} />
                        <p className="font-semibold"> Fashion </p>
                    </li>
                    <li className="text-white w-[6rem] flex flex-col items-center border p-3 rounded-xl border-white bg-neutral-50/30">
                        <HandHeart fill="white" color="white" size={27} />
                        <p className="font-semibold"> Essentials </p>
                    </li>
                </ul>
            </section>

            <section className="py-9 border-y">
                <div className="flex flex-col justify-center mx-[5rem] mb-8">
                    <h2 className="text-center font-semibold text-xl">
                        Where Great Shops <br /> Meet Great Shoppers
                    </h2>
                    <p className="text-neutal-500 text-sm text-center">
                        See all the top shops glide by — find your favorite!
                    </p>
                </div>
                <div>
                    <MarqueeDemo>
                        {shopAndProducts.map((shop: ShopType) => (
                            <ShopCard
                                key={shop.id}
                                image={shop.logo || NoImageFallback}
                                name={shop.shopname}
                                description={shop.description || ''}
                                href={`/shop/${shop.id}`}
                            />
                        ))}
                    </MarqueeDemo>
                </div>
            </section>

            <section className="py-6 border-b ">
                <div className="flex flex-col justify-center mx-[5rem] mb-8">
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
