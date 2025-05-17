"use client";

import { useEffect } from "react";
import { flattenProducts } from "@/lib/utils";
import { useProductStore } from "@/store/useProductStore";
import ProductCard from "./product-card";
import { ShopWithProductsType } from "@/lib/supabase/dbtypes";

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
        <div className="grid grid-cols-2 gap-3 md:gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {products
                .filter((product) => typeof product.price === "number")
                .map((product) => (
                    <ProductCard
                        key={product.id + (product.variantname || "")}
                        productId={product.parent_product_id || product.id}
                        variantId={product.id}
                        title={product.shopname}
                        sold={product.sold}
                        image={product.variantimage || ''}
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
                        initialLiked={initialLikeStatuses[product.id]}
                    />
                ))}
        </div>
    );
};

export default Products;