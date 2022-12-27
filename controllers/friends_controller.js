const User = require('../models/users');
const FriendShip = require('../models/friendship');

module.exports.toggleFriends = async function(req,res){
    console.log(req);
    const reciever = User.findById(req.params.id,function(err,user){
        if(err){
            console.log("Error in finding user",err);
            return;
        }
        console.log(user);
        return res.redirect('back');
    })
};