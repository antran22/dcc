const path = require('path');

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Important: return the modified config
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
      '#': path.resolve(__dirname, 'src/shared'),
    };
    return config;
  },
  images: {
    domains: ['cms.dochoichu.com'],
  },
};
