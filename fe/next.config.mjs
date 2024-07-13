/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "noun-api.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
