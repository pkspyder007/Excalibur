const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GoogleUser = require('../models/google.user.model');


passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  GoogleUser.findById(id).then((user) => {
    done(null, user);
  })
});

passport.use(new GoogleStrategy({
  callbackURL: 'http://localhost:5000/auth/google/redirect',
  clientID: process.env.GOOGLE_CLIENTID,
  clientSecret: process.env.GOOGLE_SECRET
}, (accessToken, refreshToken, profile, done) => {
  const user = {
    googleID: profile.id,
    name: profile.displayName,
    email: profile.emails[0].value,
    pic: profile._json.picture
  };
  GoogleUser.findOne({ googleID: profile.id })
    .then(currrentUser => {
      if (currrentUser) {
        done(null, currrentUser);
      } else {
        GoogleUser.create(user)
          .then(newUser => {
            done(null, newUser);
          })
          .catch(err => {
            console.log(err)
          })
      }
    })
    .catch(err => {
      console.log(err)
    });
})
);