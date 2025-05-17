"use server";

import { getSupabaseClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { format } from "date-fns"; // For formatting datetime
import { revalidatePath } from "next/cache";
import { OrderType } from "@/lib/supabase/dbtypes";

type MakeOrderParams = {
    productId: string;
    shopId: string;
    variantId: string;
    quantity: number;
};

// Function to generate a random alphanumeric code of specified length
function generateRandomCode(length: number): string {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters[randomIndex];
    }
    return code;
}

// Function to generate a unique code of specified length
async function generateUniqueCode(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    supabase: any,
    length: number
): Promise<string> {
    let isUnique = false;
    let code = "";
    let attempts = 0;
    const maxAttempts = 10;

    while (!isUnique && attempts < maxAttempts) {
        code = generateRandomCode(length);

        // Check if code exists in Supabase
        const { data, error } = await supabase
            .from("Order")
            .select("code")
            .eq("code", code)
            .maybeSingle();

        if (error) {
            console.error("Error checking code uniqueness:", error);
            throw new Error("Failed to verify code uniqueness.");
        }

        // If no record is found, the code is unique
        isUnique = !data;
        attempts++;
    }

    if (!isUnique) {
        throw new Error(
            "Failed to generate a unique code after multiple attempts."
        );
    }

    return code;
}

export async function makeOrder({
    productId,
    shopId,
    variantId,
    quantity,
}: MakeOrderParams) {
    if (!productId || !shopId || !variantId) {
        return {
            success: false,
            error: "Missing product, shop, or variant id(s)",
            order: null,
        };
    }

    const supabase = await getSupabaseClient();

    // Get authenticated user
    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
        console.error("User not authenticated:", authError);
        redirect("/login");
    }

    // Generate a unique code of specified length (e.g., 8 characters)
    const code = await generateUniqueCode(supabase, 8);

    // Get current time in "HH:mm:ss" format
    const ordertime = format(new Date(), "HH:mm:ss");

    // Insert the order
    const { error: insertError, data: order } = await supabase
        .from("Order")
        .insert([
            {
                code,
                product: productId,
                shop: shopId,
                variant: variantId,
                ordertime,
                quantity,
                user_id: user.id,
            },
        ])
        .select()
        .single();

    if (insertError) {
        console.error("Error creating order:", insertError);
        return {
            success: false,
            order: null,
            error: "Error creating order. Try again.",
        };
    }

    const { error: shopOrderError } = await supabase
        .from("ShopOrders")
        .insert({ shop_id: shopId, order_id: order.id });
    if (shopOrderError) {
        console.error(shopOrderError);
    }

    // Fetch the current sold count for the variant
    const { data: variant, error: fetchError } = await supabase
        .from("Variant")
        .select("sold")
        .eq("id", variantId)
        .single();

    if (fetchError || !variant) {
        console.error("Error fetching variant:", fetchError);
        // Optionally rollback the order
        await supabase.from("Order").delete().eq("code", code);
        return {
            success: false,
            order: null,
            error: "Error fetching variant data. Try again.",
        };
    }

    // Increment the sold count
    const newSoldCount = (variant.sold || 0) + quantity;

    // Update the variant with the new sold count
    const { error: updateError } = await supabase
        .from("Variant")
        .update({ sold: newSoldCount })
        .eq("id", variantId);

    if (updateError) {
        console.error("Error updating variant sold count:", updateError);
        // Optionally rollback the order
        await supabase.from("Order").delete().eq("code", code);
        return {
            success: false,
            order: null,
            error: "Error updating variant sold count. Try again.",
        };
    }

    revalidatePath("/(site)/", "layout");
    return {
        success: true,
        order: order,
        error: "Order created.",
    };
}

interface FormValues {
    stack: "v-c-v" | "c-v-c" | "all-vanilla" | "all-choco";
    flavor: "chocolate" | "vanilla";
    fruits?: string[];
    syrup: "chocolate" | "strawberry";
}

interface Variant {
    id: string;
    variantname: string;
    price: number;
}

interface Product {
    id: string;
    quantity: number;
    sold: number;
}

interface OrderResult {
    success: boolean;
    order?: OrderType;
    variant?: Variant;
    product?: Product;
    error?: string;
}

function buildVariantName(values: FormValues): string {
    const stackMap: Record<FormValues["stack"], string> = {
        "v-c-v":
            values.flavor === "chocolate"
                ? "Chocolate-Vanilla-Chocolate"
                : "Vanilla-Chocolate-Vanilla",
        "c-v-c":
            values.flavor === "chocolate"
                ? "Vanilla-Chocolate-Vanilla"
                : "Chocolate-Vanilla-Chocolate",
        "all-vanilla": "All Vanilla",
        "all-choco": "All Chocolate",
    };

    const stack = stackMap[values.stack];
    const fruitText = values.fruits?.length
        ? ` with ${values.fruits
              .map((f) => f.charAt(0).toUpperCase() + f.slice(1))
              .join(" & ")}`
        : "";

    return `Stack: ${stack}${fruitText} and ${capitalize(values.syrup)} Syrup`;
}

