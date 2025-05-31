"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { ArrowLeftFromLine,  Loader2, ShoppingBag, TicketCheck } from "lucide-react";
import { useSelectedVariantStore } from "@/store/useSelectedVariantStore";
import VariantCard from "./variant-card";
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
import { flattenProducts, toLowerCaseHelper } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import ConfirmedCheckout from "./confirmed-checkout";
import { ProductWithVariantsType, VariantType } from "@/lib/supabase/dbtypes";
interface ProductCartBuyProps {
    productName: string;
    shopName: string;
    shopId: string;
    productId: string;
    product: ProductWithVariantsType;
}

const ProductCartBuy: React.FC<ProductCartBuyProps> = ({
    productName,
    shopName,
    shopId,
    productId,
    product,
}) => {
    const { selectedVariant, setSelectedVariant } = useSelectedVariantStore();

    const selectedVariantData: VariantType = product.variants.find(
        (v: { variantname: string }) =>
            toLowerCaseHelper(v.variantname) ===
            toLowerCaseHelper(selectedVariant)
    ) || {
        id: "",
        variantname: "",
        price: 0,
        variantimage: "",
        product_id: "",
        quantity: 0,
        sold: 0,
        variant_images: [],
    };

    const router = useRouter();
    const [quantity, setQuantity] = useState(1);
    const [isCheckoutConfirmed, setIsCheckoutConfirmed] = useState(false);

    const increaseQuantity = () => {
        setQuantity((prev) => (prev < 3 ? prev + 1 : 3));
    };

    const decreaseQuantity = () => {
        setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    };

    const usedImages = new Set<string>();

    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <p className="text-3xl font-semibold text-orange-500 my-3">
                    ₱ {selectedVariantData ? selectedVariantData.price : 0}.00
                </p>
                <p className="whitespace-nowrap">
                    {selectedVariantData ? selectedVariantData.sold : 0} sold
                </p>
            </div>
            <div className="grid grid-cols-1 2xl:grid-cols-2 gap-10 mb-6 ">
                <h5 className=" text-neutral-500 whitespace-nowrap">
                    {" "}
                    Please select your preferred variant{" "}
                </h5>
                <ScrollArea className=" w-full h-[10rem] pr-6" type="always">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {product.variants.map((variant: VariantType) => {
                            const img0 = variant.variant_images[0];
                            const img1 = variant.variant_images[1];
                            const imageToUse =
                                usedImages.has(img0) && img1 ? img1 : img0;
                            usedImages.add(imageToUse);

                            return (
                                <VariantCard
                                    key={variant.id}
                                    image={imageToUse}
                                    variantname={variant.variantname}
                                    selectedVariantName={selectedVariant}
                                    setSelectedVariantName={setSelectedVariant}
                                />
                            );
                        })}
                    </div>
                </ScrollArea>
            </div>
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
                <div className="flex space-x-3 items-center">
                    <Button variant="secondary" size={"xl"}>
                        <ArrowLeftFromLine className="size-5" />
                        Return
                    </Button>
                    <Dialog
                        onOpenChange={(open) => {
                            if (!open && isCheckoutConfirmed) {
                                router.push("/checkouts");
                            }
                        }}
                    >
                        <DialogTrigger asChild>
                            <Button
                                size={"xl"}
                                disabled={selectedVariant ? false : true}
                            >
                                <ShoppingBag className="size-7" />
                                Order
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className="text-left w-[80%]">
                                    {productName} - {selectedVariant} (Variant)
                                    Checkout
                                </DialogTitle>
                                <DialogDescription className="text-left">
                                    View the details of your order below.
                                </DialogDescription>
                                <CheckoutForm
                                    quantity={quantity}
                                    variantName={selectedVariant}
                                    productName={productName}
                                    shopName={shopName}
                                    shopId={shopId}
                                    productId={productId}
                                    variantId={selectedVariantData.id}
                                    setIsCheckoutConfirmed={
                                        setIsCheckoutConfirmed
                                    }
                                />
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </>
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

    const [order, setOrder] = useState({
        code : '',
        quantity : 0,
    });
    const { setFlattenedProducts } = useProductStore();

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
            {order.quantity === 0 && order.code === '' ? (
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
                <ConfirmedCheckout
                    shopName={shopName}
                    orderCode={order.code}
                    orderQuantity={order.quantity}
                    onClose={handleDialogClose}
                />
            )}
        </>
    );
};

export default ProductCartBuy;
