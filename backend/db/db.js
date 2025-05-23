// const mongoose = require('mongoose')
const mongoose = require('mongoose')




function connectDB() {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected')
    })
    .catch((err) => {
        console.log('MongoDB not connected')
    })
}

module.exports = connectDB;