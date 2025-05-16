/** @type {import('next').NextConfig} */
module.exports = {
    output: "standalone",
    env: {
        GITHUB_USERNAME: process.env.NEXT_PUBLIC_GITHUB_USERNAME,
        API_BASE: process.env.NEXT_PUBLIC_API_BASE,
    },
    images: { domains: ["avatars.githubusercontent.com"] },
};
