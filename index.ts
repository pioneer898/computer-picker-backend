// Http Server
import express, { Express } from 'express';
const app: Express = express();
const session = require('express-session');
const http = require('http');
const server = http.createServer(app);

const cors = require('cors');
import { ApiCollection } from './custom_modules/api/ApiCollection';
import { errorHandler } from './custom_modules/api/ApiErrorHandler';
const clientConfig = require((typeof process.env.NODE_ENV === 'undefined' || process.env.NODE_ENV === 'development')?'./env.dev':'./env.prod');

app.use(cors());
app.use(errorHandler);
app.use(express.json());

// Session
app.use(session({
  cookie: {
    maxAge: (24*3600*1000),
    httpOnly: true,
    secure: (clientConfig.environment == 'production')?true:false
  },
  resave: false,
  saveUninitialized: false,
  secret: clientConfig.cookieSecret,
}));

// Static App
// app.use(express.static('/usr/app/dist/'));
// app.use('/images',express.static('images'));

// API Definitions
import { ConfigurationApi } from './custom_modules/ConfigurationApi';
import { ImageApi } from './custom_modules/ImageApi';

// Define API collection
let collection = new ApiCollection({
  resources:{
    clientConfig: clientConfig,
    appPath: (process.env.RELATIVE_PATH === undefined?'usr/app':process.env.RELATIVE_PATH) === 'true'?'..':'usr/app'
  }
});
collection.addApi(new ConfigurationApi({
  version: 'v1.0',
  collection: collection
}));
collection.addApi(new ImageApi({
  version: 'v1.0',
  collection: collection
}));

// Init API Handler
collection.run(app);

// Start Server
const port = (clientConfig.environment == 'production')?80:88;
server.listen(port, () => {
  console.log(`listening on *:${port}`);
});