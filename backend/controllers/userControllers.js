const userModel= require('../models/userModel')
const userService= require('../services/userService')
const  {validationResult}= require('express-validator')


module.exports.registerUser= async(req,res,next)=>{

    const errors= validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const {fullName, email, password}= req.body

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