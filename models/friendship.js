const mongoose = require('mongoose');

const friendShipSchema = new mongoose.Schema({
    // The user who sent this request
    from_user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // The user who accept the request
    to_user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},{
    timestamps: true
})

const FriendShip = mongoose.model('Friendship',friendShipSchema);
module.exports = FriendShip;