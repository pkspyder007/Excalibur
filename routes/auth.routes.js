const AuthRouter = require('express').Router();
const passport = require('passport');
const passportSetup = require('../passport/passport-setup');
const jwt = require('jsonwebtoken');
const localStorage = require('localStorage');

AuthRouter.get('/', (req, res) => {
  console.log('/Home')
})

AuthRouter.get('/google', passport.authenticate('google', { scope: ['openid', 'email', 'profile'] }));

AuthRouter.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  const token = jwt.sign({
    user_id: req.user._id,
    username: req.user.email
  }, process.env.JWT_SECRET, { expiresIn: '1hr' }
  );
  if (token) {
    res.redirect('//localhost:3000/login/' + token + '&' + req.user._id)

  }
  else {
    res.redirect('//localhost:3000/login/' + 'false')
  }
});

AuthRouter.get('/logout', (req, res) => {
  res.redirect('//localhost:3000/login/' + 'false')
})

module.exports = AuthRouter;