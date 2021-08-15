const User = require('../models/user.model');
const Institute = require('../models/institute.model');

exports.createInstituteDetail = async (req, res) => {
   const username = req.params.username
   const {name, profilePicture, address, phone, email, under } = req.body;
   if (!address) {
      return res.status(401).json({
         status: 'fail',
         message: 'Please provide address'
      })
      // finish the rest of the validation
   }
   if (!phone) {
      return res.status(401).json({
         status: 'fail',
         message: 'please provide phone'
      })
   }

   if (!email) {
      return res.status(401).json({
         status:'fail',
         message:'please provide email'
      })
   }
   if (!under) {
      return res.status(401).json({
         status:'fail',
         message:'please provide Region/Under'
      })
   }

   const user = await User.findOne({username});

   if (user.institute) {
      return res.status(400).json({
         status: 'fail',
         message: 'Profile already existed'
      })
   }

   // 1- create new object
   let newInst = new Institute({name,profilePicture, address, phone, email, under});

   // 2- maintain 1-1 relationship
   newInst.user = user._id;
   user.institute = newInst._id;

   // 3- save each models
   await user.save();
   await newInst.save();
   // newInst.
   res.status(200).json({
      status: 'success',
      message: 'Profile successfully created'  
   })
}

exports.getUserProfile = async (req, res) => {
   const users = await User.find({}).populate('institute');
   res.json({users})
}


exports.getUser = (req, res) => {
   User.find() 
  .then(User => res.json(User))
  .catch(err => res.status(400).json('Error:' + err));
}

exports.createUser = async(req, res) => {
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
   let newUser = new User({username, password, passwordConfirm});

   await newUser.save().then((user) => {
    return res.status(400).json({
       status: 'succes',
       message: 'successfuly registerd'
  
      })
   })
}

 exports.getUserById = (req, res) => {
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

 exports.updateUser = (req, res) => {
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
 exports.updateProfile = (req, res) => {
   const {name,profilePicture,address,phone,email,under} = req.body;
   const id = req.params.id;
   const newData = {name,profilePicture,address,phone,email,under}

    Institute.updateOne({_id:id }, newData).then(
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
 

 exports.deleteUser = (req, res) => {
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
 exports.deleteProfile = (req, res) => {
   Institute.deleteOne({_id: req.params.id}).then(
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