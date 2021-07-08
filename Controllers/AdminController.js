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
exports.ViewAllUsers=async function(req,res){
   
    let name; let userName; let password; let image;
     let Governorate; let email; let age; let username;
    let address; let birthday; let role; let countryID; let GovernorateID;
    var allUserArr=[];
      Admin.getAllUsers()
    .then(([users])=>{
        for(let i=0;i<users.length;i++)
        {
            const user = new User();
           await  User.findbyID(users[i].Username)
            .then(([user])=>{
                name=user[0].Name;  age=user[0].Age; birthday=user[0].birthdate;
                email=user[0].email; userName=user[0].Username; address=user[0].Address; role=user[0].role; image=user[0].image;
                  GovernorateID=user[0].governorateID;
            })
            .catch(err=> console.log(err))
        
             await User.getUserGovernorate(GovernorateID)
                .then(([Gname])=>{
                    Governorate=Gname[0].Name;
                   
                })
                .catch(err=> console.log(err))
        
            user.name=name; user.userName=username; user.password=password;user.country="Egypt"; user.Governorate=Governorate;
            user.email=email; user.age=age; user.birthday=birthday; user.address=address; user.role=role; user.image=image;
           //console.log(user)
           allUserArr.push(user)
           if(i==users.length-1)
            {
                console.log(allUserArr)
                res.json(allUserArr);
                return allUserArr;
               
            }
        }

    })

 
   

}