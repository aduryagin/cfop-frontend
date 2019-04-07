const { join } = require('path');
const next = require('next');
const proxyMiddleware = require('http-proxy-middleware');
const express = require('express');
const spdy = require('spdy');
const fs = require('fs');

const port = parseInt(process.env.PORT, 10) || 3001;
const dev = process.env.NODE_ENV !== 'production';
const app = next(dev);
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();

    // api proxy

    server.use(proxyMiddleware('/api', {
      target: 'http://localhost:8080',
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

    // http2

    const options = {
      key: fs.readFileSync(`${__dirname}/certificate/privkey.pem`),
      cert: fs.readFileSync(`${__dirname}/certificate/fullchain.pem`),
      spdy: {
        ssl: !dev,
        plain: dev,
      },
    };

    spdy.createServer(options, server)
      .listen(port, (err) => {
        if (err) {
          throw err;
        }

        console.log(`> Ready on port ${port}`);
      });
  });
