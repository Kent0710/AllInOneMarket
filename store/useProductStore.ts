import { create } from "zustand";
import { FlattenedProductType } from "@/lib/supabase/dbtypes";

interface ProductStore {
    flattenedProducts: FlattenedProductType[] | null;
    setFlattenedProducts: (products: FlattenedProductType[]) => void;
    updateProductLike: (productId: string, liked: boolean) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
    flattenedProducts: null,
    setFlattenedProducts: (products) => set({ flattenedProducts: products }),
    updateProductLike: (productId, liked) =>
        set((state) => {
            if (!state.flattenedProducts) return state;
            return {
                flattenedProducts: state.flattenedProducts.map((product) =>
                    product.id === productId ? { ...product, liked } : product
                ),
            };
        }),
}));
