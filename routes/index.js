var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Please Log In' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Please Register' });
});

router.post('/register', function(req, res, next) {
  console.log("/register " + req.body.name);
  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var confirmPassword = req.body.confirmPassword;
  console.log(password + " " + confirmPassword);  

  req.checkBody('name', 'Name field is required').notEmpty();
  req.checkBody('email', 'Email field is required').notEmpty();
  req.checkBody('email', 'Valid email required').isEmail();
  req.checkBody('username', 'Username field is required').notEmpty();
  req.checkBody('password', 'Password field is required').notEmpty();
  req.checkBody('confirmPassword', 'Passwords must match').equals(req.body.password);

  var errors = req.validationErrors();
  if (errors) {
    res.render('register', {
      errors: errors
    });
  }
  else {
    passport.authenticate('local-signup', {
      successRedirect: '/dashboard', 
      failureRedirect: '/',
      failureFlash: true
    })(req, res, next);
  }
});

router.get('/dashboard', function(req, res, next) {
  res.render('dashboard', { title: 'Dashboard', layout: 'dashboard_layout' });
});

module.exports = router;
