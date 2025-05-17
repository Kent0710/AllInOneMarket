"use client";

import { useState } from "react";
import ShopCardWithProduct from "./shop-card-with-product";
import {  ShopWithProductsType } from "@/lib/supabase/dbtypes";

interface ShopsProps {
    shopAndProducts: ShopWithProductsType[];
    initialBookmarkStatuses?: Record<string, boolean>;
}

const Shops: React.FC<ShopsProps> = ({
    shopAndProducts: shopAndProductsData,
    initialBookmarkStatuses = {},
}) => {
    const [shopAndProducts] = useState(shopAndProductsData);

    return (
        <>
            {shopAndProducts.map((shop) => (
                <ShopCardWithProduct
                    key={shop.id}
                    shopId={shop.id}
                    shoplogo={shop.logo || ''}
                    shopName={shop.shopname}
                    shopDescription={shop.description}
                    productName={shop.products[0]?.productname || "No Product"}
                    productDescription={
                        shop.products[0]?.description ||
                        "No description available"
                    }
                    initialBookmarked={initialBookmarkStatuses[shop.id]}
                    variants={shop.products[0]?.variants || []}
                />
            ))}
        </>
    );
};

export default Shops;
