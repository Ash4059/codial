module.exports.index = function(req,res){
    return res.status(200).json({
        message:"List of posts",
        post: []
    });
}