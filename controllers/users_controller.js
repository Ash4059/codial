const User = require('../models/users');
const fs = require('fs');
const path = require('path');

module.exports.users = function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile',{
            title: "user profile",
            user_profile: user
        });
    })
}

// Render sign in pages
module.exports.signIn = function(req,res){
    if(req.isAuthenticated())
    {
        return res.redirect('/');
    }
    return res.render('user_sign_in',{
        title: "user Sign in"
    })
}

// Render sign up pages
module.exports.signUp = function(req,res){
    if(req.isAuthenticated())
    {
        return res.redirect('/');
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
            console.log(req.body);
            User.create(req.body,function(err,user){
                if(err)
                {
                    console.log("Error in creating user while signing up", err);
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
    req.flash('success','Logged in SuccessFully');
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.logout(function(err){
        if(err){
            console.log("Error while destroying session");
            return res.redirect('/');
        }
        req.flash('success','Logged out SuccessFully');
        return res.redirect('/');
    });
}

module.exports.update = async function(req,res){
    if(req.params.id == req.user.id){
        try {
            let user = await User.findByIdAndUpdate(req.params.id,req.body);
            User.uploadedAvatar(req,res,function(error){
                if(error){
                    console.log('**********Multer Error***********');
                }
                user.name = req.body.name;
                user.email = req.body.email;
                if(req.file){
                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }
                    // This is saving the path of the uploaded file into avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });
        } catch (error) {
            req.flash('error','Error while updating user');
            return res.redirect('back');
        }
    }else{
        req.flash('error','unauthorized');
        return res.status(401).send('unauthorized');
    }
}