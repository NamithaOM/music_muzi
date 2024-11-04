const mongoose = require('mongoose');

const musicSchema =new mongoose.Schema({
  music: {
    type: String,
    required: true
  },
  musicname: {
    type: String,
    required: true
  },
  artistId: {
    type: String
  },
  genre:{
    type:String
  },
  priceType: {
    type: String,
    required: true
  },
  createAt: {
    type: Date,
    default: Date.now
  }
});

const music = mongoose.model('music', musicSchema);

const Playback = mongoose.model('Playback', new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'login' },
  musicId: { type: mongoose.Schema.Types.ObjectId, ref: 'music' },
  playedAt: { type: Date, default: Date.now }
}));

module.exports = { music,Playback };
