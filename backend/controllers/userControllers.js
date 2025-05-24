const userModel= require('../models/userModel')
const userService= require('../services/userService')
const  {validationResult}= require('express-validator')
const blackListTokenModel = require('../models/blackListTokenModel')


module.exports.registerUser= async(req,res,next)=>{

    const errors= validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const {fullName, email, password}= req.body

    const isUserAlreadyRegistered = await userModel.findOne({email})
    if(isUserAlreadyRegistered){
        return res.status(400).json({message: 'User already registered'})
    }

    const hashPassword = await userModel.hashPassword(password)

    const user = await userService.createUser({
        firstName:fullName.firstName,
        lastName:fullName.lastName,
        email,
        password: hashPassword
    })

    const token  = await user.generateAuthToken()
    console.log(token)
    if(!token){
        return res.status(500).json({message: 'Error generating token'})

    }
    res.status(201).json({user:user,token:token})

}


module.exports.loginUser = async(req,res,next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {email, password} = req.body
    const user = await userModel.findOne({email}).select('+password')
    if(!user){
        return res.status(401).json({message: 'Invalid email or password'})
    }

    const isMatch = await user.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({message: 'Invalid email or password'})
    }
    const token = await user.generateAuthToken()

    res.cookie('token', token)

    res.status(200).json({user:user, token:token})
}

module.exports.getUserProfile = async(req,res,next)=>{
   
    res.status(200).json(req.user)
}

module.exports.logoutUser = async(req,res,next)=>{
    res.clearCookie('token')

    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]

    await blackListTokenModel.create({token})

    res.status(200).json({message: 'Logged out successfully'})
}