const User = require('../models/user.model');
const Approver = require('../models/approver.model');

exports.createApproverProfile = async (req,res) => {

   const username = req.params.username;
   const {name, firstname, lastname, email, under,department, gender, profilepicture, academiclevel, year} = req.body;

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

   if(user.Approver){
      return res.status(400).json({
         status:'fail',
         message:'user exists'
      })
   }

   let newApprover = new Approver({name,firstname, lastname, email, gender, profilepicture,under, department, academiclevel, year});


   newApprover.user = user._id;
   user.Approver = newApprover._id;

   
   await user.save();
   await newApprover.save();

   const institute = await Institute.findOne({name});

   newApprover.institute = institute.name;
   institute.client = newApprover.name;


   await user.save();
   await newApprover.save();
  
   res.status(200).json({
      status: 'success',
      message: 'Profile successfully created'  
   })
}


exports.getApproverProfile = async (req, res) => {
   const users = await User.find({}).populate('approver');
   res.json({users})
}






