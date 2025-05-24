const dotenv = require('dotenv');
dotenv.config()
const cors = require('cors');   
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const connectDB = require('./db/db')
const userRoutes = require('./routes/userRoutes')
const captainRoutes = require('./routes/captainRoutes')


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.use('/user', userRoutes)
app.use('/captain', captainRoutes)




connectDB()
module.exports = app;