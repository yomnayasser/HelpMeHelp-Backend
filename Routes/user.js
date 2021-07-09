var express = require('express');
var router = express.Router();
const userCotnroller=require('../Controllers/UserController');
router.post('/UserLogin',userCotnroller.GetUser);
// router.post('/user/:id',userCotnroller.PostUpdatedUser);
router.post('/rate',userCotnroller.addUserRate);
router.post('/donate',userCotnroller.donate);
router.post('/join',userCotnroller.join);
//router.post('/approve',userCotnroller.approve);
//router.get('/history',userCotnroller.history);
router.get('/search',userCotnroller.search);
router.post('/userSignUp',userCotnroller.UserSignUp);

//router.post('/chat',userCotnroller.getOldMessages);
router.post('/userAddCampaign/:id',userCotnroller.launchDonationCampaign);

/////////chat///////////
router.get('/oldChat/:chatID/:chatType',userCotnroller.getOldMessages);
router.get('/getChatID/:sender/:reciever/:chatType',userCotnroller.getChatID);

//
router.get('/userCountry/:id',userCotnroller.getCountryFromID);
router.get('/userGov/:id',userCotnroller.getGovFromID);
router.get('/userCampagins/:id',userCotnroller.getUserCampaginContributions)
router.get('/userAllCampagin',userCotnroller.getAllCampagins);
router.get('/userProfile/:id',userCotnroller.UserProfile);
router.post('/userUpdateProfile/:id',userCotnroller.updateUserPorfile);
router.get('/userCamaginsJoined/:id',userCotnroller.getUserjoinedCampagin);
router.get('/userCheckCampaginStatus/:username/:id',userCotnroller.checkUserCampaginStatus);
module.exports=router;