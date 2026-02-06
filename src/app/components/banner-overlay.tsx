"use client";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { PwCLogo } from "./sponsors/pwc-logo";

export interface Banner
{
    title: string;
    subtitle: string;
    subtitleLink: string;
    description: string;
    image: string;
    colour: string;
    logo: React.ReactNode;
};

export const BannerOverlay = (properties: Banner) =>
{
    // const [isVisible, setIsVisible] = useState<boolean>(false);
    const backgroundReference = useRef<HTMLDivElement>(null);
    const imageReference = useRef<HTMLImageElement>(null);
    const textReference = useRef<HTMLDivElement>(null);
    const descriptionReference = useRef<HTMLDivElement>(null);
    const containerReference = useRef<HTMLDivElement>(null);
    const logoCoverReference = useRef<HTMLDivElement>(null);
    const descriptionCoverReference = useRef<HTMLDivElement>(null);
    const imageCoverReference = useRef<HTMLDivElement>(null);
    // const videoReference = useRef<HTMLVideoElement>(null);

    useGSAP(() =>
    {
        if (textReference.current === null) return;
        if (logoCoverReference.current === null) return;
        if (descriptionCoverReference.current === null) return;

        let textElements = gsap.utils.toArray(textReference.current.children);
        let logoCoverElements = gsap.utils.toArray(logoCoverReference.current.children);
        let descriptionCoverElements = gsap.utils.toArray(descriptionCoverReference.current.children);

        let inLength: number = 2.6;
        let length: number = 10;

        gsap.to(backgroundReference.current, {
            top: 0,
            duration: 1,
            ease: "sine.inOut"
        });

        gsap.to(containerReference.current, {
            top: 0,
            delay: 0.4,
            duration: 1,
            ease: "sine.inOut"
        });

        gsap.to(logoCoverElements, {
            height: "0%",
            delay: 1,
            duration: 1,
            stagger: -0.2,
            ease: "sine.inOut"
        });

        gsap.to(descriptionCoverElements, {
            width: "0%",
            left: "100%",
            delay: 1,
            duration: 1,
            stagger: -0.2,
            ease: "sine.inOut"
        });

        gsap.to(imageCoverReference.current, {
            width: "0%",
            delay: 1,
            duration: 1,
            ease: "sine.inOut"
        });

        gsap.fromTo(descriptionReference.current, {
            y: 64,
            opacity: 0,
        }, {
            y: 0,
            opacity: 1,
            delay: 1.8,
            duration: 0.8,
            ease: "sine.inOut"
        });

        gsap.fromTo(textElements, {
            y: 64,
            opacity: 0,
        }, {
            y: 0,
            opacity: 1,
            delay: 1.4,
            duration: 0.8,
            stagger: 0.4,
            ease: "sine.inOut"
        });

        gsap.to(textElements, {
            y: -64,
            delay: inLength + length + 0.4,
            opacity: 0,
            duration: 0.8,
            stagger: 0.4,
            ease: "sine.inOut"
        });

        gsap.to(descriptionReference.current, {
            y: -64,
            duration: 0.8,
            opacity: 0,
            delay: inLength + length,
            ease: "sine.inOut"
        });

        gsap.to(imageCoverReference.current, {
            width: "100%",
            duration: 1,
            delay: inLength + length + 0.6,
            ease: "sine.inOut"
        });

        gsap.to(descriptionCoverElements, {
            width: "100%",
            left: "0%",
            delay: inLength + length + 0.6,
            duration: 1,
            stagger: 0.2,
            ease: "sine.inOut"
        });

        gsap.to(logoCoverElements, {
            height: "100%",
            duration: 1,
            delay: inLength + length + 0.6,
            stagger: 0.2,
            ease: "sine.inOut"
        });

        gsap.to(backgroundReference.current, {
            top: "-100%",
            delay: inLength + length + 1.6,
            duration: 1,
            ease: "sine.inOut"
        });

        gsap.to(containerReference.current, {
            top: "-100%",
            delay: inLength + length + 1.2,
            duration: 1,
            ease: "sine.inOut"
        });

        gsap.fromTo(imageReference.current, {
            left: "75%",
        }, {
            left: "0%",
            duration: 14.2,
            ease: "circ.in"
        });
        // gsap.to(containerReference.current, {
        //     opacity: 0,
        //     duration: 1,
        //     delay: 9,
        //     ease: "sine.inOut"
        // });

        // if (isVisible === true)
        // {
        //     gsap.to(containerReference.current, {
        //         opacity: 1,
        //         duration: 1.0,
        //         ease: "sine.inOut",
        //         onComplete: () =>
        //         {
        //             if (videoReference.current === null) return;
        //             videoReference.current.play();
        //         }
        //     });
        // }

        // if (isVisible === false)
        // {
        //     gsap.to(containerReference.current, {
        //         opacity: 0,
        //         duration: 1.0,
        //         ease: "sine.inOut",
        //         onComplete: () =>
        //         {
        //             if (videoReference.current === null) return;
        //             videoReference.current.pause();
        //             videoReference.current.currentTime = 0;
        //         }
        //     });
        // }


    }, { dependencies: [properties] });

    return (
        <>
            <div ref={backgroundReference} className="absolute -top-full left-0 z-50 w-full h-full" style={{ backgroundColor: properties.colour }}></div>
            <div ref={containerReference} className="absolute -top-full left-0 z-50 w-full h-full grid grid-rows-3 bg-white">
                <div ref={textReference} className="flex flex-col p-12 gap-3 row-span-1">
                    <div className="text-5xl">{properties.title}</div>
                    <div className="text-xl">{properties.subtitle}<span className="underline underline-offset-2" style={{ color: properties.colour }}>{properties.subtitleLink}</span></div>
                </div>
                <div className="border-t border-dashed border-black grid grid-rows-2 overflow-hidden row-span-2">
                    <div className="relative bg-warning-diagonal">
                        <img ref={imageReference} className="absolute left-3/4 w-full h-full border-l border-black object-cover" src={properties.image}></img>
                        <div ref={imageCoverReference} className="absolute top-0 left-0 h-full w-full bg-black"></div>
                    </div>
                    <div className="border-t border-dashed border-black flex flex-row">
                        <div className="relative border-r border-black border-dashed p-24 flex items-center">
                            {properties.logo}
                            <div ref={logoCoverReference}>
                                <div className="absolute top-0 left-0 h-full w-full" style={{ backgroundColor: properties.colour }}></div>
                                <div className="absolute top-0 left-0 h-full w-full bg-black"></div>
                            </div>
                        </div>
                        <div className="relative w-full p-12 pr-72 text-lg">
                            <div ref={descriptionReference} >{properties.description}</div>
                            <div ref={descriptionCoverReference}>
                                <div className="absolute top-0 left-0 h-full w-full" style={{ backgroundColor: properties.colour }}></div>
                                <div className="absolute top-0 left-0 h-full w-full bg-black"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};