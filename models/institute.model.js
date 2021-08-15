const mongoose = require("mongoose")

const Schema = mongoose.Schema;

require('mongoose-type-email');

const instituteSchema = new Schema ({
    name:{
       type:String
    },
    profilepicture:{
        type:String
    },
    address:{
        type:String
    },
    phone:{
        type: String
    },
  
    email: mongoose.SchemaTypes.Email,
    under :{
        type:String
    },
    date:{
        type: Date,
        default: Date.now()
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    }

}, {
    timestamps: true
})

const Institute = mongoose.model('Institute', instituteSchema)
module.exports = Institute
