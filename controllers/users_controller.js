const User = require('../models/users');

module.exports.users = function(req,res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id,function(err,user){
            if(err){
                console.log("Error while fetching user data");
                return;
            }
            if(user){
                return res.render('user_profile',{
                    title: "user profile",
                    user:user
                });
            }
            else{
                return res.redirect('back');
            }
        })
    }
    else{
        return res.redirect('/users/sign-in')
    }
}

// Render sign in pages
module.exports.signIn = function(req,res){
    return res.render('user_sign_in',{
        title: "user Sign in"
    })
}

// Render sign up pages
module.exports.signUp = function(req,res){
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
            User.create({
                name:req.body.name,
                email:req.body.emailId,
                password:req.body.password
            },function(err,user){
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
    // Find the user
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log("Error in finding user while signing in");
            return;
        }

        // Handle user found
        if(user){

            // Handle user password which don't match
            if(req.body.password != user.password){
                return res.redirect('back');
            }

            // Handle session creation
            res.cookie('user_id',user.id)
            return res.redirect('/users/profile');
        }
        else{
            return res.redirect('back');
        }
    })
}

// Signout page
module.exports.SignOut = async function(req,res){
    cookie = req.cookies;
    await destroyCookie(cookie,res);
    return res.redirect('/users/sign-in');
}

function destroyCookie(cookies,res){
    for (let prop in cookies) {
        if (!cookies.hasOwnProperty(prop)) {
            continue;
        }    
        res.cookie(prop, '', {expires: new Date(0)});
    }
}