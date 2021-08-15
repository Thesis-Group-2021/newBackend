const mongoose = require("mongoose")

const Schema = mongoose.Schema;


require('mongoose-type-email');

const clientSchema = new Schema ({

    firstname:{
        type: String
    },
    lastname:{
        type:String

    },
    gender:{
        type: String

    },
   
    institute:{
       type: mongoose.Schema.Types.ObjectId,
       ref:'Institute'

    },
    profilepicture:{
        type: String
    },
    email:
         mongoose.SchemaTypes.Email,
    academiclevel :{
        type:String
    },
    phone:{
        type:String
    },
    year :{
        type:Date
    },
    date:{
        type: Date,
        default: Date.now()
    },
    user:{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
},
 {
    timestamps: true
});



const Client = mongoose.model('Client', clientSchema)
module.exports = Client
