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
}