var express = require('express');
var OrgRouter = express.Router();
const OrganizationController=require('../Controllers/OrganizationController');
OrgRouter.post('/OrgLogin',OrganizationController.OrgLogIn);
OrgRouter.get('/OrgProfile/:id',OrganizationController.OrgProfile);
OrgRouter.post('/orgUpdate/:id',OrganizationController.UpdatePorfile);
OrgRouter.get('/orgCamp/:id',OrganizationController.getOrgCampaigns);
OrgRouter.post('/OrgSignUp',OrganizationController.OrgSignUp);

module.exports=OrgRouter;