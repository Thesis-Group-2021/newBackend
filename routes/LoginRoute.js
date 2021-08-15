const express = require('express'); 
const router = express.Router(); 

const User = require('../models/Client');
const Admin = require('../models/Institute');
const Approver = require('../models/Approver');



router.post('/login', (req, res) => { 

   // Find user with requested email 
   
   User.findOne({ username : req.body.username }, function(err, user) { 
       if (user === null) { 
           return res.status(400).send({ 
               message : "User not found."
           }); 
       } 
       else { 
           if (user.validPassword(req.body.password)) { 
               return res.status(201).send({ 
                   message : "User Logged In", 
               }) 
           } 
           else { 
               return res.status(400).send({ 
                   message : "Wrong Password"
               }); 
           } 
       } 
   }); 
}); 