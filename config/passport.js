var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const db = require("../models");
const Secret = db.secret;
const User = db.user;

passport.use('local-access',new LocalStrategy(
  {
    usernameField: 'mail',
    passwordField: 'password',
  },
  function(mail, password, done) {
    if(mail) {mail.toLocaleLowerCase()};
    Secret.findOne({ where: {mail: mail}}).then(async function (secret) {
      if (!secret) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (await bcrypt.compare(password, secret.password)) {
        User.findOne({where: {id: secret.user_id}}).then(function(user) {
          return done(null, user);
        }).catch(err=>done(err));
      } else {
        return done(null, false, { message: 'Incorrect password.' });
      }     
    }).catch(err => done(err));
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
})
passport.deserializeUser(function(id, done) {
  User.findByPk(id).then(user => {
    done(null, user);
  }).catch(err => {done(err, null)})
})


module.exports = passport;