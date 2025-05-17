"use client";

import { useState } from "react";
import ShopCardWithProduct from "./shop-card-with-product";

interface ShopsProps {
    shopAndProducts: any[];
    initialBookmarkStatuses?: Record<string, boolean>;
}

const Shops: React.FC<ShopsProps> = ({
    shopAndProducts: shopAndProductsData,
    initialBookmarkStatuses = {},
}) => {
    const [shopAndProducts, setShopAndProducts] = useState(shopAndProductsData);

    return (
        <>
            {shopAndProducts.map((shop) => (
                <ShopCardWithProduct
                    key={shop.id}
                    shopId={shop.id}
                    shoplogo={shop.logo}
                    shopName={shop.name || shop.shopname}
                    shopDescription={shop.description}
                    productName={shop.products[0]?.name || shop.products[0]?.productname || "No Product"}
                    productDescription={shop.products[0]?.description || "No description available"}
                    initialBookmarked={initialBookmarkStatuses[shop.id]}
                />
            ))}
        </>
    );
};

export default Shops;