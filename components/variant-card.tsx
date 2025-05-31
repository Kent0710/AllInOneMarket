import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { getSafeImageSrc } from "@/lib/utils";

interface VariantCardProps {
    image: string | StaticImport;
    variantname: string;
    selectedVariantName: string;
    setSelectedVariantName: (variant: string) => void;
    
}
const VariantCard: React.FC<VariantCardProps> = ({
    image,
    variantname,
    selectedVariantName,
    setSelectedVariantName,
}) => {
    return (
        <Card
            className={`w-full py-2 ${
                variantname === selectedVariantName &&
                "border border-dashed bg-white/40 backdrop-blur-3xl border-blue-500 text-blue-500"
            }`}
            onClick={() => setSelectedVariantName(variantname)}
        >
            <CardContent className="flex gap-3 items-center">
                <Image
                    src={getSafeImageSrc(image)}
                    alt="sampleimage"
                    className="object-contain w-12 h-12"
                    width={144}
                    height={144}
                />
                <p className="font-semibold"> {variantname} </p>
            </CardContent>
        </Card>
    );
};

export default VariantCard