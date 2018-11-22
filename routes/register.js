const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = mongoose.model('Users');

const saltRounds = 10;

router.get('/', (req, res) =>{
    res.render("register", {
        message: req.flash('signUpMsg')
    });
})

router.post('/', (req, res) =>{
    console.log(req.body.username, req.body.email);
    User.find({username: req.body.username}, (err, match) =>{
        if(err){
            console.log("Error looking up database");
            req.flash("signUpMsg", "A error occured, try again later");
            res.redirect('/register');
        }

        if(match){
            req.flash('signUpMsg', "Sorry, that name is not available");
            res.redirect('/register')
        }
        
    })
    bcrypt.hash(req.body.password, saltRounds, (err, hash) =>{
        if(err){
            console.log("Failed to hash");
            res.status(500).send("Something wen't wrong");
        }else{
            let user = new User({
                username:req.body.username,
                email:req.body.email,
                password:hash
            });

            user.save()
            .then(data => {
                if(data) console.log("Saved successfully");
                res.redirect('/');
            })
            .catch(err => {
                console.log("Err while saving");
                res.status(500).send("Something wen't wrong");
            })
        }
    } )
});

module.exports = router;