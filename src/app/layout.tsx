import "@/app/globals.css";
import type { Metadata, Viewport } from "next";
// import { MouseHighlight } from "@/app/components/mouse-highlight";
// import { Header } from "@/app/components/header";
import { JetBrains_Mono } from "next/font/google";
import { Background } from "@/app/components/background";
import { defaultMetadata } from "./metadata";

// Debug
import { ReactScan } from "@/app/components/react-scan";

const jetBrainsMono = JetBrains_Mono({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    ...defaultMetadata
};

export const viewport: Viewport = {
    themeColor: "#00074d"
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>)
{
    return (
        <html lang="en">
            <ReactScan></ReactScan>
            <head>
            </head>
            <body className={jetBrainsMono.className + " absolute h-full w-full m-0 p-0 bg-black"}>
                <div className="absolute w-full h-full">
                    <Background></Background>
                    {/* <MouseHighlight></MouseHighlight> */}
                    <div className="absolute w-full h-full top-0 left-0">
                        {children}
                    </div>
                </div>
            </body>
        </html>
    );
};