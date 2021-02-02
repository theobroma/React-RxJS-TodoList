const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

passport.use(
  new GoogleStrategy(
    {
      //options for the google strat
      callbackURL: '/auth/google/redirect',
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret
    },
    (accessToken, refreshTokken, profile, done) => {
      //passport callback func
      console.log('Passport cb func fired!!!');
      console.log(profile);
    }
  )
);
