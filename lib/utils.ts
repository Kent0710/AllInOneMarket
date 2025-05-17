import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function toLowerCaseHelper(text: string): string {
    return text
        .toLowerCase() // Convert the entire string to lowercase
        .replace(/[^a-zA-Z0-9 ]/g, "") // Remove non-alphanumeric characters
        .split(" ") // Split the string into words
        .map((word) => word.toLowerCase()) // Ensure each word is in lowercase
        .join(""); // Join the words back together
}

// lib/flattenProducts.ts
export function flattenProducts(shopAndProducts: any[]) {
    return shopAndProducts.flatMap((shop) =>
        shop.products.flatMap((product) => {
            // The base product (non-variant)
            const baseProduct = {
                ...product,
                shopname: shop.shopname,
                shop_id: shop.id,
                shop_logo: shop.logo,
                isVariant: false,
            };

            // Each variant is treated as a separate product
            const variantProducts = product.variants.map((variant) => ({
                ...variant,
                parent_product_id: product.id,
                parent_productname: product.productname,
                description: product.description,
                productimage: product.productimage,
                shopname: shop.shopname,
                shop_id: shop.id,
                shop_logo: shop.logo,
                isVariant: product.productname === 'Pancake Skewowrz' ? false : true,
            }));

            return [baseProduct, ...variantProducts];
        })
    );
};

import { StaticImport } from "next/dist/shared/lib/get-img-props";
import NoImageFallback from '../public/noimage-fallback.jpg'
export const getSafeImageSrc = (
  src: string | StaticImport | undefined
): string | StaticImport => {
  return src && typeof src === "string" && src.trim() !== ""
    ? src
    : NoImageFallback;
};