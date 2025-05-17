import { getShopAndProducts } from "@/actions/getShopAndProducts";
import { getLikeStatuses } from "@/actions/likeProduct";
import Products from "@/components/products";

const ProductsView = async () => {
    const shopAndProducts = await getShopAndProducts();
    const variantIds = shopAndProducts
        .flatMap((shop) => shop.products)
        .flatMap((product) => product.variants)
        .map((variant) => variant.id);
    const initialLikeStatuses = await getLikeStatuses(variantIds);

    return (
        <div >
            <Products
                shopAndProducts={shopAndProducts}
                initialLikeStatuses={initialLikeStatuses}
            />
        </div>
    );
};

export default ProductsView;
