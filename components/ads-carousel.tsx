"use client";

import Autoplay from "embla-carousel-autoplay";
import SampleImage from "../public/sample-image.jpg";
import Image from "next/image";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import React from "react";

interface AdsCarouselProps {
    className?: string;
    children: React.ReactNode;
    variantname?: string;
    hideControls?: boolean;
}
const AdsCarousel: React.FC<AdsCarouselProps> = ({
    className,
    children,
    variantname,
    hideControls = false,
}) => {
    return (
        <Carousel
            plugins={[
                Autoplay({
                    delay: 2000,
                    stopOnInteraction: false,
                    stopOnMouseEnter: true,
                }),
            ]}
        >
            {variantname}
            <CarouselContent className={className}>{children}</CarouselContent>
            {!hideControls && (
                <>
                    <CarouselPrevious />
                    <CarouselNext />
                </>
            )}
        </Carousel>
    );
};

export default AdsCarousel;

interface AdsCarouselItemProps {
    children: React.ReactNode;
}
export const AdsCarouselItem: React.FC<AdsCarouselItemProps> = ({
    children,
}) => {
    return (
        <CarouselItem className="text-center text-4xl font-semibold border  rounded-xl flex justify-center">
            {children}
        </CarouselItem>
    );
};
