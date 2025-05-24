const captainModel = require('../models/captainModel');


module.exports.createCaptain = async ({firstName,lastName,email,password,color,plateNumber,capacity,vehicleType}) => {

    if (!firstName  || !email || !password || !color || !plateNumber || !capacity || !vehicleType) {
        throw new Error('All fields are required');
    }

    const captain = await captainModel.create({
        fullName: {
            firstName,
            lastName
        },
        email,
        password,
        vehicle: {
            color,
            plateNumber,
            capacity,
            vehicleType
        }
    });

    return captain;
}
