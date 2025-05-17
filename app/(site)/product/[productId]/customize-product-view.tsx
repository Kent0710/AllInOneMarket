"use client";

import AdsCarousel, { AdsCarouselItem } from "@/components/ads-carousel";
import NoImageFallback from "../../../../public/noimage-fallback.jpg";
import Image from "next/image";
import { getSafeImageSrc } from "@/lib/utils";

interface CustomizeProductViewProps {
    selectedVariant: any;
    product: any;
}
const CustomizeProductView: React.FC<CustomizeProductViewProps> = ({
    selectedVariant,
    product,
}) => {
    return (
        <div className="mx-[0rem] md:mx-[5rem] flex flex-col gap-12 mt-3">
            <div className="flex flex-wrap md:flex-nowrap">
                {/* product  */}
                <section className="w-full md:w-1/3 mx-14 md:mx-0 md:mr-14">
                    {/* image carousel  */}
                    <AdsCarousel className="h-[30rem]">
                        <AdsCarouselItem>
                            <Image
                                src={getSafeImageSrc(NoImageFallback)}
                                alt="noimagefallback"
                                width={144}
                                height={144}
                                className="object-contain w-[20rem]"
                            />
                        </AdsCarouselItem>
                    </AdsCarousel>
                </section>
                {/* product details and form  */}
                <section className="w-full md:w-2/3 p-5 pl-10">
                    <div className="flex justify-between">
                        <div>
                            <h4 className="text-2xl font-semibold">
                                {selectedVariant.variantname}
                            </h4>
                            <p className="text-neutral-500">
                                {product.description ||
                                    "This product has no description."}
                            </p>
                        </div>
                        <p className="whitespace-nowrap">
                            {" "}
                            {selectedVariant?.sold ?? 0} sold{" "}
                        </p>
                    </div>
                    <p className="text-3xl font-semibold text-orange-500 my-3">
                        ₱{selectedVariant?.price ?? "0"}.00
                    </p>


                    <PancakeForm shopId={product.shop.id} />
                </section>
            </div>

        </div>
    );
};

export default CustomizeProductView;

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Loader2, TicketCheck } from "lucide-react";
import { makeCustomizedPancakeOrder } from "@/actions/makeOrder";
import React from "react";

const formSchema = z.object({
    flavor: z.enum(["vanilla", "chocolate"], {
        required_error: "Please select a pancake flavor.",
    }),
    stack: z.enum(["v-c-v", "c-v-c", "all-vanilla", "all-choco"], {
        required_error: "Please select a pancake stack combination.",
    }),
    fruits: z
        .array(z.enum(["banana", "mango", "strawberry"]))
        .max(2, { message: "You can select up to 2 fruits." })
        .optional(),
    syrup: z.enum(["chocolate", "strawberry"], {
        required_error: "Please select a syrup.",
    }),
});

export type FormValues = z.infer<typeof formSchema>;

interface PancakeFormProps {
    shopId : string;
}
const PancakeForm : React.FC<PancakeFormProps> = ({
    shopId
}) => {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            flavor: undefined,
            stack: undefined,
            fruits: [],
            syrup: undefined,
        },
    });

    const selectedFlavor = form.watch("flavor");

    const stackOptions = [
        {
            value: "v-c-v",
            label:
                selectedFlavor === "chocolate"
                    ? "Chocolate - Vanilla - Chocolate"
                    : "Vanilla - Chocolate - Vanilla",
        },
        {
            value: "c-v-c",
            label:
                selectedFlavor === "chocolate"
                    ? "Vanilla - Chocolate - Vanilla"
                    : "Chocolate - Vanilla - Chocolate",
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

    async function onSubmit(values: FormValues) {
        console.log(values);
        const res = await makeCustomizedPancakeOrder(values, shopId);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 max-w-md mx-auto p-4"
            >
                {/* Pancake Flavor */}
                <FormField
                    control={form.control}
                    name="flavor"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Pancake Flavor</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    className="flex space-x-4"
                                >
                                    <FormItem className="flex items-center space-x-2">
                                        <FormControl>
                                            <RadioGroupItem value="vanilla" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Vanilla
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-2">
                                        <FormControl>
                                            <RadioGroupItem value="chocolate" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Chocolate
                                        </FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Pancake Stack */}
                <FormField
                    control={form.control}
                    name="stack"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Pancake Stack Combination</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a stack" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {stackOptions.map((option) => (
                                        <SelectItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                Choose your preferred pancake stack combination.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Fruits */}
                <FormField
                    control={form.control}
                    name="fruits"
                    render={() => (
                        <FormItem>
                            <FormLabel>Fruits (Optional, up to 2)</FormLabel>
                            {fruitOptions.map((fruit) => (
                                <FormField
                                    key={fruit.id}
                                    control={form.control}
                                    name="fruits"
                                    render={({ field }) => {
                                        return (
                                            <FormItem
                                                key={fruit.id}
                                                className="flex items-center space-x-2"
                                            >
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value?.includes(
                                                            fruit.id as any
                                                        )}
                                                        onCheckedChange={(
                                                            checked
                                                        ) => {
                                                            if (
                                                                checked &&
                                                                (field.value
                                                                    ?.length ||
                                                                    0) >= 2
                                                            ) {
                                                                return; // Prevent selecting more than 2
                                                            }
                                                            return checked
                                                                ? field.onChange(
                                                                      [
                                                                          ...(field.value ||
                                                                              []),
                                                                          fruit.id,
                                                                      ]
                                                                  )
                                                                : field.onChange(
                                                                      field.value?.filter(
                                                                          (
                                                                              value
                                                                          ) =>
                                                                              value !==
                                                                              fruit.id
                                                                      )
                                                                  );
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    {fruit.label}
                                                </FormLabel>
                                            </FormItem>
                                        );
                                    }}
                                />
                            ))}
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Syrup */}
                <FormField
                    control={form.control}
                    name="syrup"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Syrup</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a syrup" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="chocolate">
                                        Chocolate
                                    </SelectItem>
                                    <SelectItem value="strawberry">
                                        Strawberry
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    disabled={form.formState.isSubmitting}
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
            </form>
        </Form>
    );
};
