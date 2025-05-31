"use client";

import { useEffect } from "react";
import { flattenProducts } from "@/lib/utils";
import { useProductStore } from "@/store/useProductStore";
import ProductCard from "./product-card";
import { ShopWithProductsType } from "@/lib/supabase/dbtypes";

import FallbackImage from "../public/noimage-fallback.jpg";

interface ProductsProps {
    shopAndProducts: ShopWithProductsType[];
    initialLikeStatuses?: Record<string, boolean>;
}

const Products: React.FC<ProductsProps> = ({
    shopAndProducts,
    initialLikeStatuses = {},
}) => {
    const { flattenedProducts, setFlattenedProducts } = useProductStore();

    useEffect(() => {
        if (!flattenedProducts) {
            const flat = flattenProducts(shopAndProducts);
            setFlattenedProducts(flat);
        }
    }, [shopAndProducts, flattenedProducts, setFlattenedProducts]);

    const products = flattenedProducts || flattenProducts(shopAndProducts);

    return (
        // <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:gap-6 xl:grid-cols-4 2xl:grid-cols-5"> 
        <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
         {/* this is lg:grid-cols-5 */}
            {products
                .filter((product) => typeof product.price === "number")
                .map((product) => (
                    <ProductCard
                        key={product.id + (product.variantname || "")}
                        productId={product.parent_product_id || product.id}
                        variantId={product.id}
                        title={product.shopname}
                        sold={product.sold}
                        image={
                            product.shopname === "Shares Inc."
                                ? product.productimage || FallbackImage
                                : product.variant_images?.[0] || FallbackImage
                        }
                        shoplogo={product.shop_logo}
                        price={product.price || 0}
                        productName={product.productname}
                        variantName={product.variantname}
                        initialLiked={initialLikeStatuses[product.id]}
                    />
                ))}
        </div>
    );
};

export default Products;
