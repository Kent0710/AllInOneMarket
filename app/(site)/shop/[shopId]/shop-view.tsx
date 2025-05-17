import Image from "next/image";
import { getShop } from "@/actions/getShop";
import { getLikeStatuses } from "@/actions/likeProduct";
import { getSafeImageSrc } from "@/lib/utils";
import AdsCarousel, { AdsCarouselItem } from "@/components/ads-carousel";
import ProductCard from "@/components/product-card";
import BookmarkButton from "@/components/bookmark-button";

interface ShopViewProps {
    shopId: string;
}

const ShopView: React.FC<ShopViewProps> = async ({ shopId }) => {
    const shop = await getShop(shopId);
    if (!shop) {
        return <div>Shop not found</div>;
    }

    const variantIds = shop.products
        .flatMap(product => product.variants)
        .map(variant => variant.id)
        .filter(id => id && id !== "undefined");
    const initialLikeStatuses = await getLikeStatuses(variantIds);

    return (
        <div className="mx-[2rem] md:mx-[10rem] space-y-9">
            <div className="flex gap-9 justify-center items-center">
                <Image
                    src={getSafeImageSrc(shop.logo)}
                    alt={shop.name || shop.shopname}
                    className="w-36 h-36 object-contain rounded-full"
                    width={144}
                    height={144}
                />

                <section>
                    <h4 className="text-2xl font-semibold whitespace-nowrap">
                        {shop.name || shop.shopname}
                    </h4>
                    <p className="text-neutral-500 mb-3">
                        {shop.description || "This shop has no description."}
                    </p>
                    <BookmarkButton shopId={shopId} />
                </section>
            </div>

            {shop.products[0]?.variants?.length > 0 && (
                <section>
                    <AdsCarousel hideControls={true} >
                        {shop.products[0].variants.map((variant) => (
                            <AdsCarouselItem key={variant.id}>
                                <Image
                                    src={getSafeImageSrc(variant.variantimage)}
                                    alt={variant.name || variant.variantname}
                                    width={144}
                                    height={144}
                                    className="w-[25rem] h-[25rem] object-contain"
                                />
                            </AdsCarouselItem>
                        ))}
                    </AdsCarousel>
                </section>
            )}

            <section>
                <h2 className="text-center font-extrabold text-lg whitespace-nowrap mb-3">
                    Products
                </h2>
                <div className="flex justify-center gap-6 flex-wrap">
                    {shop.products.flatMap(product =>
                        product.variants.map(variant => (
                            <ProductCard
                                key={variant.id}
                                productId={product.id}
                                variantId={variant.id}
                                title={shop.name || shop.shopname}
                                sold={variant.sold || 0}
                                image={variant.variantimage || ""}
                                shoplogo={shop.logo || ""}
                                price={variant.price || 0}
                                productName={
                                    (product.name || product.productname || "Unnamed Product") +
                                    (variant.name ? ` - ${variant.name}` : "")
                                }
                                variantName={variant.name || variant.variantname || ""}
                                initialLiked={initialLikeStatuses[variant.id]}
                            />
                        ))
                    )}
                </div>
            </section>
        </div>
    );
};

export default ShopView;