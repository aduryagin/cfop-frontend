const { join } = require('path');
const next = require('next');
const proxyMiddleware = require('http-proxy-middleware');
const express = require('express');

const port = parseInt(process.env.PORT, 10) || 3001;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();

    // api proxy

    server.use(proxyMiddleware('/api', {
      target: dev ? 'http://localhost:8080' : 'http://api.cfop.aduryag.in',
      pathRewrite: {
        '^/api': '/query',
      },
      changeOrigin: true,
    }));

    // service worker

    server.get('/service-worker.js', (req, res) => {
      const filePath = join(__dirname, '.next/static/service-worker.js');
      res.sendFile(filePath);
    });

    // all requests handler

    server.all('*', (req, res) => handle(req, res));

    server.listen(port, (err) => {
      if (err) {
        throw err;
      }

      console.log(`> Ready on port ${port}`);
    });
  });
