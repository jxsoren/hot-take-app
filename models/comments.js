const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true
    },
    issue: {
        type: Schema.Types.ObjectId,
        required: true
    }
})

module.exports = mongoose.model("Comment", commentSchema)