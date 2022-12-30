const User = require('../models/users');
const FriendShip = require('../models/friendship');

module.exports.toggleFriends = async function(req,res){
    try {
        let reciever = await User.findById(req.params.id);
        const sender = await User.findById(req.user);
        let friendStatus = false;
        // Check if existing friends
        let existingFriend = await FriendShip.findOne({
            from_user: sender._id,
            to_user: reciever._id
        });
        if(existingFriend == null){
            existingFriend = await FriendShip.findOne({
                to_user: sender._id,
                from_user: reciever._id
            });
        }
        if(existingFriend){
            sender.freindships.pull(existingFriend._id);
            reciever.freindships.pull(existingFriend._id);
            existingFriend.remove();
        }
        else{
            let freindship = await FriendShip.create({
                from_user: req.user,
                to_user: req.params.id
            })
            sender.freindships.push(freindship);
            reciever.freindships.push(freindship); 
            friendStatus = true; 
        }
        sender.save();
        reciever.save();
        return res.status(200).json({
            message: "Request successfull",
            data: {
                isFriend: friendStatus,
                friend: reciever
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:'Internal server Error'
        })
    }
    
};