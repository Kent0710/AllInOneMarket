import { getOrders } from "@/actions/getOrders";
import { OrderWithDetails } from "@/lib/supabase/dbtypes";
import CheckoutCard from "@/components/checkout-card";
import { TicketCheck } from "lucide-react";

const CheckoutsView = async () => {
    const { orders } = await getOrders();

    if (orders.length === 0) {
        return (
            <div className="flex justify-center items-center">
                <div className="flex flex-wrap justify-center items-center gap-3 border-blue-500 rounded-xl px-8 py-4 border m-10">
                    <TicketCheck
                        size={40}
                        className="animate-pulse "
                        fill="blue"
                        color="blue"
                    />
                    <div>
                        <h4 className="font-semibold text-blue-500 text-lg">
                            No checkouts
                        </h4>
                        <p className="text-neutral-500 text-sm">
                            {" "}
                            Make an order to start your first checkout.{" "}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <section className="flex justify-center gap-6 flex-wrap">
            {(orders as OrderWithDetails[]).map((order) => (
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
    );
};

export default CheckoutsView;
