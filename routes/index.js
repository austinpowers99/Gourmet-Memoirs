var express = require('express');
var router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Gourmet Memoirs' });
});

router.get('/auth/google', passport.authenticate(
  // Which passport strategy is being used?
  'google',
  {
  scope: ['profile', 'email'],
  }
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
  successRedirect: '/Gourmet Memoirs',
  failureRedirect: '/Gourmet Memoirs'
  }
));

router.get('logout', function(req, res) {
  req.logout(function() {
    res.redirect('/Gourmet Memoirs');
  });
})

module.exports = router;
