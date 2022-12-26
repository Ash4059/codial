const Like = require('../models/like');
const Comment = require('../models/comments');
const Post = require('../models/posts');

module.exports.toggleLike = async function(req,res){
    try{
        // Like/toggle/?id="abcd"&type=Post
        let likeable;
        let deleted = false;
        if(req.query.type == 'Post'){
            likeable = await Post.findById(req.query.id).populate('likes');
        }else{
            likeable = await Comment.findById(req.query.id).populate('likes');
        }
        // Check if a like is already exist
        let existingLike = await Like.findOne({
            likeable: req.query.id,
            onModel: req.query.type,
            user: req.user._id
        })
        // If existing like then delete
        if(existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save(),
            existingLike.remove()
            deleted = true;
        }else{
            // Else like the object
            let newLike = await Like.create({
                user: req.user._id,
                likeable: req.query.id,
                onModel: req.query.type
            })
            likeable.likes.push(newLike._id);
            likeable.save();
        }
        // console.log(likeable);
        return res.status(200).json({
            message: "Request successfull",
            data: {
                deleted: deleted
            }
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message:'Internal server Error'
        })
    }
}