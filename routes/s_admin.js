const express = require('express');
const router = express.Router();

const Super_admin = require('../models/Super_admin');
router.route('/admin-list').get((req, res) => {
  Super_admin.find( ) 
  .then(Super_admin => res.json(Super_admin))
  .catch(err => res.status(400).json('Error:' + err));
});

router.post('/register', (req, res, next) => {

  let newSAdmin = new Super_admin();

  newSAdmin.username = req.body.username,

  newSAdmin.password= req.body.password
  newSAdmin.setPassword(req.body.password);

  newSAdmin.save((err, Super_admin) => {
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
  Super_admin.findById(_id)
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
router.route('/update:id').put((req, res, next) => {
  const s_adminupdate= new Super_admin({
    _id: req.params.id,
    username: req.body.username,
    password: req.body.password,
  });
  Super_admin.updateOne({_id: req.params.id}, s_adminupdate).then(
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
module.exports = router;