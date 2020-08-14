var express = require('express');
var session = require('express-session');
var cors = require('cors');
var grant = require('grant').express();
require('dotenv').config();

var config = Object.assign(require('./config.json'), {
  github: {
    key: process.env.GITHUB_CLIENT_ID,
    secret: process.env.GITHUB_CLIENT_SECRET,
    scope: ['repo'],
    callback: '/redirect',
    response: ['tokens', 'profile'],
  },
});

// console.log(config);

express()
  .use(
    session({
      secret: 'grant',
      resave: false,
      saveUninitialized: false,
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
    if (!req.session.grant) {
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
  .use('/redirect', (req, res) => {
    res.redirect(process.env.REDIRECT_URI);
  })
  .listen(8080);
