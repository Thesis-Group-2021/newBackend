const User = require('../models/user.model');

exports.getAllAdmins = (req, res) => {
   User.find() 
  .then(User => res.json(User))
  .catch(err => res.status(400).json('Error:' + err));
}

exports.createAdmin = async(req,res) => {
   const {username, password, passwordConfirm} = req.body;

   if (!password || !passwordConfirm) {
     res.status(400).json({
       status: 'fail',
       message: 'Provide password'
     })
   }
   

   if (password !== passwordConfirm) {
      res.status(400).json({
         status: 'fail',
         message: "Password should match"
      })
   }

   const user = await User.findOne({username});
   if (user) {
      return res.status(400).json({
         status: 'fail',
         message: 'User already registered'
      })
   }
   let newUser = new User({username, password, passwordConfirm, role});

   await newUser.save().then((user) => {

    return res.status(200).json({
      status: 'succes',
      message: 'registration successful'

    })
  
   })
}

 exports.getAdminById = (req, res) => {
   const _id = req.params._id;
   User.findById(_id)
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
 }

 exports.updateAdmin = (req, res) => {
   const {password, username} = req.body;
   const id = req.params.id;
   const newData = {password, username}

    User.updateOne({_id:id }, newData).then(
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
 }
 
 exports.deleteAdmin = (req, res) => {
   User.deleteOne({_id: req.params.id}).then(
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
 }