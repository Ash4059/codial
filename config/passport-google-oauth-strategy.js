const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/users');

// Tells passport for google login
passport.use(new googleStrategy({
        clientID: "1068250646074-ii05q0ie78u0hmgota6geoib44ljek01.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8080/users/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done){
        // Find user
        User.findOne({email: profile.emails[0].value}).exec(function(error,user){
            if(error){
                console.log("Error in google strategy passport",error);
                return;
            }
            console.log(profile);
            if(user){
                // If user found then return user
                return done(null, user);
            }else{
                // If user not found then create a user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                },function(error,user){
                    if(error){
                        console.log("Error in creating user", error);
                        return;
                    }
                    return done(null, user);
                })
            }
        })
    }
))

module.exports = passport;