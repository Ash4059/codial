const Post = require('../models/posts');
const Comment = require('../models/comments');
const Like = require('../models/like');

module.exports.create = async function(req,res){
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        if(req.xhr){
            post = await post.populate('user', 'name email');
            return res.status(200).json({
                data:{
                    post: post
                },
                message: "Post created!"
            })
        }
        req.flash('success','Post published');
        return res.redirect('back');
    } catch (error) {
        req.flash('error','Error in creating a post');
        return res.redirect('back');
    }
}

module.exports.destroy = async function(req,res){
    try {
        const post = await Post.findById(req.params.id);
        await Like.deleteMany({likeable: post, onModel:'Post'});
        await Like.deleteMany({_id:{$in: post.comments}});
        // .id means converting the objects into string id
        if(post.user == req.user.id){
            await 
            await Comment.deleteMany({post: req.params.id});
            await post.remove();
            if(req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post deleted successfully!"
                })
            }
            return res.redirect('back');
        }
        else
        {
            req.flash('success','You are not authorized to delete');
            return res.redirect('back');
        }
    } catch (error) {
        req.flash("error ",error);
    }
}