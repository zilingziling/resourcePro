const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(proxy('/resource', {
        target: 'http://172.16.3.155:8099',
        // target: 'http://172.16.4.200:9090',
        changeOrigin: true,
    }));
};