var express = require('express');
var session = require('express-session');
var grant = require('grant').express();
require('dotenv').config();

var config = Object.assign(require('./config.json'), {
  github: {
    key: process.env.GITHUB_CLIENT_ID,
    secret: process.env.GITHUB_CLIENT_SECRET,
    scope: 'repo',
    callback: '/hello',
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
  .use('/hello', (req, res) => {
    console.log(req.session.grant.response.profile);
    // TODO store refresh token to backend using user information as key
    res.redirect(
      `${process.env.REDIRECT_URI}/?access_token=${req.session.grant.response.access_token}`,
    );
  })
  .listen(8080);
