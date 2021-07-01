var express = require('express');
var OrgRouter = express.Router();
const OrganizationController=require('../Controllers/OrganizationController');
OrgRouter.get('/OrgLogin',OrganizationController.OrgLogIn);
OrgRouter.get('/OrgProfile',OrganizationController.OrgProfile);
// OrgRouter.get('/OrgC',OrganizationController.getCategory);
// router.post('/user/:id',userCotnroller.PostUpdatedUser);

module.exports=OrgRouter;