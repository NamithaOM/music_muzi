const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'INR'
  },
  receipt: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model('Order', orderSchema);


const favoriteSchema = new mongoose.Schema({


musicid: { type: mongoose.Schema.Types.ObjectId, ref: 'music'},
artistid: { type: mongoose.Schema.Types.ObjectId, ref: 'Login'},
music:  {
  type: String,
  required: true
},
musicname:  {
  type: String,
  required: true
},
userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Login'},
customeremail:  {
  type: String,
  required: true
},

customername:
  {
    type: String,
    required: true
  },

})

const favorite = mongoose.model('favorite', favoriteSchema);

const shareSchema = new mongoose.Schema({
  musicid: { type: mongoose.Schema.Types.ObjectId, ref: 'music', required: true },
  artistid: { type: mongoose.Schema.Types.ObjectId, ref: 'Login', required: true },
  music: { type: String, required: true },
  musicname: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Login', required: true },
  customeremail: { type: String, required: true },
  customername: { type: String, required: true },
  selectedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Login', required: true }]
});
const share = mongoose.model('share', shareSchema);


const commentSchema = new mongoose.Schema({
  musicid: { type: mongoose.Schema.Types.ObjectId, ref: 'music', required: true },
  artistid: { type: mongoose.Schema.Types.ObjectId, ref: 'Login', required: true },
  music: { type: String, required: true },
  musicname: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Login', required: true },
  customeremail: { type: String, required: true },
  customername: { type: String, required: true },
  comment: { type: String, required: true },
});

const comment = mongoose.model('comment', commentSchema);
  
const friendSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Login', required: true },
friendid: { type: mongoose.Schema.Types.ObjectId, ref: 'Register', required: true },
username:{type:String}
});

const friends = mongoose.model('friends', friendSchema);
  
module.exports = {Order,favorite,share,comment,friends};
