const express = require('express');

const router = express.Router();
const {body}= require('express-validator')
const userController = require('../controllers/userControllers')
const authMiddleware = require('../middleware/authMiddleware')


router.post('/register',[
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('fullName.firstName').isLength({min:3}).withMessage('First name must be at least 3 characters'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters'),
],userController.registerUser)


router.post('/login',[
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters'),
],userController.loginUser)


router.get('/profile',authMiddleware.authUser, userController.getUserProfile)


router.get('/logout',authMiddleware.authUser, userController.logoutUser)

module.exports = router;