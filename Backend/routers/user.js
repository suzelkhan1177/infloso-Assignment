const express = require('express');
const { signup, login , forgotPassword , resetPassword, welcome} = require('../controllers/userController');
const router = express.Router();
const auth = require("../config/auth");

router.post('/signup', signup);
router.post('/login', login);
router.get('/forgot_password/:email', forgotPassword);
router.post('/resetPassword/:token', resetPassword);
router.get('/welcome', auth , welcome);

module.exports = router;
