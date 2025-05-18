import { getUserBookmarks } from "@/actions/getUserBookmarks";
import ShopCardWithProduct from "@/components/shop-card-with-product";
import { getBookmarkStatuses } from "@/actions/bookmarkShop";
import { ShopType, ShopWithProductsType } from "@/lib/supabase/dbtypes";
import { Bookmark } from "lucide-react";

const BookmarksView = async () => {
    const bookmarkedShops = await getUserBookmarks();
    const shopIds = bookmarkedShops.map((shop: ShopType) => shop.id);
    const initialBookmarkStatuses = await getBookmarkStatuses(shopIds);

    if (bookmarkedShops.length === 0) {
        return (
            <div className="flex justify-center items-center">
                <div className="flex flex-wrap justify-center items-center gap-3 border-blue-500 rounded-xl px-8 py-4 border ">
                    <Bookmark
                        size={40}
                        className="animate-pulse "
                        fill="blue"
                        color="blue"
                    />
                    <div>
                        <h4 className="font-semibold text-blue-500 text-lg text-center">
                            No bookmarked shop
                        </h4>
                        <p className="text-neutral-500 text-sm text-center">
                            {" "}
                            Start hitting the bookmark button to bookmark a shop.{" "}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-wrap gap-6 justify-center">
            {bookmarkedShops.map((shop: ShopWithProductsType) => (
                <ShopCardWithProduct
                    key={shop.id}
                    shopId={shop.id}
                    shoplogo={shop.logo || ""}
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
