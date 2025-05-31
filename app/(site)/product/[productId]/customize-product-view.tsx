"use client";

import AdsCarousel, { AdsCarouselItem } from "@/components/ads-carousel";
import NoImageFallback from "../../../../public/noimage-fallback.jpg";
import Image from "next/image";
import { capitalizeWords, getSafeImageSrc } from "@/lib/utils";

interface CustomizeProductViewProps {
    // selectedVariant: VariantType;
    product: ProductType;
}
const CustomizeProductView: React.FC<CustomizeProductViewProps> = ({
    // selectedVariant,
    product,
}) => {
    return (
        <div className="mx-[0rem] md:mx-[5rem] flex flex-col gap-12 mt-3">
            <div className="flex flex-wrap md:flex-nowrap">
                {/* product  */}
                <section className="w-full md:w-1/3 mx-14 md:mx-0 md:mr-14">
                    {/* image carousel  */}
                    <AdsCarousel className="h-[30rem]">
                        {product.product_images.map((productimage) => (
                            <AdsCarouselItem key={productimage}>
                                <Image
                                    src={getSafeImageSrc(productimage)}
                                    alt="noimagefallback"
                                    width={144}
                                    height={144}
                                    className="object-contain w-[20rem]"
                                />
                            </AdsCarouselItem>
                        ))}
                    </AdsCarousel>
                </section>
                {/* product details and form  */}
                <section className="w-full md:w-2/3 p-5 pl-10">
                    <div className="flex justify-between">
                        <div>
                            <h4 className="text-2xl font-semibold">
                                {product.productname.includes("Pancake")
                                    ? "Pancake Skewowrz"
                                    : ""}
                            </h4>
                            <p className="text-neutral-500">
                                {product.description ||
                                    "This product has no description."}
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <p className="text-3xl font-semibold text-orange-500 my-3">
                            ₱ 60.00
                        </p>
                        <p className="whitespace-nowrap">{product.sold} sold</p>
                    </div>

                    <h5 className=" text-neutral-500 whitespace-nowrap text-center mb-3 font-semibold text-sm">
                        {" "}
                        Please customize your pancake below.
                    </h5>

                    <PancakeForm shopId={product.shop.id} />
                </section>
            </div>

            <div className="flex items-center justify-center gap-9 flex-wrap md:flex-nowrap my-10">
                {/* Shop   */}
                <Image
                    src={product.shop.logo || NoImageFallback}
                    alt={product.shop.shopname}
                    className="object-contain w-28 h-28 rounded-full"
                    width={144}
                    height={144}
                />
                <section>
                    <h4 className="text-lg font-semibold mb-3 whitespace-nowrap">
                        {product.shop.shopname}
                    </h4>
                    <Link href={`/shop/${product.shop.id}`}>
                        <Button variant={"special"}>
                            <Store />
                            View shop
                        </Button>
                    </Link>
                </section>

                <section>
                    <h5 className="font-semibold">About</h5>
                    <p>
                        {product.shop.description ||
                            "This shop does not have a description."}
                    </p>
                </section>
            </div>
        </div>
    );
};

export default CustomizeProductView;

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowLeftFromLine, Loader2, Store, TicketCheck } from "lucide-react";
import { makeCustomizedPancakeOrder } from "@/actions/makeOrder";
import React, { useState } from "react";
import {ProductType } from "@/lib/supabase/dbtypes";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import ConfirmedCheckout from "@/components/confirmed-checkout";
import { Label } from "@/components/ui/label";

interface PancakeFormProps {
    shopId: string;
}

interface FormValues {
    stack: "v-c-v" | "c-v-c" | "all-vanilla" | "all-choco";
    flavor: "chocolate" | "vanilla";
    fruits?: string[];
    syrup: "chocolate" | "strawberry";
}

