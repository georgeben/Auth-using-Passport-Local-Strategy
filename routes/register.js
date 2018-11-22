const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = mongoose.model('Users');

const saltRounds = 10;

router.get('/', (req, res) =>{
    res.render("register");
})

router.post('/', (req, res) =>{
    console.log(req.body.username, req.body.email);
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
                if(data) console.log("Sved successfully");
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