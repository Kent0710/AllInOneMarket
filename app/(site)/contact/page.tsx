import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default async function ContactPage() {
    return (
        <div className="flex justify-center items-center mt-6">
            <div className="border shadow-md p-10 rounded-xl flex flex-col items-center">
                <section>
                    <iframe src="https://lottie.host/embed/478c583f-291b-4c2d-abee-3a6b3e871546/y9P9pf8JsI.lottie"></iframe>
                </section>
                <h1 className="text-2xl font-bold text-neutral-700">
                    {" "}
                    This page is under development{" "}
                </h1>
                <p className="text-sm text-neutral-500">
                    {" "}
                    Kindly redirect to home for the app experience.{" "}
                </p>
                <Link href={"/home"}>
                    <Button variant={"special"} className="mt-6">
                        {" "}
                        <Home /> Go to home{" "}
                    </Button>
                </Link>
            </div>
        </div>
    );
}
