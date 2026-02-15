import type {NextConfig} from "next";

const path = require('path')

const nextConfig: NextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
    },
    outputFileTracingRoot: path.join(__dirname, '../../'),
    trailingSlash: true,
};

export default nextConfig;
