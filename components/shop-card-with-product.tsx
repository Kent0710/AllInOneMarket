import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import NoImageFallback from "../public/noimage-fallback.jpg";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Store } from "lucide-react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import AdsCarousel, { AdsCarouselItem } from "./ads-carousel";
import BookmarkButton from "./bookmark-button";
import { VariantType } from "@/lib/supabase/dbtypes";

interface ShopCardWithProductProps {
    shopId: string;
    shoplogo: string | StaticImport;
    shopName: string;
    shopDescription: string | null;
    productName: string;
    productDescription: string | null;
    variants: VariantType[];
    initialBookmarked?: boolean;
}

const ShopCardWithProduct: React.FC<ShopCardWithProductProps> = ({
    shopId,
    shoplogo,
    shopName,
    shopDescription,
    productName,
    productDescription,
    variants = [],
    initialBookmarked,
}) => {
    return (
        <Card className="w-[20rem]">
            <Link href={`/shop/${shopId}`}>
                <CardContent className="flex flex-col items-center gap-3">
                    <Image
                        src={shoplogo || NoImageFallback}
                        alt={`${shopName}-logo`}
                        className="w-28 h-28"
                        width={144}
                        height={144}
                    />

                    <section className="flex flex-col items-center">
                        <CardTitle>{shopName}</CardTitle>
                        <CardDescription>
                            {shopDescription || "This shop has no description."}
                        </CardDescription>
                    </section>

                    <section className="border-t pt-2 text-sm">
                        <div className="flex items-center gap-3">
                            <AdsCarousel hideControls={true} className="w-28">
                                {variants.length !== 0 ? (
                                    variants.map((variant) => (
                                        <AdsCarouselItem
                                            key={variant.variantname}
                                        >
                                            <Image
                                                alt={variant.variantname}
                                                src={
                                                    variant.variantimage ||
                                                    NoImageFallback
                                                }
                                                width={144}
                                                height={144}
                                                className="w-20 h-20 object-contain"
                                            />
                                        </AdsCarouselItem>
                                    ))
                                ) : (
                                    <Image
                                        alt="novariant"
                                        src={NoImageFallback}
                                        width={144}
                                        height={144}
                                        className="w-20 h-20 object-contain"
                                    />
                                )}
                            </AdsCarousel>
                            <div>
                                <h4 className="font-semibold">{productName}</h4>
                                <p className="text-neutral-500 line-clamp-2">
                                    {productDescription ||
                                        "This product does not have any description."}
                                </p>
                            </div>
                        </div>
                    </section>
                </CardContent>
            </Link>
            <CardFooter className="space-x-3 place-self-center mt-3">
                <BookmarkButton
                    shopId={shopId}
                    initialBookmarked={initialBookmarked}
                />
                <Button variant={"special"}>
                    <Store />
                    View shop
                </Button>
            </CardFooter>
        </Card>
    );
};

export default ShopCardWithProduct;
