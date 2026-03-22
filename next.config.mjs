/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/kunal",
        destination: "/kunal.html",
      },
    ];
  },
};

export default nextConfig;
