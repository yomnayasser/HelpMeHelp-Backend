const bcrypt = require('bcryptjs');
const Cryptr=require('cryptr')
const cryptr = new Cryptr('myTotalySecretKey');

const Organization=require('../Models/Organization');
const Campaign=require('../Models/campaign');
const User=require('../Models/User');
exports.OrgLogIn=function(req,res)
{
    const username=req.body.username;
    const password=req.body.password;
    Organization.login(username)
    .then(([Org])=>{
        if(!Org[0])
        {
            res.send({message:"NA" });
        }
        else
        {
            // const decryptedPassword=cryptr.decrypt(Org[0].password);
            // if(password==decryptedPassword)
            // {
            //     res.send(true);
            // }
            // else
            // {
            //     res.send(false);
            // }
            if(password==Org[0].password)
            {
                res.send(true)  
            }
            else
            {
                res.send(false)
            }
        }
    })
    .catch(err=> console.log(err))
}

exports.OrgProfile=async function(req,res)
{
    const username=req.params.id;
    const Org = new Organization();
    let categoryID;let categoryName; let name; let password;
    let description; let purpose; let website; let organizationTypeID;
    let rating; let logo; let email; let requestStatus; let organizationTypeName;
    let phoneNumber; let countryID; let countryName; let GovernorateID; let GovernorateName; let hotlineTemp;
    let SubcategoryID; let SubcategoryName; var socailMediaLinksArray = new Array(); var locationArray = new Array();
    await Organization.getOrg(username)
    .then(([org])=>{
       // console.log(org[0])
         name=org[0].name; password=org[0].password
          description=org[0].description;  purpose=org[0].purpose;  
          rating=org[0].rating;  logo=org[0].logo;  email=org[0].email;  requestStatus=org[0].request;
          phoneNumber=org[0].phone_num;  countryID=org[0].country_id;  GovernorateID=org[0].governorate_id;
          if(org[0].website==null)
          {
            website="No website availble"
          }
          else
          {
            website=org[0].website;
          }
        //   password=cryptr.decrypt(org[0].password);
    })
    .catch(err=> console.log(err))

    await Organization.getGovernorateName(GovernorateID)
        .then(([Gname])=>{
            GovernorateName=Gname[0].Name;
           
        })
        .catch(err=> console.log(err))

    await Organization.getCountryName(countryID)
    .then(([Cname])=>{
        countryName=Cname[0].Name;
        
    })
    .catch(err=> console.log(err))
    

    await Organization.getCategoryID(username)
    .then(([category])=>{
        categoryID=category[0].Category_ID;
       
    })
    .catch(err=> console.log(err))

    await Organization.getCategoryName(categoryID)
    .then(([name])=>{
        categoryName=name[0].Name;
    })
    .catch(err=> console.log(err))

    await Organization.getSubCategoryID(username)
    .then(([Subcategory])=>{
        SubcategoryID=Subcategory[0].Subcategory_ID;
    })
    .catch(err=> console.log(err))

    await Organization.getSubCategoryName(SubcategoryID)
    .then(([name])=>{
        SubcategoryName=name[0].Name;
    })
    .catch(err=> console.log(err))

    await Organization.getOrgTypeID(username)
    .then(([type])=>{
        organizationTypeID=type[0].OrgType_ID;
    })
    .catch(err=> console.log(err))

    await Organization.getOrgTypeName(organizationTypeID)
    .then(([name])=>{
        organizationTypeName=name[0].Type;
    })
    .catch(err=> console.log(err))

    await Organization.getLocation(username)
        .then(([location])=>{
            
            for(let i=0;i<location.length;i++)
            {
                locationArray.push(location[i].location);
            }

        })
        .catch(err=> console.log(err))
   await Organization.getHotline(username)
        .then(([hotline])=>{
            if(hotline[0]==null)
            {
                hotlineTemp="No hotline number"
            }
            else{
            hotlineTemp=hotline[0].Number;
            }
        })
        .catch(err=> console.log(err))

    await  Organization.getSocailMedia(username)
        .then(([links])=>{
            if(links.length==0)
            {
                Org.socialMedia="No social media links"
            }
            else{
            for(let i=0;i<links.length;i++)
            {
                socailMediaLinksArray.push(links[i].socialmediaLink);
            }
        }

        })
        .catch(err=> console.log(err))
    Org.name=name; Org.userName=username; Org.password=password;Org.country=countryName; Org.Governorate=GovernorateName;
    Org.subCategory=SubcategoryName; Org.category=categoryName; Org.email=email;
   Org.organizationType=organizationTypeName; Org.description=description; Org.purpose=purpose; Org.rating=rating;
   Org.website=website; Org.logo=logo; Org.requestStatus=requestStatus; Org.phoneNumber=phoneNumber; Org.location=locationArray;
   Org.hotline=hotlineTemp; Org.socialMedia=socailMediaLinksArray;
   console.log(Org)
   res.send(Org)
    // res.send(Org.name)
  
   //res.status(200).json({Org});
   
}

