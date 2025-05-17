"use client";

import { useMemo, useState, useEffect } from "react";
import DataTable from "@/components/search";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { updateOrderStatus } from "@/actions/updateOrderStatus";
import { supabaseClient } from "@/lib/supabase/client";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import { toast } from "sonner";

type Order = {
    id: string;
    username?: string; // Optional, as it may be "Unknown" if not set
    variantName: string;
    code: string;
    status: string;
    orderTime: string;
};

interface AdminTableProps {
    orders: Order[];
}

const parseTime = (time: string): Date => {
    const [hourMin, modifier] = time.split(" ");
    let [hours, minutes] = hourMin.split(":").map(Number);
    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;
    return new Date(0, 0, 0, hours, minutes);
};

const AdminTable: React.FC<AdminTableProps> = ({ orders: initialOrders }) => {
    const [statusFilter, setStatusFilter] = useState("");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [orderList, setOrderList] = useState<Order[]>(initialOrders);

    // Set up real-time subscription
    useEffect(() => {
        const subscription = supabaseClient
            .channel("shop-orders-channel")
            .on(
                "postgres_changes",
                { event: "INSERT", schema: "public", table: "ShopOrders" },
                async (
                    payload: RealtimePostgresChangesPayload<{
                        order_id: string;
                    }>
                ) => {
                    console.log("INSERT detected:", payload);
                    const newOrder = await fetchOrderDetails(
                        payload.new.order_id
                    );
                    if (newOrder) {
                        setOrderList((prev) => [...prev, newOrder]);
                        toast.success("New order added");
                    } else {
                        toast.error("Failed to fetch new order details");
                    }
                }
            )
            .on(
                "postgres_changes",
                { event: "UPDATE", schema: "public", table: "ShopOrders" },
                async (
                    payload: RealtimePostgresChangesPayload<{
                        order_id: string;
                    }>
                ) => {
                    console.log("UPDATE detected:", payload);
                    const updatedOrder = await fetchOrderDetails(
                        payload.new.order_id
                    );
                    if (updatedOrder) {
                        setOrderList((prev) =>
                            prev.map((order) =>
                                order.id === updatedOrder.id
                                    ? updatedOrder
                                    : order
                            )
                        );
                        toast.success("Order updated");
                    } else {
                        toast.error("Failed to fetch updated order details");
                    }
                }
            )
            .on(
                "postgres_changes",
                { event: "DELETE", schema: "public", table: "ShopOrders" },
                (
                    payload: RealtimePostgresChangesPayload<{
                        order_id: string;
                    }>
                ) => {
                    console.log("DELETE detected:", payload);
                    setOrderList((prev) =>
                        prev.filter(
                            (order) => order.id !== payload.old.order_id
                        )
                    );
                    toast.success("Order deleted");
                }
            )
            .subscribe();

        return () => {
            supabaseClient.removeChannel(subscription);
        };
    }, []); // Empty dependency array since supabaseClient is a singleton

    async function fetchOrderDetails(orderId: string): Promise<Order | null> {
        try {
            const response = await fetch(`/api/getOrder?orderId=${orderId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                console.error("Failed to fetch order:", response.statusText);
                return null;
            }
            const order: Order = await response.json();
            return order;
        } catch (error) {
            console.error("Error fetching order:", error);
            return null;
        }
    }

    const columns: ColumnDef<Order>[] = [
        {
            accessorKey: "username",
            header: "Username",
            cell: ({ row }) => row.original.username || "Unknown",
        },
        {
            accessorKey: "variantName",
            header: "Variant",
        },
        {
            accessorKey: "code",
            header: "Order Code",
        },
        {
            accessorKey: "status",
            header: "Status",
        },
        {
            accessorKey: "orderTime",
            header: "Order Time",
        },
        {
            id: "action",
            header: "Action",
            cell: ({ row }) => (
                <Button
                    variant="outline"
                    size="sm"
                    onClick={async () => {
                        const orderId = row.original.id;
                        const currentStatus = row.original.status;
                        const result = await updateOrderStatus(
                            orderId,
                            currentStatus
                        );
                        if (!result.error) {
                            setOrderList((prev) =>
                                prev.map((order) =>
                                    order.id === orderId
                                        ? {
                                              ...order,
                                              status:
                                                  result.status
                                                      .charAt(0)
                                                      .toUpperCase() +
                                                  result.status.slice(1),
                                          }
                                        : order
                                )
                            );
                            toast.success(`Order marked as ${result.status}`);
                        } else {
                            toast.error("Failed to update order status");
                        }
                    }}
                >
                    {row.original.status === "Claimed"
                        ? "Mark Pending"
                        : "Mark Claimed"}
                </Button>
            ),
        },
    ];

    const filteredSortedOrders = useMemo(() => {
        const filtered = orderList.filter((order) =>
            statusFilter ? order.status === statusFilter : true
        );

        return filtered.sort((a, b) => {
            const timeA = parseTime(a.orderTime);
            const timeB = parseTime(b.orderTime);
            return sortOrder === "asc"
                ? timeA.getTime() - timeB.getTime()
                : timeB.getTime() - timeA.getTime();
        });
    }, [orderList, statusFilter, sortOrder]);

    return (
        <div className="h-screen">
            <main className="mx-[1rem] md:mx-[10rem]">
                <h2 className="text-center font-extrabold text-lg whitespace-nowrap mb-3">
                    Shop Orders
                </h2>
                <section>
                    <DataTable
                        columns={columns}
                        data={filteredSortedOrders}
                        inputClassName="w-full"
                        tableClassName="w-full static shadow-none"
                        searching={true}
                        searchColumn="code"
                    >
                        <div className="flex gap-3">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">
                                        Filter by Status{" "}
                                        <ChevronDown className="ml-1" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    {["All", "Pending", "Claimed"].map(
                                        (status) => (
                                            <DropdownMenuItem
                                                key={status}
                                                onClick={() =>
                                                    setStatusFilter(
                                                        status === "All"
                                                            ? ""
                                                            : status
                                                    )
                                                }
                                            >
                                                {status}
                                            </DropdownMenuItem>
                                        )
                                    )}
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">
                                        Sort by Time{" "}
                                        <ChevronDown className="ml-1" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem
                                        onClick={() => setSortOrder("asc")}
                                    >
                                        Latest First
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => setSortOrder("desc")}
                                    >
                                        Earliest First
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </DataTable>
                </section>
            </main>
        </div>
    );
};

export default AdminTable;
