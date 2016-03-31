/* eslint no-console: "off" */
import webpack from 'webpack';
import path from 'path';
import express from 'express';

const createServer = (config, port, host) => {
  const serverPort = port || 3000;
  const serverHost = host || '0.0.0.0';
  const compiler = webpack(config);
  const app = express();

  const staticDir = path.join(__dirname, '/build');
  app.use('/static', express.static(staticDir));

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
  }));

  app.use(require('webpack-hot-middleware')(compiler));

  app.listen(serverPort, serverHost, (err) => {
    if (err) console.error(err);

    console.log(`Listening at http://${serverHost}:${serverPort}`);
  });

  return app;
};

export default createServer;