exports.UpdatePorfile=async function(req,res)
{
    const org_Username=req.params.id;const new_name=req.body.name;
    const new_password=req.body.password; const new_country=req.body.country;
    const new_governorate=req.body.governorate;const new_email=req.body.email;
    const new_category=req.body.category;const new_description=req.body.description;
    const new_purpose=req.body.purpose;const new_rating=req.body.rating;
    const new_website=req.body.website;const new_socialMedia=req.body.socialMedia;
    const new_hotline=req.body.hotline;const new_logo=req.body.logo;
    const new_requestStatus=req.body.requestStatus;const new_location=req.body.location;
    const new_phoneNumber=req.body.phoneNumber;const new_SubCategory=req.body.SubCategory;
    const new_orgType=req.body.orgType;
    var socailMediaLinksArray = new Array(); var locationArray = new Array();
    console.log(org_Username);
    console.log(new_name);
    console.log(new_email)

    await Organization.getLocation(org_Username)
    .then(([location])=>{
        
        for(let i=0;i<location.length;i++)
        {
            locationArray.push(location[i].location);
        }

    })
    .catch(err=> console.log(err))

    await  Organization.getSocailMedia(org_Username)
        .then(([links])=>{
            
            for(let i=0;i<links.length;i++)
            {
                socailMediaLinksArray.push(links[i].socialmediaLink);
            }

        })
        .catch(err=> console.log(err))

        const hashedPassword=cryptr.encrypt(new_password);
        const updatedOrg=new Organization(new_name,org_Username,hashedPassword,new_country,new_governorate,new_email,new_category,new_SubCategory,new_orgType
            ,new_description,new_purpose,new_rating,new_website,new_socialMedia,new_hotline,new_logo,new_requestStatus,new_phoneNumber,new_location);
         
            updatedOrg.updateProfileData(org_Username)
        .then(res.send(true))
        .catch(err=> console.log(err));

        updatedOrg.updateLocations(org_Username,locationArray)
        updatedOrg.updateSocailMedia(org_Username,socailMediaLinksArray);
   
}

exports.getOrgCampaigns=function(req,res)
{
    const username=req.params.id;
    let name; let status; let dontationTypeID; let address;let image; let campID;
    let description; let startDate; let endDate; let progress;let target; let id;
    var campaginsDeitals = new Array();

     
    Organization.getOrgCampaginID(username)
    .then(([ID])=>{
        //console.log(ID.length)
        // id=ID[0].Campaign_ID
        for(let i=0;i<ID.length;i++)
        {
            id=ID[i].Campaign_ID;
            //console.log(id);
            Campaign.getCampaginDeitals(id)
            .then(([campaign])=>{
                var camp = new Campaign();
                name=campaign[0].Name;
                status=campaign[0].Status;
                //ownerID=campaign[0].ownerID;
                address=campaign[0].Address;
                image=campaign[0].Image;
                description=campaign[0].Description;
                startDate=campaign[0].StartDate;
                endDate=campaign[0].EndDate;
                progress=campaign[0].Progress;
                target=campaign[0].Target;
                dontationTypeID=campaign[0].DonationType;

                camp.name=name; camp.status=status;camp.orgUsername=username; camp.startDate=startDate;
                camp.endDate=endDate; camp.description=description; camp.progress=progress; camp.address=address;
                camp.image=image; camp.target=target; camp.ID=ID[i].Campaign_ID; camp.dontationTypeID=dontationTypeID;
                campaginsDeitals.push(camp); 
                //console.log(campaginsDeitals.length)
                if(i==ID.length-1)
                {
                   console.log(campaginsDeitals)
                    res.send(campaginsDeitals);
                }
            })
            .catch(err=> console.log(err))        
        }
        // res.send(campaginsDeitals)
    })
    .catch(err=> console.log(err));
   //res.status(200).json(id);  
  
}

