import Image from "next/image";

import { Store } from "lucide-react";

import ProductCartBuy from "@/components/product-cart-buy";
import { Button } from "@/components/ui/button";
import AdsCarousel, { AdsCarouselItem } from "@/components/ads-carousel";
import Link from "next/link";
import { getSafeImageSrc, } from "@/lib/utils";

import NoImageFallback from "../../../../public/noimage-fallback.jpg";
import { getProduct } from "@/actions/getProduct";

import CustomizeProductView from "./customize-product-view";
import { VariantType } from "@/lib/supabase/dbtypes";

export default async function ProductPage({
    params,
}: {
    params: Promise<{ productId: string; variantname: string }>;
}) {
    const { productId } = await params;
    const product = await getProduct(productId);

    if (product.productname.includes("Pancake")) {
        return (
            <CustomizeProductView
                product={product}
            />
        );
    }

    return (
        <main className="mx-[0rem] md:mx-[5rem] flex flex-col gap-6 mt-3 bg-white/40 backdrop-blur-3xl rounded-xl border border-white shadow-md p-5">
            <div className="flex gap-6 items-center border-pink-300">
                <Image
                    src={product.shop.logo || NoImageFallback}
                    alt={product.shop.shopname}
                    className="object-contain w-24 h-24 rounded-full"
                    width={144}
                    height={144}
                />
                <section>
                    <h4 className="text-lg font-semibold mb-3 whitespace-nowrap">
                        {product.shop.shopname}
                    </h4>
                    <Link href={`/shop/${product.shop.id}`}>
                        <Button variant={"special"}>
                            <Store />
                            View shop
                        </Button>
                    </Link>
                </section>
            </div>

            <div className="flex flex-wrap md:flex-nowrap">
                <section className="w-full md:w-1/3 mx-14 md:mx-0 md:mr-14">
                    <AdsCarousel className="h-[30rem]">
                        {product.variants.map((variant: VariantType) => {
                            const hasSingleImage = !!variant.variantimage;
                            const multipleImages = variant.variant_images || [];

                            // If single image exists, render it
                            if (hasSingleImage) {
                                return (
                                    <AdsCarouselItem
                                        key={variant.variantname + "-single"}
                                    >
                                        <Image
                                            src={getSafeImageSrc(
                                                variant.variantimage
                                            )}
                                            width={144}
                                            height={144}
                                            alt="variant image"
                                            className="object-contain w-[20rem]"
                                        />
                                    </AdsCarouselItem>
                                );
                            }

                            // Else render all images from the array
                            return multipleImages.map((img, idx) => (
                                <AdsCarouselItem
                                    key={`${variant.variantname}-multi-${idx}`}
                                >
                                    <Image
                                        src={getSafeImageSrc(img)}
                                        width={144}
                                        height={144}
                                        alt="variant image"
                                        className="object-contain w-[20rem]"
                                    />
                                </AdsCarouselItem>
                            ));
                        })}
                    </AdsCarousel>
                </section>
                <section className="w-full md:w-2/3 p-5 pl-10">
                    <div className="flex justify-between">
                        <div>
                            <h4 className="text-2xl font-semibold">
                                {product.productname}
                            </h4>
                            <p className="text-neutral-500">
                                {product.description}
                            </p>
                        </div>
                    </div>

                    <ProductCartBuy
                        product={product}
                        shopName={product.shop.shopname}
                        productName={product.productname}
                        productId={product.id}
                        shopId={product.shop.id}
                    />
                </section>
            </div>
        </main>
    );
}
