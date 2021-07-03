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

module.exports=router;