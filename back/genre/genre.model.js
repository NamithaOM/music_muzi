const mongoose = require('mongoose')

const genreSchema = new mongoose.Schema({
    genre:{
        type:String,
        required:true
    },
   
    createAt:{
        type:Date,
        default:Date.now()
    }

})

const genre= mongoose.model('genre', genreSchema);

const addSchema = new mongoose.Schema({
    image:{
        type:String,
        required:true
    },

})
const adds=mongoose.model('adds', addSchema);

const eventSchema = new mongoose.Schema({
    title:{type:String,required:true },
    image:{type:String,required:true },
    place:{type:String,required:true },
    datetime: { type: String, required: true }


})
const event=mongoose.model('event', eventSchema);

module.exports= { adds,genre, event };



