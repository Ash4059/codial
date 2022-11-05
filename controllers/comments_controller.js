const Comments = require('../models/comments');

const Post = require('../models/posts');

module.exports.create = function(req,res){
    Post.findById(req.body.post,function(err,post){
        if(post){
            Comments.create({
                content: req.body.content,
                user: req.user._id,
                post: req.body.post
            }, function(err,comment){
                if(err){
                    console.log("Error while inserting comments in database");
                    return;
                }
                post.comments.push(comment);
                post.save();
                return res.redirect('/');
            })
        }
    })
}