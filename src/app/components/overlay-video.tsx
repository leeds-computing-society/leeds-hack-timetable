"use client";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export const OverlayVideo = () =>
{
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const containerReference = useRef<HTMLDivElement>(null);
    const videoReference = useRef<HTMLVideoElement>(null);

    useEffect(() =>
    {
        // const triggerVideo = () =>
        // {
        //     setIsVisible(true);

        //     setTimeout(() =>
        //     {
        //         setIsVisible(false);
        //     }, 6000);
        // };

        const interval = setInterval(() => setIsVisible(true), 10000);
        return () => clearInterval(interval);
    }, []);

    useGSAP(() =>
    {
        if (isVisible === true)
        {
            gsap.to(containerReference.current, {
                opacity: 1,
                duration: 1.0,
                ease: "sine.inOut",
                onComplete: () =>
                {
                    if (videoReference.current === null) return;
                    videoReference.current.play();
                }
            });
        }

        if (isVisible === false)
        {
            gsap.to(containerReference.current, {
                opacity: 0,
                duration: 1.0,
                ease: "sine.inOut",
                onComplete: () =>
                {
                    if (videoReference.current === null) return;
                    videoReference.current.pause();
                    videoReference.current.currentTime = 0;
                }
            });
        }
    }, { dependencies: [isVisible], scope: containerReference });

    return (
        <div className="absolute top-0 left-0 z-50 h-full w-full bg-black flex justify-center"
            ref={containerReference}>
            <video ref={videoReference}
                onEnded={() => setIsVisible(false)}
                src="/uol-ident.mp4"
                muted
                className="max-w-full max-h-full" />
        </div>
    );
};