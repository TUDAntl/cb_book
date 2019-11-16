const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({

    name: {
        type:String,
        required: true
        },
    size: {
        type:Number,
        required: true
        }
});


module.exports = mongoose.model('Tests', PostSchema);