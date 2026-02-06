import type { Metadata } from "next";

export const defaultMetadata: Metadata = {
    title: "LeedsHack | Timetable",
    authors: {
        name: "Leeds Computing Society"
    },
    creator: "Leeds Computing Society",
    publisher: "Leeds Computing Society",
    icons: {
        icon: [
            { url: "/favicon.ico", sizes: "48x48" },
            { url: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
            { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
            { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
            { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
            { url: "/favicon-128x128.png", sizes: "128x128", type: "image/png" },
            { url: "/favicon-196x196.png", sizes: "196x196", type: "image/png" }
        ],
        apple: [
            { url: "/apple-touch-icon-57x57.png", sizes: "57x57", type: "image/png", rel: "apple-touch-icon-precomposed" },
            { url: "/apple-touch-icon-60x60.png", sizes: "60x60", type: "image/png", rel: "apple-touch-icon-precomposed" },
            { url: "/apple-touch-icon-72x72.png", sizes: "72x72", type: "image/png", rel: "apple-touch-icon-precomposed" },
            { url: "/apple-touch-icon-76x76.png", sizes: "76x76", type: "image/png", rel: "apple-touch-icon-precomposed" },
            { url: "/apple-touch-icon-114x114.png", sizes: "114x114", type: "image/png", rel: "apple-touch-icon-precomposed" },
            { url: "/apple-touch-icon-120x120.png", sizes: "120x120", type: "image/png", rel: "apple-touch-icon-precomposed" },
            { url: "/apple-touch-icon-144x144.png", sizes: "144x144", type: "image/png", rel: "apple-touch-icon-precomposed" },
            { url: "/apple-touch-icon-152x152.png", sizes: "152x152", type: "image/png", rel: "apple-touch-icon-precomposed" }
        ]
    }
};