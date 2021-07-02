const bcrypt = require('bcryptjs');
const Organization=require('../Models/Organization');

exports.OrgLogIn=function(req,res)
{
    const username=req.body.username;
    const password=req.body.password;
    Organization.login(username)
    .then(([Org])=>{
        if(!Org[0])
        {
            res.status(400).json({message:"User doesn't exsists"}) 
        }
        else
        {
            // bcrypt.compare(pass,Org.password)
            // .then(doMatch =>{
            //     if(doMatch)
            //     {
            //          res.status(200).json({ message:"Log in successfully"});            
            //     };
            //     res.status(400).json({message:"wrong password"});
            // })
            // .catch(err=> console.log(err));
            if(password==Org[0].password)
            {
                res.status(200).json({ message:"Log in successfully"});  
            };
            res.status(400).json({message:"wrong password"});
        }
    })
    .catch(err=> console.log(err))
}

exports.OrgProfile=async function(req,res)
{
    const username=req.body.username;
    const Org = new Organization();
    let categoryID;let categoryName; let name; let password;
    let description; let purpose; let website; let organizationTypeID;
    let rating; let logo; let email; let requestStatus; let organizationTypeName;
    let phoneNumber; let countryID; let countryName; let GovernorateID; let GovernorateName; let hotlineTemp;
    let SubcategoryID; let SubcategoryName; var socailMediaLinksArray = new Array(); var locationArray = new Array();
    await Organization.getOrg(username)
    .then(([org])=>{
         name=org[0].name; password=org[0].password;
          description=org[0].description;  purpose=org[0].purpose;   website=org[0].website;
          rating=org[0].rating;  logo=org[0].logo;  email=org[0].email;  requestStatus=org[0].request;
          phoneNumber=org[0].phone_num;  countryID=org[0].country_id;  GovernorateID=org[0].governorate_id;
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
            hotlineTemp=hotline[0].Number;
        })
        .catch(err=> console.log(err))

    await  Organization.getSocailMedia(username)
        .then(([links])=>{
            
            for(let i=0;i<links.length;i++)
            {
                socailMediaLinksArray.push(links[i].socialmediaLink);
            }

        })
        .catch(err=> console.log(err))
    Org.name=name; Org.userName=username; Org.password=password;Org.country=countryName; Org.Governorate=GovernorateName;
    Org.Subcategory=SubcategoryName; Org.category=categoryName;
   Org.organizationType=organizationTypeName; Org.description=description; Org.purpose=purpose; Org.rating=rating;
   Org.website=website; Org.logo=logo; Org.requestStatus=requestStatus; Org.phoneNumber=phoneNumber; Org.location=locationArray;
   Org.hotline=hotlineTemp; Org.socialMedia=socailMediaLinksArray;
   res.status(200).json({Org});
   
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

    bcrypt.hash(new_password, 12)
    .then((hashedPassword)=>{
        const updatedOrg=new Organization(new_name,org_Username,hashedPassword,new_country,new_governorate,new_email,new_category,new_SubCategory,new_orgType
            ,new_description,new_purpose,new_rating,new_website,new_socialMedia,new_hotline,new_logo,new_requestStatus,new_phoneNumber,new_location);
         
            updatedOrg.updateProfileData(org_Username)
        .then(
            res.status(200).json({
                message:"User updated "
            }))
        .catch(err=> console.log(err));

        updatedOrg.updateLocations(org_Username,locationArray)
        updatedOrg.updateSocailMedia(org_Username,socailMediaLinksArray);
   
    })
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
