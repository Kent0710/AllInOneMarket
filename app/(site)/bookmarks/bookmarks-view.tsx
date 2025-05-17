import { getUserBookmarks } from "@/actions/getUserBookmarks";
import ShopCardWithProduct from "@/components/shop-card-with-product";
import { getBookmarkStatuses } from "@/actions/bookmarkShop";

const BookmarksView = async () => {
    const bookmarkedShops = await getUserBookmarks();
    const shopIds = bookmarkedShops.map(shop => shop.id);
    const initialBookmarkStatuses = await getBookmarkStatuses(shopIds);

    return (
        <div className="flex flex-wrap gap-6 justify-center">

        {bookmarkedShops.map((shop) => (
            <ShopCardWithProduct 
                key={shop.id}
                shopId={shop.id}
                shoplogo={shop.logo}
                shopName={shop.shopname}
                shopDescription={shop.description}
                productName={shop.products[0].productname}
                productDescription={shop.products[0].description}
                initialBookmarked={initialBookmarkStatuses[shop.id]}
            />
        ))}

            {/* {bookmarkedShops.map(shop => {
                const product = shop.products[0] || {};
                const variants = product.variants || [];
                return (
                    <ShopCardWithProduct
                        key={shop.id}
                        shopId={shop.id}
                        shoplogo={shop.logo || ""}
                        shopName={shop.shopname|| "Unnamed Shop"}
                        shopDescription={shop.description}
                        productName={shop.products[0].productname}
                        productDescription={shop.products[0].description}
                        variants={variants.map(variant => ({
                            variantname: variant.name || "",
                            variantimage: variant.image || "",
                        }))}
                        initialBookmarked={initialBookmarkStatuses[shop.id]}
                    />
                );
            })} */}
        </div>
    );
};

export default BookmarksView;