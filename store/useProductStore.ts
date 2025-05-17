import { create } from "zustand";

interface Product {
    id: string;
    parent_product_id: string;
    liked?: boolean;
    [key: string]: any;
}

interface ProductStore {
    flattenedProducts: Product[] | null;
    setFlattenedProducts: (products: Product[]) => void;
    updateProductLike: (productId: string, liked: boolean) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
    flattenedProducts: null,
    setFlattenedProducts: (products) =>
        set({ flattenedProducts: products }),
    updateProductLike: (productId, liked) =>
        set((state) => {
            if (!state.flattenedProducts) return state;
            return {
                flattenedProducts: state.flattenedProducts.map((product) =>
                    product.parent_product_id === productId
                        ? { ...product, liked }
                        : product
                ),
            };
        }),
}));