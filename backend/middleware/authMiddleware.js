const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const blackListTokenSchema = require('../models/blackListTokenModel')
const captainModel = require('../models/captainModel')


module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    // Verify the token
    const isBlacklisted = await blackListTokenSchema.findOne({ token: token })
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    try {
        const decoded = await jwt.verify(token,process.env.JWT_SECRET)

        const user = await userModel.findById(decoded._id)
        req.user = user

        return next()
        
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' })
        
    }
}

module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    

    // Verify the token
    const isBlacklisted = await blackListTokenSchema.findOne({ token: token })
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    try {
        const decoded =  jwt.verify(token, process.env.JWT_SECRET)
        

        const captain = await captainModel.findById(decoded._id)
        
        req.captain = captain
        if (!captain) {
            return res.status(401).json({ message: 'Unauthorized' })
        }
        return next()
        
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' })
        
    }
}