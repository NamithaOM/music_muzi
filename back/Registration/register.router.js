const express = require("express");
const router = express.Router();

const registerController=require('./register.controller')

router.post('/register',registerController.register)
router.post('/login',registerController.logIn)
router.get('/viewartist', registerController.viewArtist)
router.post('/deleteartist',registerController.deleteArtist)
router.post('/editartist',registerController.editArtist)
router.get('/allartists', registerController.allArtist)
router.get('/allusers',registerController.allUsers)
router.post('/followlist',registerController.followList)
router.post('/profile',registerController.profile)
router.post('/updateProfile', registerController.updatedProfile);
router.post('/followartist',  registerController.followArtist);
router.post('/followers',  registerController.followers);

module.exports=router

