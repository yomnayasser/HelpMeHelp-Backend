var express = require('express');
var router = express.Router();
const recommenderController=require('../Controllers/recommenderController');
router.get('/recommender/donationCampaigns/:id',recommenderController.getRecommendedDonationCampaigns);
router.get('/recommender/volunteerCampaigns/:id',recommenderController.getRecommendedVolunteerCampaigns);
const Data=require('../Controllers/DataExtractor');
router.get('/orgDB',Data.readAndSaveOrganizations);
module.exports=router;