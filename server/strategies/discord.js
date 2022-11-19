const DiscordStrategy = require('passport-discord').Strategy;
const passport = require('passport');
const DiscordUser = require('../models/userModel');
const { CLIENT_ID, CLIENT_SECRET, CLIENT_REDIRECT_URI } = require('../config')

passport.serializeUser((user, done) => {
    console.log("Serialize");
    done(null, user.id)
});

passport.deserializeUser(async (id, done) => {
    console.log("Deserializing");
    const user = await DiscordUser.findById(id);
    if(user) 
        done(null, user);
});

passport.use(new DiscordStrategy({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CLIENT_REDIRECT_URI,
    scope: ['identify', 'guilds']
}, async (accessToken, refreshToken, profile, done) => {
    try {
        console.log(profile.username)
        done(null)
    }
    catch(err) {
        console.log(err);
        done(err, null);
    }
}));