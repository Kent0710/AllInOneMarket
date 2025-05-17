import { getUserBookmarks } from "@/actions/getUserBookmarks";
import ShopCardWithProduct from "@/components/shop-card-with-product";
import { getBookmarkStatuses } from "@/actions/bookmarkShop";
import { ShopType, ShopWithProductsType } from "@/lib/supabase/dbtypes";

const BookmarksView = async () => {
    const bookmarkedShops = await getUserBookmarks();
    const shopIds = bookmarkedShops.map(
        (shop: ShopType) => shop.id
    );
    const initialBookmarkStatuses = await getBookmarkStatuses(shopIds);

    return (
        <div className="flex flex-wrap gap-6 justify-center">
            {bookmarkedShops.map((shop: ShopWithProductsType) => (
                <ShopCardWithProduct
                    key={shop.id}
                    shopId={shop.id}
                    shoplogo={shop.logo}
                    shopName={shop.shopname}
                    shopDescription={shop.description}
                    productName={shop.products[0].productname}
                    productDescription={shop.products[0].description}
                    initialBookmarked={initialBookmarkStatuses[shop.id]}
                    variants={shop.products[0]?.variants || []}
                />
            ))}
        </div>
    );
};

export default BookmarksView;
