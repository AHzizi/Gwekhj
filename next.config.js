module.exports = {
  reactStrictMode: true,
  trailingSlash: true,
  pageExtensions: ['page.js', 'api.js'],
  webpack(config, { isServer }) {
    config.experiments = { topLevelAwait: true }; // Correct placement for experiments
    config.module.rules.push({
      test: /\.(glb)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next',
            name: 'static/media/[name].[hash].[ext]',
          },
        },
      ],
    });

    if (isServer) {
      require('./scripts/generate-sitemap');
      require('./scripts/draco');
    }

    config.module.rules.push({
      test: /\.svg$/,
      resourceQuery: { not: [/url/] },
      use: [{ loader: '@svgr/webpack', options: { svgo: false } }],
    });

    config.module.rules.push({
      test: /\.(mp4|hdr|glb|woff|woff2)$/i,
      type: 'asset/resource',
    });

    config.module.rules.push({
      resourceQuery: /url/,
      type: 'asset/resource',
    });

    config.module.rules.push({
      test: /\.glsl$/,
      type: 'asset/source',
    });

    return config;
  },
};
