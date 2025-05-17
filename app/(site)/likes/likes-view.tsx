import { getUserLikes } from "@/actions/getUserLikes";
import ProductCard from "@/components/product-card";
import { flattenProducts } from "@/lib/utils";

const LikesView = async () => {
    const likedShops = await getUserLikes();
    const flattenedProducts = flattenProducts(likedShops);

    return (
        <div className="grid grid-cols-2 gap-3 md:gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {flattenedProducts.length !== 0 ? (
                flattenedProducts
                    .filter((product) => typeof product.price === "number")
                    .map((product) => (
                        <ProductCard
                            key={product.id + (product.variantname || "")}
                            productId={product.parent_product_id}
                            variantId={product.id}
                            title={product.shopname}
                            sold={product.sold}
                            image={product.variantimage}
                            shoplogo={product.shop_logo}
                            price={product.price}
                            productName={
                                (product.productname ||
                                    product.parent_productname ||
                                    "Unnamed Product") +
                                (product.variantname
                                    ? ` - ${product.variantname}`
                                    : "")
                            }
                            variantName={product.variantname}
                            initialLiked={true}
                        />
                    ))
            ) : (
                <div> no liked products</div>
            )}
        </div>
    );
};

export default LikesView;
