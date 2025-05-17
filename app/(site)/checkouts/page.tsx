import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";
import { getOrders } from "@/actions/getOrders";
import React from "react";
import Link from "next/link";

import NoImageFallback from "../../../public/noimage-fallback.jpg";
import { OrderWithDetails } from "@/lib/supabase/dbtypes";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export default async function Checkouts() {
    const { orders } = await getOrders();

    return (
        <main className="mx-[2rem] md:mx-[10rem] flex flex-col items-center">
            <h2 className="text-center font-extrabold text-lg whitespace-nowrap mb-3">
                {" "}
                Checkout History{" "}
            </h2>

            <section className="flex justify-center gap-6 flex-wrap">
                {(orders as OrderWithDetails[]).map((order ) => (
                    <CheckoutCard
                        key={order.id}
                        productName={order.product.productname}
                        variantName={order.variant.variantname}
                        shopName={order.shop.shopname}
                        code={order.code}
                        status={order.status}
                        quantity={order.quantity.toString()}
                        variantimage={order.variant.variantimage || ""}
                    />
                ))}
            </section>
        </main>
    );
}

interface CheckoutCardProps {
    productName: string;
    variantName: string;
    shopName: string;
    code: string;
    status: string;
    quantity: string;
    variantimage: string | StaticImport;
}
const CheckoutCard: React.FC<CheckoutCardProps> = ({
    productName,
    variantName,
    shopName,
    code,
    status,
    quantity,
    variantimage,
}) => {
    return (
        <div className="bg-card text-card-foreground flex flex-col rounded-xl border py-6 shadow-sm px-6 md:flex-row md:flex-wrap items-center justify-center gap-6 w-full">
            <Image
                src={variantimage || NoImageFallback}
                alt="sampleimage"
                className="object-contain h-[12rem] w-auto"
                width={144}
                height={144}
            />

            <section className="flex-1 flex-col items-center md:items-start  flex min-w-[12rem]">
                <h4 className="text-lg font-semibold whitespace-nowrap">
                    {productName} - {variantName} (Variant)
                </h4>
                <p className="mb-3 text-blue-600 border-b pb-[0.5px] text-sm w-fit border-blue-600">
                    {shopName}
                </p>
                <Link href={`/shop/${shopName}`}>
                    <Button variant={"special"}>
                        <Package />
                        View product
                    </Button>
                </Link>
            </section>

            <section className="flex-1 min-w-[12rem] text-center">
                <h5 className="font-extrabold text-3xl mt-6 text-blue-600">
                    {code}
                </h5>
                <p className="mt-4 text-xs">
                    Quantity:{" "}
                    <span className="font-semibold underline cursor-not-allowed">
                        {quantity}
                    </span>
                </p>
            </section>

            <section className="flex flex-col items-center gap-3 min-w-[12rem]">
                <p>
                    Status:{" "}
                    <span className="font-bold border-b pb-[0.5px]">
                        {status}
                    </span>
                </p>
                <Button>Mark as claimed</Button>
            </section>
        </div>
    );
};
