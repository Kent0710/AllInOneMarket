"use client";

import DataTable, { result } from "@/components/search";

import { Bookmark, Heart, TicketCheck, User } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useIsMobileStore } from "@/store/useIsMobileStore";
import { useProductStore } from "@/store/useProductStore";
import React, { useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";

const AppHeader = () => {
    const isMobile = useIsMobileStore();
    const { flattenedProducts, setFlattenedProducts } = useProductStore();
    const sanitizedProducts = Array.isArray(flattenedProducts)
        ? flattenedProducts
              .filter((item) => item?.isVariant === true)
              .map((item) => ({
                  id: item.product_id,
                  shop: item.shopname,
                  variantname: item.variantname,
              }))
        : [];

    return isMobile ? (
        <MobileHeader sanitizedProducts={sanitizedProducts} />
    ) : (
        <DesktopHeader sanitizedProducts={sanitizedProducts} />
    );
};

export default AppHeader;

type Product = {
    shop: string;
    productname: string;
};

const columns: ColumnDef<Product>[] = [
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
    sanitizedProducts: any;
}
const MobileHeader: React.FC<MobileHeaderProps> = ({ sanitizedProducts }) => {
    return (
        <header className="flex justify-between border-b py-2 flex-col items-center pt-4 ">
            <div />
            <h1 className="font-extrabold bg-gradient-to-tl from-blue-500 to-yellow-500 bg-clip-text text-transparent text-xl">
                {" "}
                AllInOneMarket{" "}
            </h1>
            <DataTable
                columns={columns}
                data={sanitizedProducts}
                inputClassName="w-[23rem] border-blue-500 border shadow-sm"
                tableClassName="w-[23rem]"
                searchColumn="variantname"
                    href={true}

            />
        </header>
    );
};

interface DesktopHeaderProps {
    sanitizedProducts: any;
}
const DesktopHeader: React.FC<DesktopHeaderProps> = ({ sanitizedProducts }) => {
    return (
        <header className="py-8 bg-white ">
            <ul className="flex space-x-6 text-xs justify-center">
                <li>
                    <Link href={"/home"}>Home</Link>
                </li>
                <Link href={"/shop"}>
                    <li> Shops </li>
                </Link>
                <Link href={"/product"}>
                    <li> Products </li>
                </Link>

                <Link href={"/likes"}>
                    <li> Likes </li>
                </Link>

                <li> About </li>

                <Link href={"/terms"}>
                    <li> Terms </li>
                </Link>

                <Link href={"/privacy"}>
                    <li> Privacy </li>
                </Link>
                <li> Contact </li>
            </ul>

            <section className="flex items-center justify-center space-x-20">
                <h1 className="font-extrabold bg-gradient-to-tl from-blue-500 to-yellow-400 bg-clip-text text-transparent text-xl">
                    {" "}
                    AllInOneMarket{" "}
                </h1>
                <DataTable
                    columns={columns}
                    data={sanitizedProducts}
                    inputClassName="w-[40rem]"
                    tableClassName="w-[40rem]"
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
