var express = require('express');
var OrgRouter = express.Router();
const OrganizationController=require('../Controllers/OrganizationController');
OrgRouter.post('/OrgLogin',OrganizationController.OrgLogIn);
OrgRouter.get('/OrgProfile/:id',OrganizationController.OrgProfile);
OrgRouter.post('/orgUpdate/:id',OrganizationController.UpdatePorfile);
OrgRouter.get('/orgCamp/:id',OrganizationController.getOrgCampaigns);
OrgRouter.get('/orgApplicants/:id',OrganizationController.getCampaginApplicants);
OrgRouter.get('/orgAcceptApplicants/:id/:username',OrganizationController.acceptApplicants);
OrgRouter.get('/orgRejectApplicants/:id/:username',OrganizationController.rejectApplicants);

module.exports=OrgRouter;