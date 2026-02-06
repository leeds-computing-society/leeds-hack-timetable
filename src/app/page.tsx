"use client";
import { useEffect, useRef, useState } from "react";
import Marquee from "react-fast-marquee";
import { Calendar } from "@/app/components/calendar";
import { Countdown } from "@/app/components/countdown";
import { Banner, BannerOverlay } from "@/app/components/banner-overlay";
import { PwCLogo } from "@/app/components/sponsors/pwc-logo";
import { GenioLogo } from "@/app/components/sponsors/genio-logo";
import { IMDbLogo } from "@/app/components/sponsors/imdb-logo";
import { LigentiaLogo } from "@/app/components/sponsors/ligentia-logo";
import { ParallaxLogo } from "@/app/components/sponsors/parallax-logo";
import { Clock } from "./components/clock";

let bannerList: Banner[] = [
    {
        title: "Find opportunities at PwC",
        subtitle: "Check out job opportunities at PwC: ",
        subtitleLink: "https://careers.pwc.com/",
        description: "PwC are a tech-forward, people-empowered network. With deep expertise and advanced capabilities, they help harness technology, make smart investments and be ready for any future. Across audit and assurance, tax and legal, deals and consulting they bring together the teams, resources and alliances to help companies to act boldly and achieve real results. PwC helps meet the demands of our ever-changing world with consistent quality and objective advice. Building on 175 years of trusted relationships, PwC are ready to help, ready to lead and ready to grow. They'll help you accelerate as you embrace the future.",
        image: "/banner/pwc.jpg",
        colour: "#FD5108",
        logo: <PwCLogo className="h-full"></PwCLogo>
    },
    {
        title: "Find opportunities at Genio",
        subtitle: "Check out job opportunities at Genio: ",
        subtitleLink: "https://genio.co/about/careers",
        description: "At Genio (formerly Glean) we envision a world where every person has the tools and confidence to expand what's possible through learning. We believe this happens when you equip, empower, and encourage learners with courses to develop study skills, and tools that put knowledge into action, unlocking better learning. Trusted by over 1,000 institutions, Genio Notes makes classroom learning more effective for students of all abilities, and is now paired with an engaging course to boost study skills. Genio Present helps students gain presentation confidence through structured rehearsal, self-reflection, actionable feedback, and visible growth.",
        image: "/banner/genio.jpg",
        colour: "#FC88C6",
        logo: <GenioLogo className="h-4/5"></GenioLogo>
    },
    {
        title: "Find opportunities at IMDb",
        subtitle: "Check out job opportunities at IMDb: ",
        subtitleLink: "https://www.amazon.jobs/content/en/teams/imdb",
        description: "IMDb is the world's most popular and authoritative source for information on movies, TV shows, and celebrities. Hundreds of millions of customers all over the world rely on IMDb to discover and decide what to watch, advance their professional entertainment careers through IMDbPro, and grow their businesses using IMDb data and trending insights. Col Needham is the founder and CEO of IMDb. After starting a computer games software business at the age of 14, he went on to complete a computer science degree at Leeds University before commencing a career in technology research in Bristol, England.",
        image: "/banner/imdb.jpg",
        colour: "#F5C518",
        logo: <IMDbLogo className="h-full"></IMDbLogo>
    },
    {
        title: "Find opportunities at Parallax",
        subtitle: "Check out job opportunities at Parallax: ",
        subtitleLink: "https://parall.ax/careers",
        description: "Founded in 2010, Parallax is a digital innovation consultancy with a team of 40 people based in Leeds and London. The firm positions itself as a partner in digital delivery and technical innovation, crafting digital solutions and cutting-edge technologies for both global organizations and ambitious scale-ups. Their core service areas include Digital & Product Consulting, Software Engineering, Experience Design, and Agile Delivery. Additionally, Parallax maintains specialized expertise in Generative AI, IoT, and Low-code platforms. The company holds ISO 27001 and 9001 certifications, is an AWS Hero and Partner with Azure and GCP experience, and has won over 25 awards for its work.",
        image: "/banner/parallax.jpg",
        colour: "#8561F6",
        logo: <ParallaxLogo className="h-2/5"></ParallaxLogo>
    },
    {
        title: "Find opportunities at Ligentia",
        subtitle: "Check out job opportunities at Ligentia: ",
        subtitleLink: "https://ligentia.com/careers/",
        description: "Ligentia is a leading supply chain technology and solutions provider with over almost 30 years' experience delivering more sustainable and agile supply chains. Our customers include some of the world's most sophisticated retailers and best-known brands in manufacturing, healthcare, and consumer goods. With teams located across Asia, Australia, North America, and Europe, our people are supply chain experts who provide world-class sector and regional expertise, backed by smart technology. We give businesses the data, insights and tools they need to transform their supply chains, proactively manage disruption, reduce supply chain waste, and deliver exceptional experiences for their customers.",
        image: "/banner/ligentia.jpg",
        colour: "#E60080",
        logo: <LigentiaLogo className="h-3/5"></LigentiaLogo>
    }
];

