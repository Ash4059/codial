const Posts = require('../models/posts');
const User = require('../models/users');
const Like = require('../models/like');
const { use } = require('passport');

module.exports.home = async function(req,res){
    try{
        const posts = await Posts.find({})
        .sort({'createdAt':-1})
        .populate('user')
        .populate({
            path: 'comments',
            populate : {
                path: 'user'
            },
            populate : {
                path: 'likes'
            }
        }).populate('likes');
    
        let users = await User.find({});
        let userFriends = [];
        let user;
        if(req.user){
            user = await User.findById(req.user._id)
            .populate('freindships');
            for(let friend of user.freindships){
                let userFriend;
                userFriend = await User.findById(friend.from_user);
                if(userFriend.id === req.user.id)
                    userFriend = await User.findById(friend.to_user);
                userFriends.push(userFriend);
            }
        }
        return res.render('home', {
            title: "Codeial | Home",
            posts:  posts,
            all_users: users,
            userFriends: userFriends
        });
    }
    catch(err){
        req.flash("error", err);
        return res.redirect('back');
    }
}