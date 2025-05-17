import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { User as SupabaseUser } from "@supabase/supabase-js";

export enum OrderStatus {
    Pending = "pending",
    Claimed = "claimed",
}

type UUID = string;

type Time = string;

export interface OrderType {
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

export interface OrderWithDetails {
    id: UUID;
    code: string;
    status: OrderStatus;
    ordertime: Time;
    quantity: number;
    user_id: UUID | null;
    product: ProductType;
    variant: VariantType;
    shop: ShopType;
}

export interface ProductType {
    id: UUID;
    productname: string;
    description: string | null;
    productimage: string | StaticImport;
    shop_id: UUID | null;
    shop: ShopType;
    quantity: number | null;
    sold: number | null;
}

export interface ProductWithVariantsType extends ProductType {
    variants: VariantType[];
}

export interface ShopType {
    id: UUID;
    shopname: string;
    description: string | null;
    logo: string | StaticImport | null;
    owner_id: UUID | null;
}

export interface ShopWithProductsType extends ShopType {
    products: ProductWithVariantsType[];
}

export interface ShopOrdersType {
    shop_id: UUID;
    order_id: UUID;
}

export interface UserBookmarksType {
    user_id: UUID;
    shop_id: UUID;
}

export interface UserLikesType {
    user_id: UUID;
    variant_id: UUID;
}

export interface UserOrdersType {
    user_id: UUID;
    order_id: UUID;
}

export interface VariantType {
    id: UUID;
    variantname: string;
    price: number;
    variantimage: string | StaticImport;
    product_id: UUID | null;
    quantity: number;
    sold: number;
    variant_images: string[];
}

export interface AuthUserType {
    id: UUID;
}

export interface ShopCardWithProductPropsType {
    shopId: UUID;
    shoplogo: string | StaticImport | null;
    shopName: string;
    shopDescription: string | null;
    productName: string;
    productDescription: string | null;
    variants: VariantType[];
    initialBookmarked?: boolean;
}

export interface FlattenedProductType {
    id: UUID;
    shopname: string;
    shop_id: UUID;
    shop_logo: string | StaticImport;
    isVariant: boolean;
    productname: string;
    parent_product_id: UUID | null;
    parent_productname: string | null;
    description: string | null;
    productimage: string | StaticImport;
    quantity: number | null;
    sold: number | null;
    variantname?: string;
    price?: number;
    variantimage?: string | StaticImport;
    variant_images?: string[];
    liked?: boolean;
}

export interface ExtendedUserType extends SupabaseUser {
    shop: ShopWithProductsType | null;
}

export interface CheckoutCardPropsType {
    productName: string;
    variantName: string;
    shopName: string;
    code: string;
    status: OrderStatus;
    quantity: string;
    variantimage: string | StaticImport;
}

export interface CustomizeProductViewPropsType {
    selectedVariant: VariantType;
    product: ProductType;
}

export interface SearchResultType {
    id: UUID;
    shop: string;
    variantname: string;
}