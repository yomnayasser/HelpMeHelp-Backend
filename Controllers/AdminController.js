const Admin=require('../Models/admin');
const Organization = require('../Models/Organization');
const User = require('../Models/User');
exports.PostAddHotline= function(req,res){
    const number=req.body.number;
    const description=req.body.description;
    Admin.addHotline(number,description)
    .then((result)=>{
        if(!result)
        {
            res.send(false)
        }
        else
        {
           res.send(true)
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
           res.send(false)
        }
        else
        {
           res.send(true)
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
exports.RejectOrganization=async function(req,res){
    const org_username=req.body.username;
    await Admin.removeOrganizationExtraDetails(org_username)
    .then(()=>{
        Admin.RemoveMainOrganization(org_username);
    })
    .then(res.send(true))
    .catch(err=> console.log(err));
}
exports.RemoveOrganization=async function(req,res){
    const org_username=req.params.username;
    await Admin.RemoveOrganizationCampaignsDetails(org_username)
    .then(async function(){
        await Admin.RemoveOrganizationCampaigns(org_username);
    }).then(async function(){
        await Admin.removeOrganizationExtraDetails(org_username)
        .then(()=>{
            Admin.RemoveMainOrganization(org_username);
        })
    })
    .then(res.send(true))
    .catch(err=> console.log(err));
}
exports.ViewAllAccepted=function(req,res){
    var allOrgArr=[];
    Admin.viewAllAcceptedOrganizations().then(([allOrg])=>{
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
                        Org.logo="No Image"
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
exports.ViewAllUsers=async function(req,res){
   
    let name; let userName; let password; let image;
     let Governorate; let email; let age; let username;
    let address; let birthday; let role; let countryID; let GovernorateID;
    var allUserArr= new Array();
      Admin.getAllUsers()
    .then(([users])=>{
        for(let i=0;i<users.length;i++)
        {
            console.log(users)
             User.findbyID(users[i].Username)
            .then(([user])=>{
               
                name=user[0].Name;  age=user[0].Age; birthday=user[0].birthdate; password=user[0].password
                email=user[0].email; userName=user[0].Username; address=user[0].Address; role=user[0].role; image=user[0].image;
                Governorate=user[0].governorateID;
                const userData = new User();
                userData.name=name; userData.userName=userName; userData.password=password;userData.country="Egypt"; userData.Governorate=Governorate;
                userData.email=email; userData.age=age; userData.birthday=birthday; userData.address=address; userData.role=role; userData.image=image;
                allUserArr.push(userData)
                   if(i==users.length-1)
                    {
                         console.log(allUserArr)
                        res.send(allUserArr)
                       
                    }
            })
            .catch(err=> console.log(err))

        }

    })

 
   

}