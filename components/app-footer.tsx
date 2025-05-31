"use client";

import Link from "next/link";

const AppFooter = () => {
    return (
        <footer className="bg-gray-100 text-gray-700 text-sm mt-10 border-t border-gray-200 pb-[7dvh] md:pb-[0dvh]">
            <div className="max-w-6xl mx-auto px-4 py-8">
                <ul className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs md:text-sm mb-4">
                    <li>
                        <Link href="/home" className="hover:underline">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/shop" className="hover:underline">
                            Shops
                        </Link>
                    </li>
                    <li>
                        <Link href="/product" className="hover:underline">
                            Products
                        </Link>
                    </li>
                    <li>
                        <Link href="/likes" className="hover:underline">
                            Likes
                        </Link>
                    </li>
                    <li>
                        <Link href="/bookmarks" className="hover:underline">
                            Bookmarks
                        </Link>
                    </li>
                    <li>
                        <Link href="/checkouts" className="hover:underline">
                            Checkouts
                        </Link>
                    </li>
                    <li>
                        <Link href="/account" className="hover:underline">
                            Account
                        </Link>
                    </li>
                    <li>
                        <Link href="/about" className="hover:underline">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link href="/privacy" className="hover:underline">
                            Privacy
                        </Link>
                    </li>
                    <li>
                        <Link href="/terms" className="hover:underline">
                            Terms
                        </Link>
                    </li>
                    <li>
                        <Link href="/contact" className="hover:underline">
                            Contact
                        </Link>
                    </li>
                </ul>

                <div className="text-center text-xs md:text-sm text-gray-500 mb-2">
                    © {new Date().getFullYear()}{" "}
                    <strong>AllInOneMarket</strong>. All rights reserved.
                </div>

                <div className="text-center text-xs text-gray-400 max-w-xl mx-auto leading-relaxed">
                    All product images, logos, and trademarks belong to
                    their respective shops and owners. AllInOneMarket only
                    serves as a marketplace platform and does not claim
                    ownership of third-party content.
                </div>
            </div>
        </footer>
    );
};

export default AppFooter;