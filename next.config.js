/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    config.module.rules.push({ test: /\.node$/, use: 'raw-loader' })

    if(!isServer) config.externals.push('canvas');
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placeholder.co",
      },{
        protocol: "https",
        hostname: "cloud.appwrite.io",
      },
    ],
  },
  video: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placeholder.co",
      },{
        protocol: "https",
        hostname: "cloud.appwrite.io",
      },
    ],
  },
};
module.exports = nextConfig;
