import { getOrders } from "@/actions/getOrders";
import React from "react";
import { OrderWithDetails } from "@/lib/supabase/dbtypes";
import CheckoutCard from "@/components/checkout-card";

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

