const mongoose = require("mongoose");
const reviewSchema =mongoose.Schema({
    Comment:{
        type:String
    },
    rating:{
        type:Number,
        max:5,
        min:1
    },
    createdAt: {
        type:Date,
        default:Date.now()
    }
})
const review = mongoose.model("review",reviewSchema);
module.exports = review;