const { log } = require('console');
const models = require('./register.model');
const path = require('path')
const registerModel = models.register;
const loginModel = models.login;
const followModel = models.followList
exports.register = async (req, res) => {
    try {
        const loginParams = {
            email: req.body.email,
            password: req.body.password,
            userstatus: req.body.userstatus,
            payment:req.body.payment,

        };
        const user = await loginModel.create(loginParams); 
        const registerParams = {
            name: req.body.name,
           category: req.body.category,
           contact:req.body.contact,
            userid: user._id ,

        };
        await registerModel.create(registerParams);
        res.json('success');
    } catch (error) {  
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.logIn = async (req, res) => {
    try {
        const param = {
            email: req.body.email,
            password: req.body.password
        };

        const user = await loginModel.findOne({ email: param.email });

        if (user && user.password === param.password) {
            const company = await registerModel.findOne({ userid: user._id });

            let userdata = {
                ...user.toObject(),
                company: company ? company.toObject() : null
            };

            req.session.user = userdata;
            res.json(userdata);
        } else {
            res.status(401).json('Invalid' );
        }
    } catch (error) {
        console.error('Invalid');
        res.status(500).json( 'Invalid' );
    }
};

exports.viewArtist = async (req, res) => {
    try {
        const artists = await loginModel.find({ userstatus: 5 }).select('_id');
        const userIds = artists.map(user => user._id);
        const artistList = await registerModel.find({ userid: { $in: userIds } }).populate('userid');
        res.json({ artistList });
    } catch (error) {
        console.error('Error during fetching:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteArtist = async (req, res) => {
    try {
        const artist = await registerModel.findById(req.body.id);
        if (!artist) {
            return res.status(404).json({ error: 'Artist not found' });
        }
        
        const userId = artist.userid;
        await loginModel.findByIdAndDelete(userId);
        await registerModel.findByIdAndDelete(req.body.id);

        res.json({ success: true, message: 'Artist deleted successfully' });
    } catch (error) {
        console.error("Error deleting artist:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.editArtist = async (req, res) => {
    try {
        const { id, userstatus } = req.body;
        const updatedArtist = await loginModel.findByIdAndUpdate(
            id, 
            { userstatus }, 
            { new: true }  // Return the updated document
        );
        if (!updatedArtist) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(updatedArtist);
    } catch (error) {
        console.error("Error updating:", error);
        res.status(500).json({ error: "Error on update" });
    }
};

exports.allArtist = async (req, res) => {
    try {
        const artists = await loginModel.find({ userstatus: 1 }).select('_id');
        const userIds = artists.map(user => user._id);
        const artistList = await registerModel.find({ userid: { $in: userIds } }).populate('userid');
        res.json({ artistList });
    } catch (error) {
        console.error('Error during fetching:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



exports.allUsers = async (req, res) => {
    try {
        // Fetch artists who have userstatus 2
        const client = await loginModel.find({ userstatus: 2 }).select('_id');

        // Fetch all users with category "User" and whose _id is in artists array
        const allUsers = await registerModel.find({ category: "User", userid: { $in: client } });

        res.json(allUsers);
    } catch (error) {
        console.error('Error fetching all users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Fetch profile
exports.profile = async (req, res) => {
    try {
        const { userid } = req.body;

        // Fetch the user profile from Register collection
        const profile = await registerModel.findOne({ userid: userid }).populate('userid');
        
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
        res.json(profile);
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.updatedProfile = async (req, res) => {
    const { userId, name, category, address, phone, dob, email } = req.body;
    const profileUpdate = {};
  
    if (name) profileUpdate.name = name;
    if (category) profileUpdate.category = category;
    if (address) profileUpdate.address = address;
    if (phone) profileUpdate.contact = phone;
    if (dob) profileUpdate.dob = dob;
  
    try {
      // Handle image upload
      if (req.files && req.files.image) {
        const image = req.files.image;
        const imagePath = path.join(__dirname, '../public/uploads/', image.name);
  
        image.mv(imagePath, (err) => {
          if (err) {
            console.error('Error moving image file:', err);
            return res.status(500).json({ error: 'Image upload failed' });
          }
        });
  
        profileUpdate.image = `/uploads/${image.name}`;
      }
  
      // Update profile data in 'register' collection
      const updatedProfile = await registerModel.findOneAndUpdate(
        { userid: userId },
        { $set: profileUpdate },
        { new: true }
      ).populate('userid');
  
      if (!updatedProfile) {
        return res.status(404).json({ error: 'Profile not found' });
      }
  
      // Update email in 'userid' field if provided
      if (email) {
        await loginModel.findByIdAndUpdate(userId, { $set: { email } }, { new: true });
      }
  
      res.json(updatedProfile);
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

 
  exports.followArtist = async (req, res) => {
    try {
      const { userId, artistid } = req.body;
      const existingFollow = await followModel.findOne({ userId, artistid });
      if (existingFollow) {
        return res.status(400).json({ error: 'Follow already exists' });
      }
  const status = 1
      const newFollow = new followModel({ userId, artistid, status });
      await newFollow.save();
      res.json({ message: 'Success' }); // Return an object with a message
    } catch (error) {
      console.error('Error adding follow:', error);
      res.status(500).json({ error: 'Failed to add follow' });
    }
  };


  exports.followList = async (req, res) => {
    const { userid } = req.body;
    
    try {
      const clientFollowedArtists = await followModel.find({ userId: userid }).select('artistid');
  
      const artistIds = clientFollowedArtists.map(follow => follow.artistid);
  
      const followList = await registerModel.find({ _id: { $in: artistIds }, category: "Artist" });
  
      res.json({ artistList: followList }); 
    } catch (error) {
      console.error('Error fetching follow list:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  exports.followers = async (req, res) => {
    try {
      const { artistid } = req.body;
  
      if (!artistid) {
        return res.status(400).json({ message: "Artist ID is required" });
      }
  
      // Fetch followers for the given artist
      const followers = await followModel.find({ artistid:artistid }).select('userId');

      // Extract userIds from followers
      const userIds = followers.map(f => f.userId);

      // Fetch user details using the userIds
      const followerDetails = await registerModel.find({ userid: { $in: userIds } });

      res.status(200).json(followerDetails);
    } catch (error) {
      console.error('Error fetching followers:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  