"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Bookmark } from "lucide-react";
import { bookmarkShop, getBookmarkStatus } from "@/actions/bookmarkShop";
import { Button } from "./ui/button";

interface BookmarkButtonProps {
    shopId: string;
    initialBookmarked?: boolean;
    children?: React.ReactNode;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({
    shopId,
    initialBookmarked = false,
    children,
}) => {
    const [bookmarked, setBookmarked] = useState(initialBookmarked);
    const [isPending, setIsPending] = useState(false);

    useEffect(() => {
        if (initialBookmarked === undefined) {
            const fetchBookmarkStatus = async () => {
                try {
                    const { bookmarked } = await getBookmarkStatus(shopId);
                    setBookmarked(bookmarked);
                } catch (error) {
                    console.error("Failed to fetch bookmark status:", error);
                }
            };
            fetchBookmarkStatus();
        } else {
            setBookmarked(initialBookmarked);
        }
    }, [shopId, initialBookmarked]);

    const handleBookmarkToggle = useCallback(async () => {
        if (isPending) return;
        setIsPending(true);
        const wasBookmarked = bookmarked;
        const newBookmarked = !bookmarked;
        setBookmarked(newBookmarked);

        try {
            const result = await bookmarkShop(shopId);
            if (result.error) {
                console.error("Bookmark action failed:", result.error);
                setBookmarked(wasBookmarked);
            }
        } catch (error) {
            console.error("Unexpected error during bookmark action:", error);
            setBookmarked(wasBookmarked);
        } finally {
            setIsPending(false);
        }
    }, [shopId, bookmarked, isPending]);

    if (children) {
        return (
            <Button onClick={handleBookmarkToggle} disabled={isPending} variant={'special'}>
                {children}
            </Button>
        );
    }

    return (
        <button onClick={handleBookmarkToggle} disabled={isPending}>
            <Bookmark
                fill={bookmarked ? "blue" : "none"}
                color="blue"
                className="size-5 transition-colors duration-200"
            />
        </button>
    );
};

export default BookmarkButton;
