const Posts = require('../../../models/posts');
const Comment = require('../../../models/comments');
module.exports.index = async function(req,res){
    const posts = await Posts.find({})
        .sort({'createdAt':-1})
        .populate('user')
        .populate({
            path: 'comments',
            populate : {
                path: 'user'
            }
        })
    return res.status(200).json({
        message: "Lists of posts",
        posts: posts
    })
}

module.exports.destroy = async function(req,res){
    try {
        const post = await Posts.findById(req.params.id);
        // id means converting the objects into string id
        await Comment.deleteMany({post: req.params.id});
            if(post.user == req.user.id){
                await post.remove();
                return res.status(200).json({
                    message:"Post and associated comments deleted successfully"
                });
            }else{
                return res.status(401).json({
                    message:"You can't delete this post!"
                });
            }
        } catch (error) {
            return res.status(500).json({
                message:"Internal server error"
            })
        }
}