const Comments = require('../models/comments');

const Post = require('../models/posts');

module.exports.create = async function(req,res){
    try{
        const post = await Post.findById(req.body.post)
        if(post){
            Comments.create({
                content: req.body.content,
                user: req.user._id,
                post: req.body.post
            }, function(err,comment){
                if(err){
                    console.log("Error while inserting comments in database");
                    return res.redirect('back');
                }
                post.comments.push(comment);
                post.save();
                return res.redirect('/');
            })
        }
    }catch(err){
        console.log("Error ", err);
    }
}

module.exports.destroy = async function(req,res){
    try{
        const comment = await Comments.findById(req.params.id);
    
        if(req.user.id == comment.user){
            Post.findByIdAndUpdate(comment.post,{ $pull: {comments:req.params.id}},function(err,post){
                if(err){
                    console.log("Error while deleting comment from posts");
                    return res.redirect('back');
                }
            });
            comment.remove();
            return res.redirect('back');
        }
    }catch(err){
        console.log("Error ",err);
    }
}