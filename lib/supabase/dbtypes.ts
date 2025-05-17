import { StaticImport } from "next/dist/shared/lib/get-img-props";

export enum OrderStatus {
    Pending = "pending",
    Claimed = "claimed",
}

type UUID = string;

type Time = string;

export interface Order {
    id: UUID;
    code: string;
    status: OrderStatus;
    variant: UUID | null;
    shop: UUID | null;
    ordertime: Time;
    product: UUID | null;
    quantity: number;
    user_id: UUID | null;
}

export interface Product {
    id: UUID;
    productname: string;
    description: string | null;
    productimage: string | null;
    shop_id: UUID | null;
    quantity: number | null;
    sold: number | 0;
}

export interface ProductWithVariants extends Product {
    variants: Variant[];
}

export interface Shop {
    id: UUID;
    shopname: string;
    description: string | null;
    logo: string | StaticImport;
    owner_id: UUID | null;
}

export interface ShopWithProducts extends Shop {
    products: ProductWithVariants[];
}

export interface ShopOrders {
    shop_id: UUID;
    order_id: UUID;
}

export interface UserBookmarks {
    user_id: UUID;
    shop_id: UUID;
}

export interface UserLikes {
    user_id: UUID;
    variant_id: UUID;
}

export interface UserOrders {
    user_id: UUID;
    order_id: UUID;
}

export interface Variant {
    id: UUID;
    variantname: string;
    price: number;
    variantimage: string | null;
    product_id: UUID | null;
    quantity: number;
    sold: number;
    variant_images: string[];
}

export interface AuthUser {
    id: UUID;
}

export interface ShopCardWithProductProps {
    shopId: UUID;
    shoplogo: string | StaticImport | null;
    shopName: string;
    shopDescription: string | null;
    productName: string;
    productDescription: string | null;
    variants: Variant[];
    initialBookmarked?: boolean;
}

export interface FlattenedProduct {
    id: UUID;
    shopname: string;
    shop_id: UUID;
    shop_logo: string | StaticImport;
    isVariant: boolean;
    productname: string;
    parent_product_id: UUID | null; // null for base products
    parent_productname: string | null; // null for base products
    description: string | null;
    productimage: string | null;
    quantity: number | 0;
    sold: number | 0;
    variantname: string; // only for variants
    price: number; // only for variants
    variantimage?: string ; // only for variants
    variant_images?: string[]; // only for variants
    liked?: boolean; // optional for like status
}