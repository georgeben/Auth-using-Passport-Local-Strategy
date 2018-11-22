const express = require('express');
const router =  express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const userModel = require('../models/User');

router.get('/', (req, res) =>{
    res.render("index");
});

router.post('/', passport.authenticate('local', {
    failureRedirect: '/register',
    successRedirect:'/dashboard'
     }
));

module.exports = router;