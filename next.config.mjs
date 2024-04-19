/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
     remotePatterns: [
       {
          protocol: `${process.env.API_PROTOCOL}`,
          hostname: `${process.env.HOST_NAME}`,
          port: `${process.env.API_PORT}`
       }
     ]
  }
};

export default nextConfig;
