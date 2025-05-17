"use client";

import { Link } from "lucide-react";
import React from "react";
import { toast } from "sonner";

interface ShareProductProps {
    url: string;
}

const ShareProduct: React.FC<ShareProductProps> = ({ url }) => {
    const handleOnClick = async () => {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                // Use modern clipboard API
                await navigator.clipboard.writeText(url);
            } else {
                // Fallback for insecure context or unsupported clipboard API
                const textarea = document.createElement("textarea");
                textarea.value = url;
                textarea.style.position = "fixed"; // Avoid scrolling to bottom
                textarea.style.opacity = "0";
                document.body.appendChild(textarea);
                textarea.focus();
                textarea.select();
                document.execCommand("copy");
                document.body.removeChild(textarea);
            }

            toast.success("Link copied to clipboard!");
        } catch (err) {
            toast.error("Failed to copy the link.",);
            console.error(err)
        }
    };

    return (
        <button onClick={handleOnClick} aria-label="Copy product link">
            <Link className="size-5 cursor-pointer text-blue-700"  />
        </button>
    );
};

export default ShareProduct;
