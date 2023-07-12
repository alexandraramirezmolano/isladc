const WorkboxPlugin = require('workbox-webpack-plugin');
const WebpackPwaManifestPlugin = require('webpack-pwa-manifest');
const path = require('path');

module.exports = {
  // ... other webpack configuration options
  plugins: [
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      swDest: 'sw.js', // Specify the service worker file name
      runtimeCaching: [
        {
          urlPattern: new RegExp('^https://your-api-url.com/'), // Customize the URL pattern to match your API
          handler: 'StaleWhileRevalidate',
        },
      ],
    }),
    new WebpackPwaManifestPlugin({
      name: 'IslaDC',
      short_name: 'IslaDC',
      description: '',
      background_color: '#fff',
      theme_color: '#24242f',
      icons: [
        {
          src: path.resolve('src/assets/images/logo.png'),
          sizes: [96, 128, 192, 256, 384, 512],
        },
      ],
      display: 'standalone', // Open the app as standalone mode
      orientation: 'portrait', // Set the default orientation to portrait
    }),
  ],
};
