const mongoose = require("mongoose");
const reviewSchema =mongoose.Schema({
    comment:{
        type:String
    },
    rating:[{
        type:Number,
        max:5,
        min:1
    }],
    createdAt: {
        type:Date,
        default:Date.now()
    }
})
const review = mongoose.model("reviews",reviewSchema);
module.exports = review;