const PancakeForm: React.FC<PancakeFormProps> = ({ shopId }) => {
    const stackOptions = [
        {
            value: "v-c-v",
            label: "Vanilla - Chocolate - Vanilla",
        },
        {
            value: "c-v-c",
            label: "Chocolate - Vanilla - Chocolate",
        },
        {
            value: "all-vanilla",
            label: "All Vanilla",
        },
        {
            value: "all-choco",
            label: "All Chocolate",
        },
    ];

    const fruitOptions = [
        { id: "banana", label: "Banana" },
        { id: "mango", label: "Mango" },
        { id: "strawberry", label: "Strawberry" },
    ];

    const syrupOptions = [
        { id: "chocolate", label: "Chocolate" },
        { id: "strawberry", label: "Strawberry" },
    ];

    const [selectedStack, setSelectedStack] = useState<string>("");
    const [selectedFruits, setSelectedFruits] = useState<string[]>([]);
    const [selectedSyrup, setSelectedSyrup] = useState<string>("");
    const [isOrdering, setIsOrdering] = useState(false);
    const [orderCode, setOrderCode] = useState<string>("");

    async function handleOrder() {
        setIsOrdering(true);

        // Structure values for makeCustomizedPancakeOrder
        const values: FormValues = {
            stack: selectedStack as FormValues["stack"],
            flavor: selectedStack.includes("vanilla") ? "vanilla" : "chocolate",
            fruits: selectedFruits.length > 0 ? selectedFruits : undefined,
            syrup: selectedSyrup as FormValues["syrup"],
        };

        try {
            const result = await makeCustomizedPancakeOrder(values, shopId);
            if (result.success && result.order) {
                // Clear state after successful order
                setSelectedStack("");
                setSelectedFruits([]);
                setSelectedSyrup("");
                setOrderCode(result.order.code);
            }
        } catch (error) {
            console.error("Order failed:", error);
        } finally {
            setIsOrdering(false);
        }
    }

    return (
        <div className="space-y-3">
            {/* Pancake Stack */}
            <section>
                <Label> Pancake Stack Flavor Combination </Label>
                <Select onValueChange={setSelectedStack} value={selectedStack}>
                    <SelectTrigger className="w-full bg-white">
                        <SelectValue placeholder="Select a stack" />
                    </SelectTrigger>
                    <SelectContent>
                        {stackOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </section>

            {/* Fruits */}
            <section>
                <Label>Fruits (Optional, up to 2)</Label>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 my-3">
                    {fruitOptions.map((option) => (
                        <Card
                            key={option.id}
                            className={`py-3 ${
                                selectedFruits.includes(option.id)
                                    ? "border border-blue-500 border-dashed"
                                    : ""
                            }`}
                            onClick={() => {
                                if (selectedFruits.includes(option.id)) {
                                    setSelectedFruits((fruits) =>
                                        fruits.filter(
                                            (fruit) => fruit !== option.id
                                        )
                                    );
                                } else if (selectedFruits.length < 2) {
                                    setSelectedFruits((fruits) => [
                                        ...fruits,
                                        option.id,
                                    ]);
                                }
                            }}
                        >
                            <CardContent>
                                <p className="font-semibold">{option.label}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <small className="font-semibold text-neutral-500">
                    Deselect by reclicking selected fruit
                </small>
            </section>

            {/* Syrup */}
            <section>
                <Label>Syrup</Label>
                <div className="gap-6 grid grid-cols-2 mt-3">
                    {syrupOptions.map((option) => (
                        <Card
                            key={option.id}
                            className={`py-3 ${
                                selectedSyrup === option.id &&
                                "border-blue-500 border border-dashed"
                            }`}
                            onClick={() => {
                                setSelectedSyrup(option.id);
                            }}
                        >
                            <CardContent>
                                <p className="font-semibold">{option.label}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            <div className="flex items-center space-x-3 mt-6">
                <Button variant="secondary" size={"xl"}>
                    <ArrowLeftFromLine className="size-5" />
                    Return
                </Button>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button
                            size="xl"
                            disabled={
                                isOrdering || !selectedStack || !selectedSyrup
                            }
                        >
                            <TicketCheck className="size-7" /> Order
                        </Button>
                    </DialogTrigger>

                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="text-left w-[80%]">
                                Pancake Skewowrz
                            </DialogTitle>
                            <DialogDescription>
                                View the details of your order below
                            </DialogDescription>
                        </DialogHeader>

                        {orderCode === "" ? (
                            <>
                                <div>
                                    <p className="font-semibold mb-3">
                                        {" "}
                                        Pancake Stack Combination{" "}
                                    </p>
                                    <Input
                                        disabled
                                        placeholder={
                                            stackOptions.find(
                                                (opt) =>
                                                    opt.value === selectedStack
                                            )?.label ?? "Select a stack"
                                        }
                                    />
                                </div>
                                <div>
                                    <p className="font-semibold mb-3">
                                        {" "}
                                        Fruits{" "}
                                    </p>
                                    <div className="gap-6 grid grid-cols-2">
                                        {selectedFruits.length > 0 ? (
                                            selectedFruits.map((fruit) => (
                                                <Input
                                                    key={fruit}
                                                    placeholder={capitalizeWords(
                                                        fruit
                                                    )}
                                                    disabled
                                                    className="my-3"
                                                />
                                            ))
                                        ) : (
                                            <p className="text-center text-neutral-500 text-sm">
                                                No fruit selected.
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <p className="font-semibold mb-3">Syrup</p>
                                    <Input
                                        disabled
                                        placeholder={capitalizeWords(
                                            selectedSyrup
                                        )}
                                    />
                                </div>
                                <div className="flex gap-3 justify-end">
                                    <DialogClose asChild>
                                        <Button variant={"outline"}>
                                            Close Order
                                        </Button>
                                    </DialogClose>
                                    <Button
                                        onClick={handleOrder}
                                        disabled={isOrdering ? true : false}
                                    >
                                        {isOrdering ? (
                                            <>
                                                <Loader2 className="animate-spin" />
                                                Making order...
                                            </>
                                        ) : (
                                            <>
                                                <TicketCheck />
                                                Confirm Order
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <ConfirmedCheckout
                                shopName={"dsdasd"}
                                orderCode={orderCode}
                                orderQuantity={1}
                                onClose={() => {
                                    setOrderCode("");
                                }}
                            />
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};
