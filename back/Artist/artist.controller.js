const path = require('path');
const models = require('./artist.model');
const { register } = require('../Registration/register.model');
const musicModel = models.music;
const playbackModel = models.Playback
exports.Addmusic = async (req, res) => {
  try {
    if (!req.files || !req.files.music) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const musicFile = req.files.music;
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(musicFile.name);
    const filename = uniqueSuffix + fileExtension;
    const filepath = path.join(__dirname, '..', 'public', 'music', filename);

    musicFile.mv(filepath, async (err) => {
      if (err) {
        console.error('Error moving file:', err);
        return res.status(500).json({ error: 'Failed to upload file' });
      }

      try {
        const params = {
          music: filename,
          priceType: req.body.priceType,
          // amount: req.body.priceType === 'paid' ? req.body.amount : 0,
          artistId: req.body.artistId,
          genre: req.body.genre,
          musicname: req.body.musicname
        };

        const savedMusic = await musicModel.create(params);
        // console.log('File saved successfully:', filename);
        res.status(200).json({ message: 'File uploaded successfully', data: savedMusic });
      } catch (error) {
        console.error('Error saving data to MongoDB:', error);
        res.status(500).json({ error: 'Failed to save data' });
      }
    });

  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
};

exports.music = (req, res) => {
  const filename = req.params.filename;
  const root = path.join(__dirname, '..', 'public', 'music');
  res.sendFile(filename, { root }, (err) => {
    if (err) {
      console.error('File not found:', err);
      res.status(404).send('File not found');
    }
  });
};

exports.viewMusic = async (req, res) => {
    try {
      const artistId = req.body.artistid; // Assuming you send 'artistid' in the request body
      const musicList = await musicModel.find({ artistId });
      res.json(musicList);
    } catch (error) {
      console.error('Error fetching music list:', error);
      res.status(500).json({ error: 'Failed to fetch music list' });
    }
  }

  exports.viewMusics = async (req, res) => {
    try {
      const musicList = await musicModel.find({ priceType: "free" });
      res.json(musicList);
    } catch (error) {
      console.error('Error fetching music list:', error);
      res.status(500).json({ error: 'Failed to fetch music list' });
    }
  }

  exports.viewmusic = async (req, res) => {
    try {
      const musicList = await musicModel.find();
// console.log(musicList);
      res.json(musicList);
    } catch (error) {
      console.error('Error fetching music list:', error);
      res.status(500).json({ error: 'Failed to fetch music list' });
    }
  }
  
exports.Deletemusic = async (req, res) => {
  try {
    const deletemusic = await musicModel.findByIdAndDelete(req.body.id);
    res.json(deletemusic);
  } catch (error) {
    console.error('Error deleting music:', error);
    res.status(500).json({ error: 'Failed to delete music' });
  }
};

  exports.viewMatched = async (req, res) => {
  const {  genre } = req.body;
// console.log(genre);
  try {
    // const matchedMusics = await genreModel.find({ genre: genre });

    const matchedMusic = await musicModel.find({ genre: genre });
    // console.log(matchedMusic);
    res.json(matchedMusic);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching music' });
  }
}



// exports.artistCollection = async (req, res) => {
//   const { artistid } = req.params; // Destructure artistid from req.params
//   console.log('Artist ID:', artistid); // Log to verify

//   try {
//     const matchedMusic = await musicModel.find({ artistId: artistid });
//     console.log('Matched Music:', matchedMusic); // Log matched music
//     res.json(matchedMusic);
//   } catch (error) {
//     console.error('Error fetching music:', error);
//     res.status(500).json({ error: 'Error fetching music' });
//   }
// };
exports.artistCollection = async (req, res) => {
  const { id } = req.params; // Ensure `artistid` is extracted correctly

  try {
    // Fetch the collection based on artistid
    const matchedMusic = await musicModel.find({ artistId: id });
    res.json(matchedMusic);
  } catch (error) {
    console.error('Error fetching music:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.playBack =  async (req, res) => {
  try {
    const { userId, musicId } = req.body;
    const playback = new playbackModel({ userId, musicId });
    await playback.save();
    res.status(201).json(playback);
  } catch (error) {
    res.status(500).json({ error: 'Error saving playback information' });
  }
};

exports.playbackList = async (req, res) => {
  try {
    const { userId } = req.body; // Access userId directly from req.body

    const playback = await playbackModel.find({ userId }).populate('musicId');

    res.json(playback);
  } catch (error) {
    console.error('Error fetching playback list:', error);
    res.status(500).json({ error: 'Failed to fetch playback list' });
  }
};

  exports.recommendations= async (req, res) => {
  try {
    const { userId } = req.body;
    
    // Find the last played track for the user
    const lastPlayback = await playbackModel.findOne({ userId }).sort({ playedAt: -1 }).populate('musicId');
    
    if (!lastPlayback) {
      return res.status(404).json({ error: 'No playback record found for this user' });
    }

    const lastPlayedMusic = lastPlayback.musicId;
    const genre = lastPlayedMusic.genre;

    // Find other music tracks of the same genre
    const recommendations = await musicModel.find({ genre }).limit(10);

    res.json(recommendations);
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    res.status(500).json({ error: 'Failed to fetch recommendations' });
  }
};

//   exports.lastPlayedAndSimilar= async (req, res) => {
//   const { userId } = req.body;
//   try {
//     // Find the last played music
//     const lastPlayback = await playbackModel.findOne({ userId }).sort({ playedAt: -1 }).populate('musicId');
//     if (!lastPlayback) {
//       return res.status(404).json({ error: 'No playback records found' });
//     }

//     // Find similar music based on the genre of the last played music
//     const lastMusic = lastPlayback.musicId;
//     const similarMusic = await musicModel.find({ genre: lastMusic.genre }).exec();

//     res.json({ lastMusic, similarMusic });
//   } catch (error) {
//     console.error('Error fetching last played music and similar music:', error);
//     res.status(500).json({ error: 'Failed to fetch music' });
//   }
// };