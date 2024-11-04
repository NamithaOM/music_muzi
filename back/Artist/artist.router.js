const express = require('express');
const router = express.Router();
const artistController = require('./artist.controller');

router.post('/addmusic', artistController.Addmusic);
router.post('/viewmusic', artistController.viewMusic)
router.post('/deleteMusic', artistController.Deletemusic);
router.get('/music/:filename', artistController.music);
router.get('/viewMusics', artistController.viewMusics)
router.get('/viewMusic', artistController.viewmusic)
router.post('/viewmatched', artistController.viewMatched)
router.get('/artistcollection/:id', artistController.artistCollection);
router.post('/playback',artistController.playBack)
router.post('/playbacklist',artistController.playbackList)
router.post('/recommendations',artistController.recommendations)


module.exports = router;
