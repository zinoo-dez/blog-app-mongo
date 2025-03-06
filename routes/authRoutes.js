const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


// prefix: /auth
router.get('/register', authController.getRegister); // get method
router.post('/register', authController.postRegister); // post method
router.get('/login', authController.getLogin); // get method
router.post('/login', authController.postLogin); // post method
router.get('/logout', authController.logout); // get method

module.exports = router;
