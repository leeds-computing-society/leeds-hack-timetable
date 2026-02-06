"use client";
import { ScreenQuad, shaderMaterial } from "@react-three/drei";
import { ShaderMaterial, Vector3 } from "three";
import { extend, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import fragmentShader from "@/app/static/background-gradient.frag";
import vertexShader from "@/app/static/background-gradient.vert";

type Uniforms = {
    time: number;
    colour1: Vector3;
    colour2: Vector3;
};

let initialUniforms: Uniforms = {
    time: 0,
    colour1: new Vector3(0.0, 0.0, 0.0),
    colour2: new Vector3(0.13725490196078433, 0.08235294117647059, 0.25098039215686274)
};

export const BackgroundGradientMaterial = shaderMaterial(initialUniforms, vertexShader, fragmentShader);

extend({ BackgroundGradientMaterial });

declare module "@react-three/fiber" {
    interface ThreeElements
    {
        backgroundGradientMaterial: any;
    }
};

export const BackgroundGradient = () =>
{
    let pathname = usePathname();
    let [targetColour1, setTargetColour1] = useState<Vector3>(new Vector3(0.0, 0.0, 0.0));
    let [targetColour2, setTargetColour2] = useState<Vector3>(new Vector3(0.13725490196078433, 0.08235294117647059, 0.25098039215686274));
    const gradientShader = useRef<ShaderMaterial & Partial<Uniforms>>(null);

    const calculateNewValue = (target: number, current: number): number =>
    {
        let difference = Math.abs(target - current);
        if (target > current) return current + difference * 0.025;
        return current - difference * 0.025;
    };

    useFrame(({ clock }) =>
    {
        if (!gradientShader.current) return;
        gradientShader.current.time = clock.elapsedTime * 0.1;
        if (gradientShader.current.colour1 === undefined || gradientShader.current.colour2 === undefined) return;
        let new1X = calculateNewValue(targetColour1.x, gradientShader.current.colour1.x);
        let new1Y = calculateNewValue(targetColour1.y, gradientShader.current.colour1.y);
        let new1Z = calculateNewValue(targetColour1.z, gradientShader.current.colour1.z);
        gradientShader.current.colour1 = new Vector3(new1X, new1Y, new1Z);
        let new2X = calculateNewValue(targetColour2.x, gradientShader.current.colour2.x);
        let new2Y = calculateNewValue(targetColour2.y, gradientShader.current.colour2.y);
        let new2Z = calculateNewValue(targetColour2.z, gradientShader.current.colour2.z);
        gradientShader.current.colour2 = new Vector3(new2X, new2Y, new2Z);
    });

    useEffect(() =>
    {
        if (pathname === "/2025")
        {
            setTargetColour1(new Vector3(0.0, 0.027450980392156862, 0.30196078431372547));
            setTargetColour2(new Vector3(0.0, 0.5686274509803921, 0.3686274509803922));
        };
        // if (pathname === "/2025") return setTargetColour(new Vector3(0.0, 0.38823529411764707, 0.34509803921568627));
        // if (pathname !== "/2025") return setTargetColour(new Vector3(0.45098039215686275, 0.01568627450980392, 0.6509803921568628));
        if (pathname !== "/2025")
        {
            setTargetColour1(new Vector3(0.0, 0.0, 0.0));
            setTargetColour2(new Vector3(0.13725490196078433, 0.08235294117647059, 0.25098039215686274));
        };
    }, [pathname]);

    return (
        <ScreenQuad>
            <backgroundGradientMaterial
                key={BackgroundGradientMaterial.key}
                ref={gradientShader}
                time={0}
            />
        </ScreenQuad>
    );
};