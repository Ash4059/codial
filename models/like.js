const mongoose = require('mongoose');

const likeSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // this defines the object id of liked field
    likeable:{
        type: mongoose.Schema.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    // This field is used for defining the type of liked object since this is dynamic reference
    onModel: {
        type: String,
        required: true,
        enum: ['Post','Comment']
    }
},{
    timestamps: true
});

const Like = mongoose.model('Like',likeSchema);
module.exports = Like;