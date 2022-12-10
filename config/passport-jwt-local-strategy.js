const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const JWTExtract = require('passport-jwt').ExtractJwt;

const User = require('../models/users');

const opts = {
    jwtFromRequest: JWTExtract.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'Codeial'
};

passport.use(new JWTStrategy(opts,function(jwtPayload, done){
    User.findById(jwtPayload._id,function(err,user){
        if(err){
            console.log("Error while finding user from jwt token");
            return;
        }
        if(user){
            return done(null,user);
        }else{
            return done(null,false);
        }
    });

}))

module.exports = passport;