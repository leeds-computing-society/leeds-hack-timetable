"use client";
import { Canvas } from "@react-three/fiber";
import { BackgroundGradient } from "@/app/components/background-gradient";
import { useRef } from "react";

export const Background = () =>
{
    let canvas = useRef<HTMLDivElement | null>(null);

    return (
        <div ref={canvas} className="fixed w-full h-full -z-10">
            <Canvas
                gl={{
                    alpha: true,
                    antialias: false,
                    powerPreference: "high-performance"
                }}
                onCreated={() =>
                {
                    if (canvas === null) return;
                    canvas.current?.classList.add("animation-opacity-in");
                }}>
                <BackgroundGradient></BackgroundGradient>
            </Canvas>
        </div>
    );
};