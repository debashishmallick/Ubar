const blackListTokenModel = require('../models/blackListTokenModel');
const captainModel = require('../models/captainModel');
const captainService = require('../services/captainService');
const { validationResult } = require('express-validator');



module.exports.registerCaptain = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const{ fullName,email,password,vehicle} = req.body;
    
    const isCaptainAlreadyRegistered  = await captainModel.findOne({email})
    if(isCaptainAlreadyRegistered){
        return res.status(400).json({message: 'Captain already registered'})
    }

    const hashPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
        firstName: fullName.firstName,
        lastName: fullName.lastName,
        email,
        password: hashPassword,
        color: vehicle.color,
        plateNumber: vehicle.plateNumber,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    });

    const token = await captain.generateAuthToken();

    if (!token) {
        return res.status(500).json({ message: 'Error generating token' });
    }
    res.status(201).json({ captain: captain, token: token });
}


module.exports.loginCaptain = async (req,res,next)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const captain = await captainModel.findOne({ email }).select('+password');
    if (!captain) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = await captain.generateAuthToken();

    res.cookie('token', token);
    res.status(200).json({ captain: captain, token: token });
}

module.exports.getCaptainProfile = async (req, res, next) => {
    res.status(200).json({captain: req.captain});
}

module.exports.logoutCaptain = async (req,res,)=>{
    res.clearCookie('token');

    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    await blackListTokenModel.create({ token });
    res.status(200).json({ message: 'Logged out successfully' });
}