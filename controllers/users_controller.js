const User = require('../models/users');

module.exports.users = function(req,res){
    return res.render('user_profile',{
        title: "user profile"
    });
}

// Render sign in pages
module.exports.signIn = function(req,res){
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title: "user Sign in"
    })
}

// Render sign up pages
module.exports.signUp = function(req,res){
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title: "User Sign up"
    })
}

// Get the signup data
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirmPassword)
    {
        return res.redirect('back');
    }

    User.findOne({email:req.body.email},function(err,user){
        if(err)
        {
            console.log("Error in finding user while signing up");
            return;
        }
        if(!user)
        {
            User.create(req.body,function(err,user){
                if(err)
                {
                    console.log("Error in creating user while signing up");
                    return;
                }
                res.redirect('/users/sign-in');
            })
        }
        else
        {
            return res.redirect('back');
        }
    })
}

// Get the signin data
module.exports.createSession = function(req,res){
    return res.redirect('/users/profile');
}

module.exports.destroySession = function(req,res){
    req.logout(function(err){
        if(err){
            console.log("Error while destroying session");
            return res.redirect('/users/profile');
        }
    });
    return res.redirect('/');
}