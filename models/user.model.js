const mongoose = require("mongoose")
const bcrypt = require('bcryptjs')


const Schema = mongoose.Schema

const userSchema = new Schema ({
   
    username:{
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true

    },
    passwordConfirm: {
        type: String,
        require: true
    },

    role: {
        type: String,
        default: "User",
        enum: ["User", "Admin", "Superadmin","Approver"]
    },

    institute: {
        type: mongoose.Schema.Types.ObjectId, ref: "Institute"
    },

    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client"
    },

    approver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Approver"
    }


}, {
    timestamps: true
})


userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
})

const User = mongoose.model('User', userSchema)
module.exports = User
