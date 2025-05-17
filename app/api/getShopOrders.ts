import { getShopOrders } from "@/actions/getShopOrders";
import { NextResponse } from "next/server";

export async function GET() {
    const orders = await getShopOrders();
    return NextResponse.json(orders);
}
