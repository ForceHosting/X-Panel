const DiscordStrategy = require('passport-discord').Strategy;
const passport = require('passport');
const User = require('../models/userModel');
const { CLIENT_ID, CLIENT_SECRET, CLIENT_REDIRECT_URI } = require('../config')
const { sendErrorCode, userRegister} = require('../bot/index');
const {sendWelcome, makeid} = require('../functions');
const fetch = require('node-fetch');
const {pteroKey} = require('../config.json');
const ShortUniqueId = require("short-unique-id");
const uid = new ShortUniqueId({ length: 20 });

passport.serializeUser((user, done) => {
    done(null, user)
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findOne({_id: id._id});
    if(user) 
        done(null, user);
});

passport.use(new DiscordStrategy({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CLIENT_REDIRECT_URI,
    scope: ['identify', 'guilds', 'email']
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await User.findOne({discordId: profile.id});
        if(user){
            await user.updateOne({
                username: `${profile.username}#${profile.discriminator}`,
                email: profile.email
            });
            done(null, user);
        }else{
    const pteroIdu = makeid(10);
    const pteroPass = makeid(15)
    var rawPteroPass = Buffer.from(pteroPass);
    var encryptedPteroPass = rawPteroPass.toString('base64');
    const pteroReq = await fetch('https://control.forcehost.net/api/application/users', {
      method: 'post',
      headers: {
        "Accept": "application/json",
        'Content-Type': 'application/json',
        Authorization: `Bearer `+pteroKey
      },
      body: JSON.stringify({
        username: pteroIdu,
        email: profile.email,
        first_name: 'Force Host',
        last_name: 'Registered User',
        password: pteroPass,
      })
    });
    const pteroData = await pteroReq.json();
    if(pteroReq.status === 201 || pteroReq.status === 200){
      const newLinkId = makeid(10)
      const pterodactylUid = pteroData.attributes.id;
      const newUser = await User.create({
        uid: uid,
        username: `${profile.username}#${profile.discriminator}`,
        email: profile.email,
        pteroUserId: pteroIdu,
        pteroId: pterodactylUid,
        pteroPwd: encryptedPteroPass,
        credits: 20,
        role: "Customer",
        linkId: newLinkId,
        discordId: profile.id
      });
      userRegister(`<@${profile.id}>`)
      sendWelcome(newUser.email)
      done(null, newUser)
    }else{
      const pteroRequest = await fetch('https://control.forcehost.net/api/application/users/?filter[email]='+profile.email+'', {
        method: 'GET',
        headers: {
          "Accept": "application/json",
          'Content-Type': 'application/json',
          Authorization: `Bearer `+pteroKey
        },
      });
      const pteroUser = await pteroRequest.json();
      if(pteroRequest.status !== 200){
        const errorCode = makeid(5)
        sendErrorCode(errorCode, 'Pterodactyl account creation issues. No email found, but registered (?)')
        done(null)
      }else{
      const newLinkId = makeid(10)

        const newUser = await User.create({
          uid: uid,
          username: `${profile.username}#${profile.discriminator}`,
          email: profile.email,
          pteroUserId: pteroIdu,
          pteroId: pteroUser.data[0].attributes.id,
          pteroPwd: encryptedPteroPass,
          credits: 20,
          role: "Customer",
          linkId: newLinkId,
          discordId: profile.id
        });
        userRegister(`<@${profile.id}>`)
        sendWelcome(newUser.email)
        done(null, newUser)
      }
    }
  }
}catch(err) {
        console.log(err);
        done(err, null);
}}));