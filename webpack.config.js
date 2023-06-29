const path = require('path');

module.exports = {
  // ... other configuration options
  resolve: {
    fallback: {
      fs: false, // or require.resolve("browserify-fs")
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      zlib: require.resolve("browserify-zlib"),
      net: false, // or require.resolve("net")
      dns: false, // or require.resolve("dns"),
      os: require.resolve("os-browserify/browser"),
    },
  },
};
