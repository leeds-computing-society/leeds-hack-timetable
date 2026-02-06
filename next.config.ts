import type { NextConfig } from "next";

const nextConfiguration: NextConfig = {
    async redirects()
    {
        return [
            {
                source: "/leedshack",
                destination: "https://leedshack.com",
                permanent: true
            }
        ];
    },
    transpilePackages: ["three"],
    turbopack: {
        rules: {
            "*.frag": {
                loaders: ["raw-loader", "glslify", "glslify-loader"],
                as: "*.tsx",
            },
            "*.vert": {
                loaders: ["raw-loader", "glslify", "glslify-loader"],
                as: "*.tsx",
            }
        }
    },
    webpack: (configuration, { isServer }) =>
    {
        configuration.module.rules.push({
            test: /\.frag$/,
            use: ["raw-loader", "glslify", "glslify-loader"],
        });
        configuration.module.rules.push({
            test: /\.vert$/,
            use: ["raw-loader", "glslify", "glslify-loader"],
        });
        return configuration;
    },
    //     webpack: (configuration) =>
    //     {
    //         configuration.module.rules.push({
    // test: /\.frag/,
    //         });


    //         return configuration;
    //     }
};

export default nextConfiguration;
