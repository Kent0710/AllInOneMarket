"use client";

import { useState, useEffect, useCallback } from "react";
import { Heart } from "lucide-react";
import { likeProduct, getLikeStatus } from "@/actions/likeProduct";
import { useProductStore } from "@/store/useProductStore";

interface LikeProductProps {
    productId: string;
    variantId: string;
    initialLiked?: boolean;
}

const LikeProduct: React.FC<LikeProductProps> = ({ productId, variantId, initialLiked = false }) => {
    const [liked, setLiked] = useState(initialLiked);
    const [isPending, setIsPending] = useState(false);
    const { updateProductLike } = useProductStore();

    useEffect(() => {
        if (initialLiked === undefined) {
            const fetchLikeStatus = async () => {
                const { liked } = await getLikeStatus(variantId);
                setLiked(liked);
                updateProductLike(productId, liked);
            };
            fetchLikeStatus();
        }
    }, [productId, variantId, initialLiked, updateProductLike]);

    const handleOnClick = useCallback(async () => {
        if (isPending) return;
        setIsPending(true);
        const wasLiked = liked;
        setLiked(!liked);
        updateProductLike(productId, !liked);

        const result = await likeProduct(variantId);
        if (result.error) {
            setLiked(wasLiked);
            updateProductLike(productId, wasLiked);
        }
        setIsPending(false);
    }, [productId, variantId, liked, isPending, updateProductLike]);

    return (
        <button onClick={handleOnClick} disabled={isPending}>
            <Heart
                fill={liked ? "red" : "none"}
                color="red"
                className="size-5 transition-colors duration-200"
            />
        </button>
    );
};

export default LikeProduct;