function capitalize(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

function validateFormValues(values: FormValues): void {
    const validStacks = ["v-c-v", "c-v-c", "all-vanilla", "all-choco"];
    const validFlavors = ["chocolate", "vanilla"];
    const validSyrups = ["chocolate", "strawberry"];
    const validFruits = ["banana", "mango", "strawberry"];

    if (!validStacks.includes(values.stack)) {
        throw new Error("Invalid stack configuration");
    }
    if (!validFlavors.includes(values.flavor)) {
        throw new Error("Invalid flavor selection");
    }
    if (!validSyrups.includes(values.syrup)) {
        throw new Error("Invalid syrup selection");
    }
    if (values.fruits) {
        if (values.fruits.length > 2) {
            throw new Error("Maximum two fruits allowed");
        }
        if (values.fruits.some((fruit) => !validFruits.includes(fruit))) {
            throw new Error("Invalid fruit selection");
        }
    }
}

export async function makeCustomizedPancakeOrder(
    values: FormValues,
    shopId: string,
    quantity: number = 1
): Promise<OrderResult> {
    const supabase = await getSupabaseClient();
    const productId = "f1fe57c3-cc35-4b72-b6ab-684c6c6a517c";

    try {
        // Validate input
        validateFormValues(values);

        // Get authenticated user
        const {
            data: { user },
            error: authError,
        } = await supabase.auth.getUser();
        if (authError || !user) {
            redirect("/login");
        }

        // Fetch product stock
        const { data: product, error: productError } = await supabase
            .from("Product")
            .select("id, quantity, sold")
            .eq("id", productId)
            .single();

        if (productError || !product) {
            throw new Error("Product not found");
        }

        if (product.quantity < quantity) {
            throw new Error("Insufficient stock for this product");
        }

        // Fetch variant
        const variantName = buildVariantName(values);
        const { data: variant, error: selectError } = await supabase
            .from("Variant")
            .select("id, variantname, price")
            .eq("variantname", variantName)
            .eq("product_id", productId)
            .single();

        if (selectError || !variant) {
            throw new Error("Variant not found");
        }

        // Generate unique order code
        const code = await generateUniqueCode(supabase, 8);

        // Get current time
        const ordertime = format(new Date(), "HH:mm:ss");

        // Create order
        const { data: order, error: insertError } = await supabase
            .from("Order")
            .insert([
                {
                    code,
                    product: productId,
                    shop: shopId,
                    variant: variant.id,
                    ordertime,
                    quantity,
                    user_id: user.id,
                },
            ])
            .select()
            .single();

        if (insertError) {
            throw new Error("Failed to create order");
        }

        // Create shop order link
        const { error: shopOrderError } = await supabase
            .from("ShopOrders")
            .insert({ shop_id: shopId, order_id: order.id });

        if (shopOrderError) {
            await supabase.from("Order").delete().eq("id", order.id);
            throw new Error("Failed to link order to shop");
        }

        // Update product stock
        const { error: updateError } = await supabase
            .from("Product")
            .update({
                quantity: product.quantity - quantity,
                sold: (product.sold ?? 0) + quantity,
            })
            .eq("id", productId);

        if (updateError) {
            await supabase.from("ShopOrders").delete().eq("order_id", order.id);
            await supabase.from("Order").delete().eq("id", order.id);
            throw new Error(
                `Failed to update product stock: ${updateError.message}`
            );
        }

        // Update variant sold count
        const { error: variantStockError } = await supabase
            .from("Variant")
            .update({
                sold: (variant.sold ?? 0) + quantity,
            })
            .eq("id", variant.id);

        if (variantStockError) {
            // Rollback product stock
            await supabase
                .from("Product")
                .update({
                    quantity: product.quantity,
                    sold: product.sold ?? 0,
                })
                .eq("id", productId);
            // Rollback order and shop order
            await supabase.from("ShopOrders").delete().eq("order_id", order.id);
            await supabase.from("Order").delete().eq("id", order.id);
            throw new Error(
                `Failed to update variant sold count: ${variantStockError.message}`
            );
        }

        // Revalidate cache
        revalidatePath("/(site)/", "layout");

        return {
            success: true,
            order,
            variant: {
                id: variant.id,
                variantname: variant.variantname,
                price: variant.price,
            },
            product: {
                id: product.id,
                quantity: product.quantity - quantity,
                sold: (product.sold ?? 0) + quantity,
            },
        };
    } catch (error) {
        console.error("Error in makeCustomizedPancakeOrder:", error);
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : "An unexpected error occurred",
        };
    }
}
