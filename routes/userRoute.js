const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

//const Client = require('../models/client.model');
const User = require('../models/user.model')
router.route('/user-list').get((req, res) => {
   Client.find( ) 
  .then(Client => res.json(Client))
  .catch(err => res.status(400).json('Error:' + err));
});

router.post('/register', (req, res, next) => {

  let newClient = new Client();

  

  newClient.password= bcrypt.hash(req.body.password, 12);

  
  

  newClient.save((err, Client) => {
    if(err) {
      return res.status(400).send({
        message : "error"
      });
    }
    else{
      return res.status(201).send({
        message: "admin added"
      });
    }
  });
});
router.route('/:_id').get((req, res) => {
  const _id = req.params._id;
  Client.findById(_id)
  .then(data => {
    if (!data)
    res.status(404).send({ message: "id not found" + _id});
    else res.send(data);
  })
  .catch(err => {
    res
    .status(500)
    .send({ message: "error retriving with id" + 
    _id});
  });
});
router.route('/:username').get((req, res) => {
  const username = req.params.username;
  Client.findOne({username})
  .then(data => {
    if (!data)
    res.status(404).send({ message: "id not found" + _id});
    else res.send(data);
  })
  .catch(err => {
    res
    .status(500)
    .send({ message: "error retriving with" + 
    username});
  });
});
router.route('/update:id').put((req, res, next) => {
  const clientupdate= new Client({
    _id: req.params.id,
    username: User.findOne({username}),
    password: User.findOne({password}),
  });
  Client.updateOne({_id: req.params.id}, clientupdate).then(
    () => {
      res.status(201).json({
        message: 'updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});
router.route('/delete:id').delete((req, res, next) => {
   Client.deleteOne({_id: req.params.id}).then(
     () => {
       res.status(200).json({
         message: 'Deleted!'
       });
     }
   ).catch(
     (error) => {
       res.status(400).json({
         error: error
       });
     }
   );
 });
module.exports = router;