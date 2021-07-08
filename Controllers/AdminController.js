const Admin=require('../Models/admin');
const Organization = require('../Models/Organization');
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
exports.getAllOrganizationsInfo=function(req,res){
    var allOrgArr=[];
    Admin.GetOrganizations().then(([allOrg])=>{
        for(let i=0;i<allOrg.length;i++)
        {
            Admin.getOrganizationInfo(allOrg[i].username).then((Org)=>{
                allOrgArr.push(Org);
                if(i==allOrg.length-1)
                {
                    res.json(allOrgArr);
                    return allOrgArr;
                }
            })
        }
    })
    .catch(err=> console.log(err));
}
exports.ViewAllPendings=function(req,res){
    var allOrgArr=[];
    Admin.viewAllPendingOrganizations().then(([allOrg])=>{
        for(let i=0;i<allOrg.length;i++)
        {
            Admin.getOrganizationInfo(allOrg[i].username).then((Org)=>{
                if(allOrg[i].username)
                {
                    if(Org.hotline==null)
                    {
                        Org.hotline="No Hotline"
                    }
                    if(Org.website==null)
                    {
                        Org.website="No Website"
                    }
                    if(Org.socialMedia.length==0)
                    {
                        
                        Org.socialMedia="No Socail Media"
                    }
                    if(Org.logo==null)
                    {
                        Org.hotline="No Image"
                    }
                    allOrgArr.push(Org);
                }
                if(i==allOrg.length-1)
                {
                    res.json(allOrgArr);
                    return allOrgArr;
                }
            })
        }
    })
    .catch(err=> console.log(err));
}
exports.ApproveOrganization=function(req,res){
    const org_username=req.body.username;
    console.log(org_username)
    Admin.acceptOrganization(org_username).then(res.send(true))
    .catch(err=> console.log(err));
}
exports.RemoveOrganization=function(req,res){
    const org_username=req.body.username;
    Admin.removeOrganization(org_username)
    .then(res.send(true))
    .catch(err=> console.log(err));
}