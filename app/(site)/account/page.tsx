import { signOut } from "@/actions/auth/login";
import { getUser } from "@/actions/user/getUser";
import { Button } from "@/components/ui/button";
import NoImageFallback from "../../../public/noimage-fallback.jpg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { Input } from "@/components/ui/input";

export default async function Account() {
    const user = await getUser();

    return (
        <main className="mx-[2rem] md:mx-[15rem]">
            <Tabs defaultValue="account">
                <TabsList>
                    <TabsTrigger value="account">Account</TabsTrigger>
                    {user?.shop && <TabsTrigger value="shop">Shop</TabsTrigger>}
                </TabsList>

                <TabsContent value="account">
                    <AccountTabContent user={user} />
                </TabsContent>
                {user?.shop && (
                    <TabsContent value="shop">
                        <ShopTabContent user={user} />
                    </TabsContent>
                )}
            </Tabs>
        </main>
    );
}

import { OrderWithDetails } from "@/lib/supabase/dbtypes";
import CheckoutCard from "@/components/checkout-card";
interface AccountTabContentProps {
    user: ExtendedUserType | null;
}
const AccountTabContent: React.FC<AccountTabContentProps> = async ({
    user,
}) => {
    const { orders } = await getOrders();

    return (
        <div className="mt-6">
            <h4>
                <span className="font-semibold">Email: </span>{" "}
                {user?.user_metadata.email ||
                    user?.email ||
                    "No email available"}
            </h4>

            <section className="flex justify-center gap-6 flex-wrap m-10 border p-10 rounded-xl">
                {orders.length === 0 ? (
                    <> No orders </>
                ) : (
                    (orders as OrderWithDetails[]).map((order) => (
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
                    ))
                )}
            </section>

            <form>
                <Button type="submit" formAction={signOut}>
                    Sign out
                </Button>
            </form>
        </div>
    );
};

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import AdsCarousel, { AdsCarouselItem } from "@/components/ads-carousel";
import { ExtendedUserType } from "@/lib/supabase/dbtypes";
import React from "react";
import { getOrders } from "@/actions/getOrders";

interface ShopTabContentProps {
    user: ExtendedUserType | null;
}

const ShopTabContent: React.FC<ShopTabContentProps> = ({ user }) => {
    if (!user || !user.shop) {
        return (
            <div className="text-center mt-6 m-10 p-10 rounded-xl border">
                You do not have a shop.{" "}
            </div>
        );
    }

    const { shop } = user;
    const products = shop.products || [];

    if (products.length === 0) {
        return (
            <div>
                Your shop has no products. Add some products to display them
                here!
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-12">
            <div className="flex gap-3 items-center flex-col">
                <h2 className="text-center font-extrabold text-lg whitespace-nowrap mb-3">
                    Shop
                </h2>
                <section className="flex flex-col items-center w-fit shrink-0 space-y-3">
                    <Image
                        src={shop.logo || NoImageFallback}
                        width={144}
                        height={144}
                        alt={`${shop.shopname} logo`}
                    />
                    <Input type="file" />
                </section>

                <section className="flex items-center flex-col">
                    <h4 className="text-2xl font-semibold">{shop.shopname}</h4>
                    <p className="text-neutral-500">
                        {shop.description ||
                            "Your shop does not have any description."}
                    </p>
                </section>
            </div>

            <div>
                <h2 className="text-center font-extrabold text-lg whitespace-nowrap mb-3">
                    Product
                </h2>
                <section className="w-full">
                    <h4 className="text-2xl font-semibold">
                        {products[0].productname}
                    </h4>
                    <p className="text-neutral-500">
                        {products[0].description || "No description available"}
                    </p>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Variant</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Sold</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products[0].variants.map((variant) => (
                                <TableRow key={variant.id}>
                                    <TableCell>{variant.variantname}</TableCell>
                                    <TableCell>₱ {variant.price}.00</TableCell>
                                    <TableCell>{variant.quantity}</TableCell>
                                    <TableCell>{variant.sold}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </section>
            </div>

            <div>
                <h2 className="text-center font-extrabold text-lg whitespace-nowrap mb-3">
                    Product Images
                </h2>
                <div className="flex gap-12 flex-wrap">
                    {products[0].variants.map((variant) => (
                        <div
                            key={variant.variantname}
                            className="w-36 flex items-center flex-col gap-3"
                        >
                            <p className="font-semibold">
                                {variant.variantname}
                            </p>
                            <Image
                                src={variant.variantimage || NoImageFallback}
                                width={144}
                                height={144}
                                alt={`${variant.variantname} image`}
                            />
                            <Input type="file" />
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h2 className="text-center font-extrabold text-lg whitespace-nowrap mb-3">
                    Product Images Display Preview
                </h2>
                <div className="w-full">
                    <AdsCarousel className="h-[25rem]">
                        {products[0].variants.map((variant) => (
                            <AdsCarouselItem key={variant.variantname}>
                                <Image
                                    src={
                                        variant.variantimage || NoImageFallback
                                    }
                                    alt={variant.variantname}
                                    width={244}
                                    height={244}
                                    className="object-contain"
                                />
                            </AdsCarouselItem>
                        ))}
                    </AdsCarousel>
                </div>
            </div>

            <div className="space-x-3 place-self-center my-6 mt-12">
                <Button variant={"outline"}>Discard changes</Button>
                <Button>Save changes</Button>
            </div>
        </div>
    );
};
