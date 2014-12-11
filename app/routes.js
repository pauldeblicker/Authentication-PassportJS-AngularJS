var mongoose = require('mongoose');
var User = require('./models/user');

module.exports = function(app, passport) {
  //Routes for login and signup ================================================
  app.post('/login', function(req, res, next) {
    passport.authenticate('local-login', function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.send({ success : false, message : info.message });
      }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
          return res.send({success : true});
      });
    })(req, res, next);
  });

  app.post('/signup', function(req, res, next) {
    passport.authenticate('local-signup', function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.send({ success : false, message : info.message });
      }
      req.logIn(user, function(err) {
        if (err)
          return next(err);
        return res.send({success : true});
      });
    })(req, res, next);
  });

  //Route for checking if user is logged in ====================================
  app.get('/loggedin', function(req, res) {
    res.json(req.isAuthenticated() ? req.user.toJSON() : '0');
  });

  //Route for logout ===========================================================
  app.get('/logout', function(req, res) {
    req.logout();
    res.json({message :"Logout OK"});
  });

}
