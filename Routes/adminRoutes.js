var express = require('express');
var router = express.Router();
const adminCotnroller=require('../Controllers/AdminController');
router.post('/admin/addHotline',adminCotnroller.PostAddHotline);
router.post('/admin/addAdmin',adminCotnroller.PostAddAdmin);
router.get('/admin/AllOrganizations',adminCotnroller.getAllOrganizationsInfo);
router.get('/admin/AllUsers',adminCotnroller.ViewAllUsers);
router.get('/admin/AllPendingOrganizations',adminCotnroller.ViewAllPendings);
router.get('/admin/AllAcceptedOrganizations',adminCotnroller.ViewAllAccepted);
router.post('/admin/handleRequest',adminCotnroller.ApproveOrganization);
router.post('/admin/rejectOrganization',adminCotnroller.RejectOrganization);
router.delete('/admin/removeOrganization/:username',adminCotnroller.RemoveOrganization)
module.exports=router;