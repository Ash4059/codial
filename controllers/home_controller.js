const Posts = require('../models/posts');
const User = require('../models/users');

module.exports.home = function(req,res){
    Posts.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate : {
            path: 'user'
        }
    })
    .exec(function(err, posts){
        User.find({},function(err,users){
            if(err){
                console.log('Error while fetching users');
                return res.redirect('back');
            }
            else
            {
                return res.render('home', {
                    title: "Codeial | Home",
                    posts:  posts,
                    all_users: users
                });
            }
        })
    })
}