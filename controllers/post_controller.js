const Post = require('../models/posts');
const Comment = require('../models/comments');

module.exports.create = function(req,res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    },function(err,post){
        if(err){
            req.flash('error','Error in creating a post');
            return res.redirect('back');;
        }
        req.flash('success','Post published');
        return res.redirect('back');
    })
}

module.exports.destroy = async function(req,res){
    try {
        const post = await Post.findById(req.params.id);
        // .id means converting the objects into string id
        if(post.user == req.user.id){
            post.remove();
            Comment.deleteMany({post:req.params.id},function(err){
                if(err){
                    req.flash('error','Error while deleting comments');
                }
                else
                {
                    req.flash('success','Post deleted successfully');
                }
                return res.redirect('back');
            })
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