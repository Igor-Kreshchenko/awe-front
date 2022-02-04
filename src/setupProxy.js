const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
      '/ap',
      createProxyMiddleware({
        target: 'http://localhost:7000',
        pathRewrite: {
          '^/ap':'' //remove /service/api
        },
        changeOrigin: false,
      })
    );
  };