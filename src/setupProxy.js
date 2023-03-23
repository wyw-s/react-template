/**
 * @Author: wangyw26123
 * @Description: 请求代理
 * @Date: Created in 2023-03-23 22:43:57
 * @Modifed By:
 */
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true
    })
  );
};
