const mongoose = require('mongoose')

const blackListTokenSchema = new mongoose.Schema({
    token:{
        type: String,
        required: true,
        unique: true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
        expires: 86400 // 2 hours in seconds
    }
})

module.exports = mongoose.model('BlackListToken', blackListTokenSchema)