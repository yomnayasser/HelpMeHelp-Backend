var express = require('express');
var router = express.Router();
const adminCotnroller=require('../Controllers/AdminController');
router.post('/admin/addHotline',adminCotnroller.PostAddHotline);
router.post('/admin/addAdmin',adminCotnroller.PostAddAdmin);
router.post('/admin/handleRequest',adminCotnroller.ApproveOrganization);
router.delete('/admin/removeOrganization',adminCotnroller.RemoveOrganization);
router.get('/admin/getPendings',adminCotnroller.ViewAllPendings);
module.exports=router;