const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leaderSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    profile: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

var leaders = mongoose.model('leader', leaderSchema)
module.exports = leaders;