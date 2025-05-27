"use client";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Link from "next/link";
import { getSafeImageSrc, toLowerCaseHelper } from "@/lib/utils";
import LikeProduct from "./like-product";
import ShareProduct from "./share-product";
import { useState } from "react";
import LoadingDots from "./loader";

interface ProductCardProps {
    productId: string;
    variantId: string;
    title: string;
    sold: number;
    image: string | StaticImport;
    productName: string;
    shoplogo: string | StaticImport;
    price: number;
    variantName: string;
    initialLiked?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
    productId,
    variantId,
    title,
    sold,
    image,
    productName,
    shoplogo,
    price,
    variantName,
    initialLiked,
}) => {
    const [isClicked, setIsClicked] = useState(false);

    return (
        <Card className={`w-[11.5rem] border border-white md:w-[16.5rem] py-3 h-[29rem] md:h-[35rem] bg-white/40 backdrop-blur-3xl ${isClicked && 'bg-neutral-200/50'}`}>
            {!isClicked ? (
                <>
                    <Link
                        href={`/product/${productId}?variant=${toLowerCaseHelper(
                            variantName
                        )}`}
                        onClick={() => setIsClicked(true)}
                    >
                        <CardHeader>
                            <div className="flex items-center gap-1 md:gap-3">
                                <Image
                                    src={getSafeImageSrc(shoplogo)}
                                    alt={title}
                                    width={50}
                                    height={50}
                                    className="object-contain rounded-full"
                                />
                                <CardTitle>{title}</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Image
                                src={getSafeImageSrc(image)}
                                alt={`${title} image`}
                                width={100}
                                height={100}
                                className="w-[20rem] object-contain my-3"
                            />
                            <h4 className="font-semibold line-clamp-2">
                                {productName}
                            </h4>
                            <div className="flex justify-between items-end">
                                <p className="text-orange-500 font-semibold text-xl">
                                    ₱{price}.00
                                </p>
                                <small>{sold} sold</small>
                            </div>
                        </CardContent>
                    </Link>
                    <CardFooter className="flex justify-between mt-3 space-x-3">
                        <div className="space-x-3 shrink-0">
                            <ShareProduct
                                url={`/product/${productId}?variant=${variantName}`}
                            />
                            <LikeProduct
                                productId={productId}
                                variantId={variantId}
                                initialLiked={initialLiked}
                            />
                        </div>
                        <Button>Order</Button>
                    </CardFooter>
                </>
            ) : (
                <div className="flex justify-center items-center flex-col h-full p-4 mb-10">
                    <LoadingDots />
                    <h4 className="font-semibold text-neutral-600"> Good Choice! </h4>
                    <p className="text-center text-neutral-500 text-sm">
                        {" "}
                        Please wait while we are getting the product&apos;s
                        data.{" "}
                    </p>
                </div>
            )}
        </Card>
    );
};

export default ProductCard;
