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

// exports.OrgProfile=function(req,res)
// {
//     const username=req.body.username;
    
//     Organization.getOrg(username)
//     .then(([org])=>{
    
//        res.status(200).json({org});  
//         // console.log(org[0])
//     })
//     .catch(err=> console.log(err))

// }

// exports.OrgProfileCategories=function(req,res){
//     const username=req.body.username;
//     Organization.getCategory(username)
//     .then(([category])=>{
//         res.status(200).json({category})
//        // console.log(category[0])
//     })
// }

// exports.OrgProfileSubCategories=function(req,res){
//     const username=req.body.username;
//     Organization.getSubCategory(username)
//     .then(([Subcategory])=>{
//         res.status(200).json({Subcategory})
//         //console.log(Subcategory[0])
//     })
// }
// exports.OrgProfileType=function(req,res){
//     const username=req.body.username;
//     Organization.getOrgType(username)
//     .then(([type])=>{
//         res.status(200).json({type})
//         console.log(type[0])
//     })
// }


// exports.OrgProfile=function(req,res)
// {
//     const username=req.body.username;
//     let nameTemp;let passwordTemp;let descriptionTemp;let purposeTemp;let websiteTemp; let ratingTemp;
//     let logoTemo;let emailTemp;let requestStatusTemp;let phoneNumberTemp;let countryTemp;let GovernorateTemp;
//     let categoryTemp;let subCategoryTemp; let organizationTypeTemp;
//     Organization.getOrg(username)
//     .then(([org])=>{
//          nameTemp=org[0].name; passwordTemp=org[0].password;
//          descriptionTemp=org[0].description; purposeTemp=org[0].purpose;  websiteTemp=org[0].website;
//          ratingTemp=org[0].rating; logoTemo=org[0].logo; emailTemp=org[0].email; requestStatusTemp=org[0].request;
//          phoneNumberTemp=org[0].phone_num; countryTemp=org[0].country_id; GovernorateTemp=org[0].governorate_id;
//          console.log(nameTemp)
//        // res.status(200).json({org});  
//         // console.log(org[0])

//         Organization.getCategory(username)
//         .then(([category])=>{
//             categoryTemp=category[0].Category_ID;
//             console.log("categoryTemp");
//             console.log(categoryTemp);
//         // res.status(200).json({category})
//         // console.log(category[0])
//         })
//         .catch(err=> console.log(err))

//     Organization.getSubCategory(username)
//     .then(([Subcategory])=>{
//         subCategoryTemp=Subcategory[0].Subcategory_ID;
//         //res.status(200).json({Subcategory})
//         //console.log(Subcategory[0])
//     })
//     .catch(err=> console.log(err))

//     Organization.getOrgType(username)
//     .then(([type])=>{
//         organizationTypeTemp=type[0].OrgType_ID;
//     //  res.status(200).json({type})
//         //console.log(type[0])
//     })
//     .catch(err=> console.log(err))

//     const name=nameTemp;
   
//     const password=passwordTemp;
//     const country=countryTemp;
//     const Governorate=GovernorateTemp;
//     const email=emailTemp;
//     const Category=categoryTemp;
//     const subCategory=subCategoryTemp;
//     const organizationType=organizationTypeTemp;
//     const description=descriptionTemp;
//     const purpose=purposeTemp;
//     const rating=ratingTemp;
//     const website=websiteTemp;
//     const logo=logoTemo;
//     const requestStatus=requestStatusTemp;
//     const phoneNumber=phoneNumberTemp;
//     const Org = new Organization(name,username,password,country,Governorate,email,Category,subCategory,organizationType,
//         description,purpose,rating,website,"klk","ll",logo,requestStatus,"ll",phoneNumber);
//         Org.Category=categoryTemp
//         res.status(200).json({Org}); 
//     })
//     .catch(err=> console.log(err))
    
   
   
// }


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
