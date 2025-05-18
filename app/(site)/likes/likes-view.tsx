import { getUserLikes } from "@/actions/getUserLikes";
import ProductCard from "@/components/product-card";
import { flattenProducts } from "@/lib/utils";
import { Heart } from "lucide-react";

const LikesView = async () => {
    const likedShops = await getUserLikes();
    const flattenedProducts = flattenProducts(likedShops);

    if (likedShops.length === 0) {
        return (
            <div className="flex justify-center items-center">
                <div className="flex flex-wrap justify-center items-center gap-3 border-red-500 rounded-xl px-8 py-4 border m-10">
                    <Heart size={40} className="animate-pulse " fill="red" color="red" />
                    <div>
                        <h4 className="font-semibold text-red-500 text-lg"> No liked product.</h4>
                        <p className="text-neutral-500 text-sm">
                            {" "}
                            Start hitting the heart button to like a product.{" "}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 gap-3 md:gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {flattenedProducts
                .filter((product) => typeof product.price === "number")
                .map((product) => (
                    <ProductCard
                        key={product.id + (product.variantname || "")}
                        productId={product.parent_product_id}
                        variantId={product.id}
                        title={product.shopname}
                        sold={product.sold}
                        image={product.variantimage || ""}
                        shoplogo={product.shop_logo}
                        price={product.price || 0}
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
                ))}
        </div>
    );
};

export default LikesView;
