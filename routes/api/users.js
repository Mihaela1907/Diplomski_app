const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const key = require('../../config/keys').secret;
const User = require('../../model/User');

/**
 * @route POST api/users/register
 * @desc Register the User
 * @access Public
 */
router.post('/register', (req, res) => {
    let {
        name,
        username,
        email,
        password,
        confirm_password,
        birthdate,
        residence,
        bloodgroup,
        phonenumber,
        sex,
        donationDate,
        role
    } = req.body
    if (password !== confirm_password) {
        return res.status(400).json({
            msg: "Lozinke se ne podudaraju!"
        });
    }
    // Check for the unique Username
    User.findOne({
        username: username
    }).then(user => {
        if (user) {
            return res.status(400).json({
                msg: "Korisničko ime se već koristi!"
            });
        }
    })
    // Check for the Unique Email
    User.findOne({
        email: email
    }).then(user => {
        if (user) {
            return res.status(400).json({
                msg: "E-mail se već koristi!"
            });
        }
    });
    // The data is valid and new we can register the user
    let newUser = new User({
        name,
        username,
        password,
        email,
        birthdate,
        residence,
        bloodgroup,
        phonenumber,
        sex,
        donationDate,
        role
    });
    // Hash the password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save().then(user => {
                return res.status(201).json({
                    success: true,
                    msg: "Hurry! User is now registered."
                });
            });
        });
    });
});

/**
 * @route POST api/users/login
 * @desc Signing in the User
 * @access Public
 */
router.post('/login', (req, res) => {
    User.findOne({
        username: req.body.username
    }).then(user => {
        if (!user) {
            return res.status(404).json({
                msg: "Korisničko ime nije pronađeno.",
                success: false
            });
        }
        // If there is user we are now going to compare the password
        bcrypt.compare(req.body.password, user.password).then(isMatch => {
            if (isMatch) {
                // User's password is correct and we need to send the JSON Token for that user
                const payload = {
                    _id: user._id,
                    username: user.username,
                    name: user.name,
                    email: user.email,
                    birthdate: user.birthdate,
                    residence: user.residence,
                    bloodgroup: user.bloodgroup,
                    phonenumber: user.phonenumber,
                    sex: user.sex,
                    donationDate: user.donationDate,
                    role: user.role
                }
                jwt.sign(payload, key, {
                    expiresIn: 604800
                }, (err, token) => {
                    res.status(200).json({
                        success: true,
                        token: `Bearer ${token}`,
                        user: user,
                        role: user.role,
                        msg: "Hurry! You are now logged in."
                    });
                })
            } else {
                return res.status(404).json({
                    msg: "Netočna lozinka!",
                    success: false
                });
            }
        })
    });
});

/**
 * @route GET api/users/profile
 * @desc Return the User's Data
 * @access Private
 */
router.get('/profile', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    return res.json({
        user: req.user,
        success: true
    });
});

/**
 * @route DELETE api/users
 * @desc DELETE user from database
 * @access Private
 */

router.delete('/:_id' , function (req , res) {
    User.findByIdAndRemove(req.params._id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found ",
        });
      }
        return res.json({
            users: users, 
            success: true
        });
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Could not delete user ",
      });
    });
   });

/**
 * @route GET api/users
 * @desc Get all users
 * @access Private
 */
router.get('/' , function (req , res) {
    User.find({}).then(function (users) {
        return res.json({
            users: users, 
            success: true
        });
    });
   });
/**
 * @route PUT api/users/profile
 * @desc Update the User's Data
 * @access Private
 */
router.put('/profile/:_id', passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {
    User.findById(req.params._id).then(function(user){
        if(!user){return res.sendStatus(401);}
        if(typeof req.body.username !== 'undefined'){
            user.username = req.body.username;
        }
        if(typeof req.body.name !== 'undefined'){
            user.name = req.body.name;
        }
        if(typeof req.body.birthdate !== 'undefined'){
            user.birthdate = req.body.birthdate;
        }
        if(typeof req.body.residence !== 'undefined'){
            user.residence = req.body.residence;
        }
        if(typeof req.body.bloodgroup !== 'undefined'){
            user.bloodgroup = req.body.bloodgroup;
        }
        if(typeof req.body.phonenumber !== 'undefined'){
            user.phonenumber = req.body.phonenumber;
        }
        if(typeof req.body.sex !== 'undefined'){
            user.sex = req.body.sex;
        }
        return user.save().then(function(){
            return res.json({
                user: user, 
                success: true
            });
        });
    }).catch(next);
});

/**
 * @route POST api/users/profile/donationDate
 * @desc Add donation
 * @access Private
 */

router.post('/profile/:_id/donationDate', passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {
    User.findById(req.params._id).then(function(user){
        if(!user){return res.sendStatus(401);}
        user.donationDate = req.body.dates;
        return user.save().then(function(){
            return res.json({
                user: user, 
                success: true
            });
        });
    }).catch(next);
});
module.exports = router;