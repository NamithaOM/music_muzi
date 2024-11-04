const express = require('express');
const router = express.Router();
const userController = require('./user.controller');

router.post('/orders', userController.orders);
router.post('/verify', userController.verify);
router.post('/addfavorites', userController.favoriteInsert);
router.post('/viewfavorite', userController.viewFavorites);
router.post('/share', userController.addShare);
router.post('/sharelist', userController.shareList);
router.post('/addcomment', userController.addComment);
router.post('/viewcommant', userController.viewComment);
router.post('/addfriend', userController.addFriends);
router.post('/viewfriends', userController.viewFriends);
router.post('/updatepayment',userController.updatePaymentStatus)


module.exports = router;
