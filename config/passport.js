const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');

passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK
    },
    // Verify callback function
    async function(accessToken, refreshToken, profile, cb) {
        // A user has logged in with OAuth
        try {
            let user = await User.findOne({ googleId: profile.id });
            // Existing user found
            if (user) return cb(null, user);
            // We have a new user via OAuth!
            user = await User.create({
                name: profile.displayName,
                googleId: profile.id,
                email: profile.emails[0].value,
                avatar: profile.photos[0].value,
            });
            return cb(null, user);
        }   catch (err) {
            return cb(err);
        }
    }
));

// provides a callback that Passport will call after the verify callback.
passport.serializeUser(function(user, cb) {
    cb(null, user._id);
});

// provides a callback that Passport will call for every request when a user is logged in.
passport.deserializeUser(async function(userId, cb) {
    cb(null, await User.findById(userId));
});