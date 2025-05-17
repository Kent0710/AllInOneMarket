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
    return (
        <Card className="w-fit py-3 h-[31rem] md:h-[35rem]">
            <Link
                href={`/product/${productId}?variant=${toLowerCaseHelper(
                    variantName
                )}`}
            >
                <CardHeader>
                    <div className="flex items-center gap-1 md:gap-3">
                        <Image
                            src={getSafeImageSrc(shoplogo)
                            }
                            alt={title}
                            width={50}
                            height={50}
                            className="object-contain"
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
                    <h4 className="font-semibold line-clamp-2">{productName}</h4>
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
        </Card>
    );
};

export default ProductCard;
