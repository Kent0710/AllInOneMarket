import { getShopAndProducts } from "@/actions/getShopAndProducts";
import { getLikeStatuses } from "@/actions/likeProduct";
import Products from "@/components/products";
import {
    ProductWithVariantsType,
    ShopWithProductsType,
    VariantType,
} from "@/lib/supabase/dbtypes";

const ProductsView = async () => {
    const shopAndProducts = await getShopAndProducts();
    const variantIds = shopAndProducts
        .flatMap((shop: ShopWithProductsType) => shop.products)
        .flatMap((product: ProductWithVariantsType) => product.variants)
        .map((variant: VariantType) => variant.id);
    const initialLikeStatuses = await getLikeStatuses(variantIds);

    return (
        <div>
            <Products
                shopAndProducts={shopAndProducts}
                initialLikeStatuses={initialLikeStatuses}
            />
        </div>
    );
};

export default ProductsView;
