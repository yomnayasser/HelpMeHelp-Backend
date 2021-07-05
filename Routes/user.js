var express = require('express');
var router = express.Router();
const userCotnroller=require('../Controllers/UserController');
router.get('/UserLogin',userCotnroller.GetUser);
router.post('/user/:id',userCotnroller.PostUpdatedUser);
router.post('/rate',userCotnroller.addUserRate);
router.post('/donate',userCotnroller.donate);
router.post('/join',userCotnroller.join);
//router.post('/approve',userCotnroller.approve);
//router.get('/history',userCotnroller.history);
router.get('/search',userCotnroller.search);

//router.post('/chat',userCotnroller.getOldMessages);

router.get('/userCountry/:id',userCotnroller.getCountryFromID);
router.get('/userGov/:id',userCotnroller.getGovFromID);

module.exports=router;