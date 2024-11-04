const Razorpay = require('razorpay');
const crypto = require('crypto');
const models = require('./user.model');
const userModel = models.Order;
const favoriteModel = models.favorite;
const shareModel = models.share;
const commentModel = models.comment;
const friendsModel = models.friends;
const model = require('../Registration/register.model');
const { log } = require('console');
const loginModel = model.login;

// Initialize Razorpay with your API key and secret
const razorpay = new Razorpay({
  key_id: 'rzp_test_4Ex6Tyjkp79GFy',
  key_secret: 'lVGcQB0HSAttEhr7mq4AbM7Z',
});

exports.orders = async (req, res) => {
  try {
    const options = {
      amount: req.body.amount * 100, // Amount in paise (100 paise = 1 INR)
      currency: 'INR',
      receipt: crypto.randomBytes(10).toString('hex'),
    };

    razorpay.orders.create(options, (error, order) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong!" });
      }
      res.status(200).json({ data: order });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error!" });
  }
};

exports.verify = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, id } = req.body;

  // Use the correct secret key from Razorpay instance
  const generatedSignature = crypto.createHmac('sha256', razorpay.key_secret)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest('hex');

  if (generatedSignature === razorpay_signature) {
    try {
      // Call the updatePaymentStatus function to update the payment field
      const updatedUser = await loginModel.findByIdAndUpdate(
        id, 
        { payment: 1 }, 
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json({ message: "Payment verified and status updated successfully" });
    } catch (error) {
      console.error("Error updating payment status:", error);
      res.status(500).json({ message: "Error updating payment status" });
    }
  } else {
    res.status(400).json({ message: "Invalid signature, payment verification failed" });
  }
};


exports.updatePaymentStatus = async (req, res) => {
  try {
    const { id } = req.body;
    
    const updatedpayment = await loginModel.findByIdAndUpdate(
      id, 
      { payment: 1 }, 
      { new: true }  // Return the updated document
    );
    if (!updatedpayment) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(updatedpayment);
  } catch (error) {
    console.error("Error updating:", error);
    res.status(500).json({ error: "Error on update" });
  }
};



exports.favoriteInsert = async (req, res) => {
  // const user = await loginModel.create(loginParams); 

  const fav = await favoriteModel.create(req.body);
  // console.log(fav);
  res.json("success");
};

exports.viewFavorites = async (req, res) => {
  try {
    const viewFavorites = await favoriteModel.find({ userId: req.body.id }).populate('musicid').populate('artistid');
    res.json(viewFavorites);
    // console.log(viewFavorites);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addShare = async (req, res) => {
  try {
    const { musicDetails, selectedUsers } = req.body;

    const newShare = await shareModel.create({
      musicid: musicDetails.musicid,
      artistid: musicDetails.artistid,
      music: musicDetails.music,
      musicname: musicDetails.musicname,
      userId: musicDetails.userId,
      customeremail: musicDetails.customeremail,
      customername: musicDetails.customername,
      selectedUsers: selectedUsers
    });

    // console.log('Share added:', newShare);
    res.json({ message: 'Share added successfully', share: newShare });
  } catch (error) {
    console.error('Error adding share:', error);
    res.status(500).json({ error: 'Failed to add share' });
  }
};



exports.shareList = async (req, res) => {
  const { id } = req.body;

  try {

    const viewShared = await shareModel.find({

      $or: [{ userId: id }, { selectedUsers: id }]
    }

    )

    res.json(viewShared);
  } catch (error) {
    console.error('Error fetching shared tracks:', error);
    res.status(500).json({ error: 'Failed to fetch shared tracks' });
  }
};

exports.addComment = async (req, res) => {
  try {
      const comments = await commentModel.create(req.body.musicDetails);
      res.json(comments);
  } catch (error) {
      res.status(500).json({ error: 'Failed to add comment' });
  }
};

exports.viewComment = async (req, res) => {
  try {
      const { artistid } = req.body;

      if (!artistid) {
          return res.status(400).json({ error: 'artistId is required' });
      }

      // console.log('Artist ID:', artistid);

      const comments = await commentModel.find({ artistid: artistid })
          .populate('musicid', 'musicname')
          .populate('userId', 'username');

      if (!comments.length) {
          console.log('No comments found for this artist');
      } else {
          console.log('Comments found:', comments);
      }

      res.json(comments);
  } catch (error) {
      console.error('Error fetching comments:', error);
      res.status(500).json({ error: 'Failed to fetch comments' });
  }
};



exports.addFriends = async (req, res) => {
  try {
    const { userId, friendid } = req.body;

    // Check if the friend relationship already exists
    const existingFriend = await friendsModel.findOne({ userId, friendid });
    if (existingFriend) {
      return res.status(400).json({ error: 'Friendship already exists' });
    }

    const newFriend = new friendsModel({ userId, friendid });
    await newFriend.save();
    res.json('Success');
  } catch (error) {
    console.error('Error adding friend:', error);
    res.status(500).json({ error: 'Failed to add friend' });
  }
};

// Controller
exports.viewFriends = async (req, res) => {
  const { userid } = req.body;
  if (!userid) {
    return res.status(400).json({ error: "User ID is required" });
  }
  try {
    // Query friends based on userId or friendId
    const friends = await friendsModel.find({ $or: [{ userId: userid }, { friendid: userid }] }).populate('friendid'); // Populate friendid with user details
    res.json(friends);
  } catch (error) {
    console.error('Error fetching friends:', error);
    res.status(500).json({ error: 'Failed to fetch friends' });
  }
};
