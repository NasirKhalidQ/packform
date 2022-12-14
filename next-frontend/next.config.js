/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  redirects: async () => {
    return [{ source: "/", destination: "/orders", permanent: true }];
  },
};

module.exports = nextConfig;
