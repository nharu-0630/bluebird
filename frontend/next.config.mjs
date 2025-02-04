/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['pbs.twimg.com', process.env.NEXT_PUBLIC_HOST_NAME],
    },
};

export default nextConfig;
