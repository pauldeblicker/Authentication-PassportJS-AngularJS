var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var User = require('../app/models/user');

module.exports = function(passport) {
  //Serialize user into session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  //Deserialize user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    })
  });

  //Local signup strategy
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, email, password, done) {
    User.findOne({'local.email': email}, function(err, user) {
      if(err)
        return done(err);
      if(user)
        return done(null, false, {message:'This email adress is already taken'});
      else {
        var newUser = new User();
        newUser.local.email = email;
        newUser.local.password = newUser.generateHash(password);
        newUser.local.school = req.body.school;

        newUser.save(function(err) {
          if(err)
            return done(err);
          return done(null, newUser);
        });
      }
    });
  }));

  //Local login strategy
  passport.use('local-login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  },
  function(req, email, password, done) {
    User.findOne({'local.email': email}, function(err, user) {
      if(err)
        return done(err);
      if(!user)
        return done(null, false, {message: 'Wrong email address'});
      if(!user.isValidPassword(password))
        return done(null, false, {message: 'Wrong password'});
      return done(null, user);
    });
  }));
};
