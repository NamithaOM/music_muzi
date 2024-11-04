const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contact: { type: Number, required: true },
    category: { type: String, required: true },
    dob: { type: String },
    address: { type: String },
    image: { type: String, },

    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'Login'},
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const register = mongoose.model('Register', registerSchema);

const loginSchema =new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true    
    },
    userstatus: {
        type: Number,
        required: true
    },
    payment: { type: Number, required: true },
   
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const login = mongoose.model('Login', loginSchema);

const followartistSchema = new mongoose.Schema({
userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Login', required: true },
artistid: { type: mongoose.Schema.Types.ObjectId, ref: 'Register', required: true },
username:{type:String},
status:{type:Number}
})

const followList = mongoose.model('followList', followartistSchema);

module.exports = {register ,login, followList};
