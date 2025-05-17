'use client'

import { useState, useEffect } from "react";

export default function LoadingDots() {
    const [animationStep, setAnimationStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setAnimationStep((prev) => (prev + 1) % 6);
        }, 700);

        return () => clearInterval(interval);
    }, []);

    // Define 6 distinct positions around a circle
    const positions = [
        { x: 0, y: -20 }, // top
        { x: 17, y: -10 }, // top right
        { x: 17, y: 10 }, // bottom right
        { x: 0, y: 20 }, // bottom
        { x: -17, y: 10 }, // bottom left
        { x: -17, y: -10 }, // top left
    ];

    // Calculate current position for each dot
    const getDotStyle = (dotIndex: number) => {
        // Each dot is 2 positions ahead of the previous dot
        // This ensures they're evenly distributed and never overlap
        const positionIndex = (animationStep + dotIndex * 2) % 6;
        const position = positions[positionIndex];

        return {
            transform: `translate(${position.x}px, ${position.y}px)`,
        };
    };

    // Get color and animation classes for each dot
    const getDotClasses = (dotIndex: number) => {
        const positionIndex = (animationStep + dotIndex * 2) % 6;
        const isJumping = animationStep === positionIndex;

        let baseColor;
        let activeColor;

        // Assign colors for each dot
        if (dotIndex === 0) {
            baseColor = "bg-blue-400";
            activeColor = "bg-blue-600";
        } else if (dotIndex === 1) {
            baseColor = "bg-blue-400";
            activeColor = "bg-blue-600";
        } else {
            baseColor = "bg-blue-400";
            activeColor = "bg-blue-600";
        }

        const jumpClass = isJumping ? "animate-bounce scale-125" : "";
        const colorClass = isJumping ? activeColor : baseColor;

        return `absolute w-6 h-6 rounded-full transition-all duration-500 ease-in-out ${colorClass} shadow-lg ${jumpClass}`;
    };

    return (
        <div className="flex items-center justify-center ">
            <div className="relative h-40 w-40 flex items-center justify-center ">
                <div className={getDotClasses(0)} style={getDotStyle(0)} />
                <div className={getDotClasses(1)} style={getDotStyle(1)} />
                <div className={getDotClasses(2)} style={getDotStyle(2)} />
            </div>
        </div>
    );
}
