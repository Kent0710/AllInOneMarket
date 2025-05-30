"use client";

import DataTable from "@/components/search";
import { Bookmark, Heart, Search, TicketCheck, User, Lock } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useIsMobileStore } from "@/store/useIsMobileStore";
import { useProductStore } from "@/store/useProductStore";
import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { SearchResultType } from "@/lib/supabase/dbtypes";

const AppHeader = () => {
    const isMobile = useIsMobileStore();
    const { flattenedProducts } = useProductStore();
    const sanitizedProducts: SearchResultType[] = Array.isArray(
        flattenedProducts
    )
        ? flattenedProducts
              .filter((item) => item?.isVariant === true)
              .map((item) => ({
                  id: item.id, // Use item.id instead of product_id
                  shop: item.shopname,
                  variantname: item.variantname || "",
              }))
        : [];

    return isMobile ? (
        <DesktopHeader sanitizedProducts={sanitizedProducts} />
    ) : (
        <MobileHeader sanitizedProducts={sanitizedProducts} />
    );
};

export default AppHeader;

const columns: ColumnDef<SearchResultType>[] = [
    {
        accessorKey: "shop",
        header: "Shop",
    },
    {
        accessorKey: "variantname",
        header: "Variant",
    },
];

interface MobileHeaderProps {
    sanitizedProducts: SearchResultType[];
}
const MobileHeader: React.FC<MobileHeaderProps> = ({ sanitizedProducts }) => {
    return (
        <header className="flex flex-wrap  md:flex-nowrap md:gap-0 justify-center border-b py-2 items-center pt-4 bg-blue-400 shadow-lg rounded-b-xl ">
            {/* <h1 className="font-extrabold bg-gradient-to-tl from-blue-500 to-yellow-500 bg-clip-text text-transparent md:text-md"> */}
            <h1 className="font-extrabold text-xl md:text-md text-white">
                AllInOneMarket
            </h1>
            <div className="flex gap-3 items-center">
                <DataTable
                    columns={columns}
                    data={sanitizedProducts}
                    inputClassName="w-[20rem] focus-visible:bg-white "
                    tableClassName="w-[20rem]"
                    searchColumn="variantname"
                    href={true}
                />
                <Search
                    className="bg-neutral-200/30 rounded-xl p-2 text-blue-600"
                    size={40}
                />
            </div>
        </header>
    );
};

interface DesktopHeaderProps {
    sanitizedProducts: SearchResultType[];
}
const DesktopHeader: React.FC<DesktopHeaderProps> = ({ sanitizedProducts }) => {
    return (
        <header className="py-8 bg-blue-400 rounded-b-3xl shadow-lg text-white">
            <ul className="flex space-x-6 text-xs justify-center">
                <li>
                    <Link href={"/home"}>Home</Link>
                </li>
                <Link href={"/shop"}>
                    <li>Shops</li>
                </Link>
                <Link href={"/product"}>
                    <li>Products</li>
                </Link>
                <Link href={"/likes"}>
                    <li>Likes</li>
                </Link>
                <li>About</li>
                <Link href={"/terms"}>
                    <li>Terms</li>
                </Link>
                <Link href={"/privacy"}>
                    <li>Privacy</li>
                </Link>
                <li>Contact</li>
            </ul>

            <section className="flex items-center justify-center space-x-20">
                {/* <h1 className="font-extrabold bg-gradient-to-tl from-blue-500 to-yellow-400 bg-clip-text text-transparent text-xl"> */}
                <h1 className="font-extrabold  text-xl">AllInOneMarket</h1>
                <DataTable
                    columns={columns}
                    data={sanitizedProducts}
                    inputClassName="w-[40rem]"
                    tableClassName="w-[40rem] text-neutral-700"
                    searchColumn="variantname"
                    href={true}
                />
                <div className="flex space-x-3">
                    <Link href={"/bookmarks"}>
                        <Button size={"icon"} variant={"link"}>
                            <Bookmark className="size-5 text-neutral-700" />
                        </Button>
                    </Link>
                    <Link href={"/likes"}>
                        <Button size={"icon"} variant={"link"}>
                            <Heart className="size-5 text-neutral-700" />
                        </Button>
                    </Link>
                    <Link href={"/checkouts"}>
                        <Button size={"icon"} variant={"link"}>
                            <TicketCheck className="size-5 text-neutral-700" />
                        </Button>
                    </Link>
                    <Link href={"/admin"}>
                        <Button size={"icon"} variant={"link"}>
                            {" "}
                            <Lock className="size-5 text-neutral-700" />{" "}
                        </Button>
                    </Link>
                    <Link href={"/account"}>
                        <Button size={"icon"} variant={"link"}>
                            <User className="size-5 text-neutral-700" />
                        </Button>
                    </Link>
                </div>
            </section>
        </header>
    );
};
