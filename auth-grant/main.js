const express = require('express');
const session = require('express-session');
const redis = require('redis');
const cors = require('cors');
const grant = require('grant').express();
require('dotenv').config();

var config = Object.assign(require('./config.json'), {
  github: {
    key: process.env.GITHUB_CLIENT_ID,
    secret: process.env.GITHUB_CLIENT_SECRET,
    scope: ['repo'],
    response: ['tokens', 'profile', 'raw'],
  },
});

const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
});
const RedisStore = require('connect-redis')(session);

express()
  .use(
    session({
      secret: process.env.SESSION_SECRET || 'grant',
      resave: false,
      saveUninitialized: false,
      store:
        process.env.NODE_ENV === 'production'
          ? new RedisStore({ client: redisClient })
          : undefined,
    }),
  )
  .use(grant(config))
  .use(
    cors({
      origin: [process.env.REDIRECT_URI],
      credentials: true,
    }),
  )
  .use('/get_token', (req, res) => {
    if (!req.session.grant || !req.session.grant.response) {
      console.log('User has not granted authentication yet');
      res.status(403).send({
        message: 'User has not granted authentication yet',
      });
      return;
    }
    res.send({
      accessToken: req.session.grant.response.access_token,
    });
  })
  .use('/connect/github/callback', (req, res) => {
    res.redirect(process.env.REDIRECT_URI);
  })
  .listen(8080);
