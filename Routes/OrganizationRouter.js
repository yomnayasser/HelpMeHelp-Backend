var express = require('express');
var OrgRouter = express.Router();
const OrganizationController=require('../Controllers/OrganizationController');
OrgRouter.post('/OrgLogin',OrganizationController.OrgLogIn);
OrgRouter.get('/OrgProfile',OrganizationController.OrgProfile);
OrgRouter.post('/org/:id',OrganizationController.UpdatePorfile);

module.exports=OrgRouter;