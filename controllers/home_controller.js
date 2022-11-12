const Posts = require('../models/posts');
const User = require('../models/users');

module.exports.home = async function(req,res){
    try{
        const posts = await Posts.find({})
        .sort({'createdAt':-1})
        .populate('user')
        .populate({
            path: 'comments',
            populate : {
                path: 'user'
            }
        })
    
        let users = await User.find({});
    
        return res.render('home', {
            title: "Codeial | Home",
            posts:  posts,
            all_users: users
        });
    }
    catch(err){
        req.flash("error", err);
        return res.redirect('back');
    }
}