/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'pbs.twimg.com',
            },
            {
                protocol: process.env.NEXT_PUBLIC_HOST_NAME?.startsWith('https') ? 'https' : 'http',
                hostname: process.env.NEXT_PUBLIC_HOST_NAME?.replace(/^https?:\/\//, ''),
            },
        ]
    },
};

export default nextConfig;
