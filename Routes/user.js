var express = require('express');
var router = express.Router();
const userCotnroller=require('../Controllers/UserController');
router.get('/UserLogin',userCotnroller.GetUser);
router.post('/user/:id',userCotnroller.PostUpdatedUser);

module.exports=router;