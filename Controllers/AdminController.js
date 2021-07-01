const Admin=require('../Models/admin');
const organization=require('../Models/Organization')
exports.PostAddHotline= function(req,res){
    const number=req.body.number;
    const description=req.body.description;
    Admin.addHotline(number,description)
    .then((result)=>{
        if(!result)
        {
            res.status(404).json({
                message:"hotline already exists"
            })
        }
        else
        {
            res.status(200).json({
                message:"Hotline added"
            })
        }
    })
    .catch(err=> console.log(err));
}
exports.PostAddAdmin=function(req,res){
    const user_username=req.body.username;
    Admin.addAdmin(user_username)
    .then((result)=>{
        if(!result)
        {
            res.status(404).json({
                message:"user not found"
            })
        }
        else
        {
            res.status(200).json({
                message:"Admin added"
            })
        }
    })
    .catch(err=> console.log(err));
}
exports.ViewAllPendings=function(req,res){
    Admin.viewAllPendingOrganizations()
    .then(([allOrg])=>{

        // var PendingArr=new Array();
        // for (let i=0;i<allOrg.length;i++)
        // {
        //     PendingArr.push(allOrg[i].username);
        // }
        
        res.json(allOrg);
    });
}
exports.ApproveOrganization=function(req,res){
    const org_username=req.body.username;
    Admin.acceptOrganization(org_username).then(
        res.status(200).json({
            message:"organization accepted"
        }))
    .catch(err=> console.log(err));
}
exports.RemoveOrganization=function(req,res){
    const org_username=req.body.username;
    Admin.removeOrganization(org_username)
    .then(
        res.status(200).json({
            message:"organization deleted"
        }))
    .catch(err=> console.log(err));
}