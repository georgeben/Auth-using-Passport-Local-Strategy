const express = require('express');
const router =  express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const userModel = require('../models/User');

router.get('/', (req, res) =>{
    res.render("index", {
        messages: req.flash('signInMsg')
    });
});

router.post('/', passport.authenticate('local', {
    failureRedirect: '/',
    successRedirect:'/dashboard',
    failureFlash:true
    }
));

module.exports = router;