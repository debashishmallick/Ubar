const dotenv = require('dotenv');
dotenv.config()
const cors = require('cors');   
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const connectDB = require('./db/db')
const userRoutes = require('./routes/userRoutes')


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.use('/user', userRoutes)




connectDB()
module.exports = app;