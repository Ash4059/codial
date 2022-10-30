const passport = require('passport');

const User = require('../models/users');

const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
    usernameField: 'email'
    },function(email,password,done){
        // Find a user and establish the identity
        User.findOne({email:email},function(err,user){
            if(err){
                console.log("Error while establishing the identity");
                return done(err);
            }
            if(!user || user.password != password){
                console.log("Invalid Username or password");
                return done(null,false);
            }
            return done(null,user);
        })
    }
))

// Serialize the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
})

// Deserializing the user from the key in cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log("Error in finding user via passport");
            return done(err);
        }
        if(!user){
            return done(null,false);
        }
        return done(null,user);
    })
})

passport.checkAuthentication = function(req,res,next){
    // If user is sign then passed on the request to next function(Controller's action)
    if(req.isAuthenticated()){
        return next();
    }
    // If the user is not authenticated then redrect to sign in pages
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        // Request user contains the current signed in user from the session cookies and we are sending this to locals for views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;