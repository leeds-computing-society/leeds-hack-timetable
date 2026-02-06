"use client";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";

export default function Home()
{
    return (
        <div className="flex flex-col grow min-[32rem]:justify-center items-center text-center text-white max-w-5xl mx-auto">
            <div className="m-12 flex flex-col gap-6">
                <TypeAnimation
                    repeat={Infinity}
                    preRenderFirstString={true}
                    omitDeletionAnimation={false}
                    sequence={[
                        "",
                        "404",
                        2000,
                        "",
                        "NOT FOUND",
                        2000,
                        "",
                        "ERROR 404",
                        2000,
                        "",
                        "PAGE NOT FOUND",
                        2000,
                    ]}
                    wrapper="div"
                    speed={4}
                    cursor={true}
                    className="text-header-sm min-[32rem]:text-header-md min-[66rem]:text-header-lg"
                />
                <div className="text-md min-[32rem]:text-lg">
                    It seems you are lost, traveller. Return <Link href="/" className="text-link link link-leeds-hack-2026">Home</Link>.
                </div>
            </div>
        </div>
    );
};