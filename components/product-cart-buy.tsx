"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Heart, Loader2, ShoppingBag, TicketCheck } from "lucide-react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { makeOrder } from "@/actions/makeOrder";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useProductStore } from "@/store/useProductStore";
import { getShopAndProducts } from "@/actions/getShopAndProducts";
import { flattenProducts } from "@/lib/utils";

interface ProductCartBuyProps {
    variantName: string;
    productName: string;
    shopName: string;
    shopId: string;
    productId: string;
    variantId: string;
}

const ProductCartBuy: React.FC<ProductCartBuyProps> = ({
    variantName,
    productName,
    shopName,
    shopId,
    productId,
    variantId,
}) => {
    const router = useRouter();
    const [quantity, setQuantity] = useState(1);
    const [isCheckoutConfirmed, setIsCheckoutConfirmed] = useState(false);

    const increaseQuantity = () => {
        setQuantity((prev) => (prev < 3 ? prev + 1 : 3));
    };

    const decreaseQuantity = () => {
        setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    };

    return (
        <div className="flex flex-col space-y-6">
            <div className="flex items-center gap-10">
                <h5 className="text-neutral-500 mb-1">Quantity</h5>
                <div className="flex items-center space-x-2">
                    <Button variant="outline" onClick={decreaseQuantity}>
                        -
                    </Button>
                    <span className="px-4">{quantity}</span>
                    <Button variant="outline" onClick={increaseQuantity}>
                        +
                    </Button>
                </div>
            </div>
            <div className="flex space-x-3">
                <Button variant="outline" size={"xl"}>
                    <Heart className="size-7" />
                    Like
                </Button>
                <Dialog
                    onOpenChange={(open) => {
                        if (!open && isCheckoutConfirmed) {
                            router.push("/checkouts");
                        }
                    }}
                >
                    <DialogTrigger asChild>
                        <Button size={"xl"}>
                            <ShoppingBag className="size-7" />
                            Order
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="text-left w-[80%]">
                                {productName} - {variantName} (Variant) Checkout
                            </DialogTitle>
                            <DialogDescription className="text-left">
                                View the details of your order below.
                            </DialogDescription>
                            <CheckoutForm
                                quantity={quantity}
                                variantName={variantName}
                                productName={productName}
                                shopName={shopName}
                                shopId={shopId}
                                productId={productId}
                                variantId={variantId}
                                setIsCheckoutConfirmed={setIsCheckoutConfirmed}
                            />
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

const checkoutFormSchema = z.object({
    productName: z.string().min(2).max(50),
    shopName: z.string().min(2).max(50),
    quantity: z.number().min(1).max(3),
});

interface CheckoutFormProps {
    quantity: number;
    variantName: string;
    shopId: string;
    productId: string;
    productName: string;
    shopName: string;
    variantId: string;
    setIsCheckoutConfirmed: (value: boolean) => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
    quantity,
    variantName,
    productName,
    shopName,
    shopId,
    variantId,
    productId,
    setIsCheckoutConfirmed,
}) => {
    const router = useRouter();
    const form = useForm<z.infer<typeof checkoutFormSchema>>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            productName: productName + " - " + variantName + " (Variant)",
            shopName: shopName,
            quantity: quantity,
        },
    });

    const [order, setOrder] = useState({});
    const { flattenedProducts, setFlattenedProducts } = useProductStore();

    const onSubmit = async () => {
        const order = await makeOrder({
            productId,
            shopId,
            variantId,
            quantity,
        });

        if (!order.success) {
            toast.error(order.error);
            return;
        }

        setOrder(order.order);
        setIsCheckoutConfirmed(true);

        const updatedShopAndProducts = await getShopAndProducts();
        const flatProducts = flattenProducts(updatedShopAndProducts);
        setFlattenedProducts(flatProducts);
    };

    const formatLabel = (key: string) =>
        key
            .replace(/([a-z])([A-Z])/g, "$1 $2")
            .replace(/^./, (str) => str.toUpperCase());

    const handleDialogClose = () => {
        if (order && Object.keys(order).length > 0) {
            router.push("/checkouts");
        }
    };

    return (
        <>
            {Object.keys(order).length === 0 ? (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6 mt-3"
                    >
                        <div className="space-y-6">
                            {["productName", "shopName", "quantity"].map(
                                (fieldName) => (
                                    <FormField
                                        key={fieldName}
                                        control={form.control}
                                        name={
                                            fieldName as keyof z.infer<
                                                typeof checkoutFormSchema
                                            >
                                        }
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    {formatLabel(fieldName)}
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        disabled
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )
                            )}
                        </div>

                        <div className="flex gap-3 justify-end">
                            <DialogClose asChild>
                                <Button variant="outline">Close order</Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                disabled={form.formState.isSubmitting}
                                className="w-40 flex items-center justify-center gap-2"
                            >
                                {form.formState.isSubmitting ? (
                                    <>
                                        <Loader2 className="animate-spin" />
                                        Making order...
                                    </>
                                ) : (
                                    <>
                                        <TicketCheck />
                                        Confirm order
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            ) : (
                <ConfirmedCheckout shopName={shopName} order={order} onClose={handleDialogClose} />
            )}
        </>
    );
};

interface ConfirmedCheckoutProps {
    order: any;
    onClose: () => void;
    shopName : string;
}

export const ConfirmedCheckout: React.FC<ConfirmedCheckoutProps> = ({
    order,
    onClose,
    shopName
}) => {
    return (
        <div className="flex flex-col justify-center items-center">
            <iframe src="https://lottie.host/embed/22e47dc9-b392-42fe-bc19-52fc1f553875/xSYbX5Kr6G.lottie"></iframe>
            <h4 className="font-semibold text-2xl"> Congratulations! </h4>
            <p className="text-neutral-500">
                You have successfully made your order.
            </p>

            <h5 className="font-extrabold text-5xl mt-6 mb-3 text-blue-600">
                {order.code}
            </h5>
            <p className="text-neutral-500 w-[20rem] text-center">
                Please present this to{" "}
                <span className="text-blue-600 font-bold">
                    {shopName}
                </span>{" "}
                <br />
                at the{" "}
                <span className="font-bold text-blue-600">Ground Floor.</span>
            </p>

            <section className="mt-6 flex justify-center gap-6 flex-wrap text-center border-t pt-6">
                <p className="text-xs">
                    Quantity:{" "}
                    <span className="font-semibold underline cursor-not-allowed">
                        {order.quantity}
                    </span>
                </p>
            </section>

            <DialogClose asChild>
                <Button variant="outline" className="mt-6" onClick={onClose}>
                    Close
                </Button>
            </DialogClose>
        </div>
    );
};

export default ProductCartBuy;
