import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import appConf from './config/application';
import winston from './config/winston';
import { httpStream } from './config/winston_new';
import { FormError, isSystemError } from './config/error';
import { initCache } from './service/cache/app-cache';
import * as routers from './controller/index';

require('dotenv')
  .config();

const morgan = require('morgan');
const session = require('express-session');
const SessionFileStore = require('session-file-store')(session);
const passport = require('passport');
require('./service/passport')(passport);

const app = express();

app.use(
  session({
    store: new SessionFileStore(),
    secret: 'auto_care',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: appConf.sessionTimeout
    }
  })
);

app.use(morgan('combined', { stream: httpStream }));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  express.static('public', {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html'],
    index: false,
    maxAge: '1d',
    redirect: false,
    // setHeaders (res) {
    //   res.set('x-timestamp', Date.now());
    // }
  })
);
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
function logErrors (err, req, res, next) {
  winston.log('error', 'Exception: ', err);
  next(err);
}

/**
 * Must have next here.index.js
 * @param err
 * @param req
 * @param res
 * @param next require.
 */

/* eslint-disable no-unused-vars */
function errorHandler (err, req, res, next) {
  if (err instanceof FormError) {
    res.status(err.code)
      .json(err.errors);
  } else if (!isSystemError(err)) {
    res.statusMessage = err.message;
    res.status(err.code || 500)
      .json({ error: err.message });
  }
}

/* eslint-enable no-unused-vars */
app.get('/', (req, res) => res.send({ message: 'Welcome to the default API route' }));
app.use('/api/auth', routers.auth);

// For user
app.use('/api/user', routers.userRouter);
app.use('/api/user-file', routers.userFileRouter);

// For User Administrator
app.use('/api/user-admin/user', routers.adminUserRouter);

// For car manager
app.use('/api/car', routers.carRouter);

app.use(logErrors);
app.use(errorHandler);

// setup express application
const server = http.createServer(app);

server.listen(appConf.port, appConf.hostname, async () => {
  initCache();
  winston.info(`Server running at http://${appConf.hostname}:${appConf.port}/`);
});
