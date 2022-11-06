const Post = require('../models/posts');
const Comment = require('../models/comments');

module.exports.create = function(req,res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    },function(err,post){
        if(err){
            console.log("Error in creating a post");
            return;
        }
        return res.redirect('back');
    })
}

module.exports.destroy = function(req,res){
    Post.findById(req.params.id,function(err,post){
        if(err){
            console.log("Error while deleting posts");
            return;
        }
        // .id means converting the objects into string id
        if(post.user == req.user.id){
            post.remove();
            Comment.deleteMany({post:req.params.id},function(err){
                console.log("Error while deleting comments");
                return res.redirect('back');
            })
        }
        else
        {
            return res.redirect('back');
        }
    })
}