/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'pbs.twimg.com' },
            { protocol: 'http', hostname: 'kong', port: '8000' },
        ]
    },
};

export default nextConfig;
