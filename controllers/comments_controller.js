const Comments = require('../models/comments');

const Post = require('../models/posts');

const commentMailer = require('../mailers/comments_mailer');
module.exports.create = async function(req,res){
    try{
        const post = await Post.findById(req.body.post)
        if(post){
            let comment = await Comments.create({
                content: req.body.content,
                user: req.user._id,
                post: req.body.post
            })
            post.comments.push(comment);
            post.save();

            comment = await comment.populate('user', 'name email');
            commentMailer.newComments(comment);

            if(req.xhr){
                return res.status(200).json({
                    data:{
                        comment: comment
                    },
                    message: "Comments added successfully"
                });
            }
            return res.redirect('/');
        }
    }catch(err){
        console.log("Error ", err);
    }
}

module.exports.destroy = async function(req,res){
    try{
        const comment = await Comments.findById(req.params.id);
        await Like.deleteMany({likeable: comment, onModel:'Comment'});
    
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