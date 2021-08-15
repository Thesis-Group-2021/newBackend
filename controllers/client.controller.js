const User = require('../models/user.model');
const Client = require('../models/client.model');
const Institute= require('../models/institute.model');


exports.createClientProfile = async (req,res) => {

   const username = req.params.username;
   const {name, firstname, lastname, email, gender, profilepicture, academiclevel, year} = req.body;

   if(!firstname){
      return res.status(401).json({
         status: 'fail',
         message:'please provide firstname'
      })

      }
   
   if(!lastname){
      return res.status(401).json({
         status: 'fail',
         message:'please provide lastname'
      })

      }
   

   if(!email){
      return res.status(401).json({
         status:'fail',
         message:'please provide email'
      })
   }

   if(!gender){
      return res.status(401).json({
         status:'fail',
         message:'please provide your gender'
      })
   }


   const user = await User.findOne({username});

   if(user.client){
      return res.status(400).json({
         status:'fail',
         message:'user exists'
      })
   }

   let newClient = new Client({firstname, lastname, email, gender, profilepicture, academiclevel, year});


   newClient.user = user._id;
   user.client = newClient._id;

   const institute = await Institute.findOne({_id});

   newClient.institute = institute.name;
   institute.client = newClient.name;


   await user.save();
   await newClient.save();
  
   res.status(200).json({
      status: 'success',
      message: 'Profile successfully created'  
   })
}

exports.getUserProfile = async (req, res) => {
   const users = await User.find({}).populate('institute');
   res.json({users})
}

exports.updateProfile = (req, res) => {
   const {firstname,lastname,gender,profilePicture,phone,email,academiclevel,year} = req.body;
   const id = req.params.id;
   const newData = {firstname,lastname,gender,profilePicture,phone,email,academiclevel,year}

    Client.updateOne({_id:id }, newData).then(
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
 





