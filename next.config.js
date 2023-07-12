const runtimeCaching = require('next-pwa/cache');
require('dotenv').config();
const withPWA = require('next-pwa')({
  dest: 'public',
  //disable: process.env.NODE_ENV === 'development',
  runtimeCaching,
});

const nextConfig = withPWA({
  reactStrictMode: true,
  images: {
    domains: ['assets.coingecko.com'],
  },

  webpack(config, options) {
    // Resolve the 'useContext' issue by providing a fallback for React's production minified file
    if (!options.isServer) {
      config.resolve.alias['react'] = 'react/umd/react.production.min.js';
    }
    return config;
  },
  ...(process.env.NODE_ENV === 'production' && {
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
  }),
});

module.exports = nextConfig;
