const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('connect-ensure-login');

router.get('/dashboard',ensureLoggedIn.ensureLoggedIn('/'), (req, res) =>{
    console.log(req.user);
    res.render("dashboard", {agent:req.user.username});
})

module.exports = router;