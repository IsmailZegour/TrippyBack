var session = require('express-session');
const { v4: uuidv4 } = require('uuid');

const app_session = {
    secret: 'SecretKey',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
    genid: function (req) {
      return uuidv4();
    },
    name: 'userSessionId'
  };

  module.exports = session(app_session);