export default function Page()
{
    const [bannerIndex, setBannerIndex] = useState<number>(0);
    const requestReference = useRef<number | null>(null);
    const timeReference = useRef<number | null>(null);

    // let [currentTime, setCurrentTime] = useState<Date>(new Date());

    // useEffect(() =>
    // {
    //     // const intervalId = setInterval(() =>
    //     // {
    //     //     setBannerIndex((previous) => (previous + 1) % bannerList.length);
    //     // }, 15000);

    //     // return () => clearInterval(intervalId);


    //     // let frameId: number;

    //     // let update = () =>
    //     // {
    //     //     setCurrentTime((previous) =>
    //     //     {
    //     //         console.log(Date.now() - previous.getTime());
    //     //         console.log(Date.now() - previous.getTime() < 15000);
    //     //         if (Date.now() - previous.getTime() < 15000) return previous;
    //     //         setBannerIndex((previousIndex) => (previousIndex + 1) % bannerList.length);
    //     //         return new Date();
    //     //     });
    //     //     frameId = requestAnimationFrame(update);
    //     // };

    //     // frameId = requestAnimationFrame(update);
    //     // return () => cancelAnimationFrame(frameId);
    // }, []);

    const animate = (time: number) =>
    {
        if (timeReference.current !== null)
        {
            let deltaTime = time - timeReference.current;

            if (deltaTime >= 60000 + 17200) // 70000 15200
            {
                setBannerIndex((previousIndex) => (previousIndex + 1) % bannerList.length);
                timeReference.current = time;
            };
        }
        else
        {
            timeReference.current = time;
        };

        requestReference.current = requestAnimationFrame(animate);
    };

    useEffect(() =>
    {
        requestReference.current = requestAnimationFrame(animate);

        return () =>
        {
            if (requestReference.current !== null) cancelAnimationFrame(requestReference.current);
        };
    }, []);

    return (
        <div className="h-full w-full flex flex-col">
            <div className="absolute z-40 w-full flex justify-center" style={{ top: 384 + 48 }}>
                <div className="flex flex-row items-center w-4/5">
                    <div className="text-md text-transparent pr-6">00:00:00</div>
                    <div className="h-0.5 w-full bg-leeds-hack-2026-primary-200/75"></div>
                    <div className="text-md text-leeds-hack-2026-primary-200 pl-6">
                        <Clock></Clock>
                    </div>
                </div>
            </div>
            <BannerOverlay {...bannerList[bannerIndex]}></BannerOverlay>
            {/* <OverlayVideo></OverlayVideo> */}
            <div className="absolute top-18 left-0 z-40 w-full flex justify-center">
                <div className="text-4xl bg-black border border-white/50 px-6 py-1.5">
                    <Countdown target={new Date("2026-02-08T12:00:00")}></Countdown>
                </div>
            </div>
            <Marquee className="h-12 w-full bg-black/50 border-white/50 border-b" autoFill={true} speed={25}>
                <PwCLogo className="mr-12 fill-white h-4"></PwCLogo>
                <GenioLogo className="mr-12 fill-white h-4"></GenioLogo>
                <IMDbLogo className="mr-12 fill-white h-3"></IMDbLogo>
                <LigentiaLogo className="mr-12 fill-white h-3"></LigentiaLogo>
                <ParallaxLogo className="mr-12 fill-white h-3"></ParallaxLogo>
            </Marquee>
            <div className="min-h-0 flex-1 flex flex-row justify-center">
                <Calendar className="relative h-full w-full max-w-6xl overflow-hidden"></Calendar>
            </div>
            <Marquee className="h-12 w-full bg-black/50 border-white/50 border-t" autoFill={true} speed={25}>
                <PwCLogo className="mr-12 fill-white h-4"></PwCLogo>
                <GenioLogo className="mr-12 fill-white h-4"></GenioLogo>
                <IMDbLogo className="mr-12 fill-white h-3"></IMDbLogo>
                <LigentiaLogo className="mr-12 fill-white h-3"></LigentiaLogo>
                <ParallaxLogo className="mr-12 fill-white h-3"></ParallaxLogo>
            </Marquee>
        </div>

    );
};