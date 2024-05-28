module.exports = {
  reactStrictMode: true,
  trailingSlash: true,
  pageExtensions: ['page.js', 'api.js'],
  experiments: {
    topLevelAwait: true,
  },
  webpack(config, { isServer }) {
    // Your webpack configuration
    return config;
  },
};