exports.OrgSignUp=function(req,res)
{
    const name=req.body.name;
    const userName=req.body.userName;
    const password=req.body.password;
    const country=req.body.country;
    const Governorate=req.body.governorate;
    const email=req.body.email;
    const category=req.body.category;
    const subCategory=req.body.subCategory; 
    const organizationType=req.body.organizationType; 
    const description=req.body.description;
    const purpose=req.body.purpose;
    const rating=req.body.rating;
    const website=req.body.website;
    const socialMedia=req.body.socialMedia; 
    const hotline=[req.body.hotlineNumber,req.body.hotlineDesc]; 
    const logo=req.body.logo;
    const requestStatus="pending";
    const location=req.body.location; 
    const phoneNumber=req.body.phoneNumber;
    const encryptedPassword=cryptr.encrypt(password);
    const org=new Organization(name,userName,encryptedPassword,country,Governorate,email,category,subCategory,
        organizationType,description,purpose,rating,website,socialMedia,hotline,logo,requestStatus,phoneNumber,location);
        Organization.getOrg(userName).then(([found])=>{
            if(found[0])
            {
                res.send("username already exists");
            }
            else
            {
                org.checkHotline().then(([exist])=>{
                    if(exist[0])
                    {
                        res.send("hotline already exists");
                    }
                    else{
                        org.register().then(res.send("user registered succesfully"));         
                    }
                }).catch(err=> console.log(err))
            }
        })
        .catch(err=> console.log(err));
}

exports.getCampaginApplicants= function (req,res)
{
    const ID=req.params.id; let name; let country; let cID;
    let Governorate; let gID; let email; let age; let address; 
    let birthday; var pendingApplicants = new Array();

      Campaign.getPendingApplicants(ID)
    .then(([applicantsUsernames])=>{
        for(let i=0;i<applicantsUsernames.length;i++)
        {
             User.findbyID(applicantsUsernames[i].Username)
            .then(([applicants])=>{
                //console.log(applicants);
                var user = new User();
                name=applicants[0].Name;
                cID=applicants[0].countryID;
                gID=applicants[0].governorateID;
                email=applicants[0].email;
                age=applicants[0].Age;
                address=applicants[0].Address;
                birthday=applicants[0].birthdate;
               
              

                //  User.getUserGovernorate(gID)
                // .then(([gname])=>{
                //     Governorate=gname[0].Name;
                // })
                // .catch(err=> console.log(err));

                user.name=name; user.email=email;  user.age=age; user.country=cID;
                user.userName=applicantsUsernames[i].Username; user.Governorate=gID;
                 user.address=address; user.birthday=birthday;
                 console.log( user);

                pendingApplicants.push(user)

                if(i==applicantsUsernames.length-1)
                {
                   console.log(pendingApplicants)
                    res.send(pendingApplicants);
                }
               
            })
        }
       
    })
    .catch(err=> console.log(err));
}

exports.acceptApplicants= function (req,res)
{
    const ID=req.params.id;
    const username=req.params.username;
    console.log(ID)
    console.log(username)
    Organization.changeStatusAccepted(ID,username)
    .then(res.send(true))
    .catch(err=> console.log(err));
}

exports.rejectApplicants= function (req,res)
{
    const ID=req.params.id;
    const username=req.params.username;
    Organization.changeStatusRejected(ID,username)
    .then(res.send(true))
    .catch(err=> console.log(err));
}
















// exports.getLocation=function(req,res)
// {
//     const username=req.body.username;
//     Organization.getOrgLocation(username)
//     .then(([location])=>{
//         var locationArray = new Array();
//         for(let i=0;i<location.length;i++)
//         {
//             locationArray.push(location[i].location);
//         }
//         res.status(200).json(locationArray);
//     })
// }

// exports.gethotline=function(req,res)
// {
//     const username=req.body.username;
//     Organization.getHotline(username)
//     .then(([hotline])=>{
//         const h=hotline[0].Number;
//         res.status(200).json(h);
//     })
//     .catch(err=> console.log(err))
// }
