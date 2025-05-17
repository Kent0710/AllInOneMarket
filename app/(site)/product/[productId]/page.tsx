import Image from "next/image";

import { ScrollArea } from "@/components/ui/scroll-area";

import { Store } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import ProductCartBuy from "@/components/product-cart-buy";
import { Button } from "@/components/ui/button";
import AdsCarousel, { AdsCarouselItem } from "@/components/ads-carousel";
import Link from "next/link";
import { getSafeImageSrc, toLowerCaseHelper } from "@/lib/utils";

import NoImageFallback from "../../../../public/noimage-fallback.jpg";
import { getProduct } from "@/actions/getProduct";

import { redirect } from "next/navigation";
import CustomizeProductView from "./customize-product-view";
import { VariantType } from "@/lib/supabase/dbtypes";

export default async function ProductPage({
    searchParams,
    params,
}: {
    searchParams: Promise<{ [productId: string]: string }>;
    params: Promise<{ productId: string; variantname: string }>;
}) {
    const { productId } = await params;
    const variantName = (await searchParams).variant;
    const product = await getProduct(productId);

    const selectedVariant = product.variants.find(
        (v: { variantname: string; }) =>
            toLowerCaseHelper(v.variantname) === toLowerCaseHelper(variantName)
    );

    if (!selectedVariant && product.variants.length > 0) {
        const defaultVariant = toLowerCaseHelper(
            product.variants[0].variantname
        );
        return redirect(`/product/${productId}?variant=${defaultVariant}`);
    }

    if (variantName.includes("customize")) {
        return (
            <CustomizeProductView
                selectedVariant={selectedVariant}
                product={product}
            />
        );
    }

    return (
        <main className="mx-[0rem] md:mx-[5rem] flex flex-col gap-12 mt-3">
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
                        <p className="whitespace-nowrap">
                            {selectedVariant?.sold ?? 0} sold
                        </p>
                    </div>
                    <p className="text-3xl font-semibold text-orange-500 my-3">
                        ₱{selectedVariant?.price ?? "0"}.00
                    </p>

                    <div className="flex gap-10 mb-6">
                        <h5 className=" text-neutral-500"> Variant </h5>
                        <ScrollArea
                            className=" w-full h-[10rem] pr-6"
                            type="always"
                        >
                            <div className="flex gap-3 flex-wrap justify-end">
                                {product.variants.map((variant:VariantType) => (
                                    <VariantCard
                                        key={variant.id}
                                        image={variant.variantimage}
                                        title={variant.variantname}
                                        productId={productId}
                                    />
                                ))}
                            </div>
                        </ScrollArea>
                    </div>

                    <ProductCartBuy
                        shopName={product.shop.shopname}
                        variantName={selectedVariant.variantname}
                        productName={product.productname}
                        productId={product.id}
                        variantId={selectedVariant.id}
                        shopId={product.shop.id}
                    />
                </section>
            </div>

            <div className="flex items-center justify-center gap-9 flex-wrap md:flex-nowrap my-10">
                {/* Shop   */}
                <Image
                    src={product.shop.logo || NoImageFallback}
                    alt={product.shop.shopname}
                    className="object-contain w-28 h-28"
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

                <section>
                    <h5 className="font-semibold">About</h5>
                    <p>
                        {product.shop.description ||
                            "This shop does not have a description."}
                    </p>
                </section>
            </div>
        </main>
    );
}

interface VariantCardProps {
    image: string | StaticImport;
    title: string;
    productId: string;
}
const VariantCard: React.FC<VariantCardProps> = ({
    image,
    title,
    productId,
}) => {
    return (
        <Link
            href={`/product/${productId}?variant=${toLowerCaseHelper(title)}`}
        >
            <Card className="w-fit py-2">
                <CardContent className="flex gap-3 items-center">
                    <Image
                        src={getSafeImageSrc(image)}
                        alt="sampleimage"
                        className="object-contain w-12 h-12"
                        width={144}
                        height={144}
                    />
                    <p className="font-semibold"> {title} </p>
                </CardContent>
            </Card>
        </Link>
    );
};
