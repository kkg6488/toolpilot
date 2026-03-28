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
      {
        source: "/workout",
        destination: "/kunal-aggressive-cut.html",
      },
    ];
  },
};

export default nextConfig;
