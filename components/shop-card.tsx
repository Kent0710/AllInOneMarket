import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { MoveRight } from "lucide-react";


interface ShopCardProps {
    image: string | StaticImport;
    name: string;
    description?: string;
    href?: string;
}

const ShopCard: React.FC<ShopCardProps> = ({
    image,
    name,
    description,
    href = "/",
}) => {
    return (
        <Card className="mx-3 w-[20rem] border border-yellow-500">
            <CardContent className="flex items-center gap-3">
                <Image
                    src={image}
                    alt={`${name}-logo`}
                    width={80}
                    height={80}
                    className="w-20 h-20 object-cover rounded-full"
                />
                <div>
                    <CardTitle className="font-bold bg-gradient-to-r from-indigo-400 to-blue-600 bg-clip-text text-transparent">
                        {name}
                    </CardTitle>
                    <CardDescription>
                        {description || "No description."}
                    </CardDescription>
                    <Link
                        href={href}
                        className="border-b w-fit border-blue-500 text-blue-500 flex items-center text-sm mt-2 gap-1"
                    >
                        View shop <MoveRight size={15} />
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
};

export default ShopCard