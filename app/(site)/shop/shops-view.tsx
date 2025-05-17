import { getShopAndProducts } from "@/actions/getShopAndProducts";
import { getBookmarkStatuses } from "@/actions/bookmarkShop";
import Shops from "@/components/shops";
import { Shop } from "@/lib/supabase/dbtypes";

const ShopsView = async () => {
    const shopAndProducts = await getShopAndProducts();
    const shopIds = shopAndProducts
        .map((shop : Shop) => shop.id)
        .filter((id : string) => id && id !== "undefined");
    const initialBookmarkStatuses = await getBookmarkStatuses(shopIds);

    return (
        <div className="flex flex-wrap gap-6 justify-center">
            <Shops
                shopAndProducts={shopAndProducts}
                initialBookmarkStatuses={initialBookmarkStatuses}
            />
        </div>
    );
};

export default ShopsView;
