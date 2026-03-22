/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/kunal",
        destination: "/kunal.html",
      },
      {
        source: "/kunal-resume",
        destination: "/resume.html",
      },
      {
        source: "/kunal-portfolio",
        destination: "/portfolio.html",
      },
    ];
  },
};

export default nextConfig;
