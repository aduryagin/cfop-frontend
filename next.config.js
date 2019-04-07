const withCSS = require('@zeit/next-css');
const withTypescript = require('@zeit/next-typescript');
const withOffline = require('next-offline');

module.exports = withTypescript(withCSS(withOffline({
  workboxOpts: {
    swDest: 'static/service-worker.js',
    runtimeCaching: [
      // images

      {
        urlPattern: /.[png|gif]$/,
        handler: 'cacheFirst',
        options: {
          cacheName: 'images',
          expiration: {
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
          },
        },
      },

      // google api's / static files

      {
        urlPattern: /.*(?:googleapis|gstatic)\.com/,
        handler: 'staleWhileRevalidate',
        options: {
          cacheName: 'google-api-or-static',
          expiration: {
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
          },
        },
      },

      // js and css

      {
        urlPattern: /.[js|css]$/,
        handler: 'staleWhileRevalidate',
        options: {
          cacheName: 'js-and-css',
          expiration: {
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
          },
        },
      },

      // https calls

      {
        urlPattern: /^https?.*/,
        handler: 'networkFirst',
        options: {
          cacheName: 'https-calls',
          expiration: {
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
          },
        },
      },
    ],
  },
})));
