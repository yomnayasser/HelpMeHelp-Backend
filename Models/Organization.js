const account=require("./account");
var db=require('../Database/connection');
class Organization extends account
{
    constructor(name,userName,password,country,Governorate,email,category,subCategory,organizationType,description,purpose,rating,website,socialMedia,hotline,logo,requestStatus,phoneNumber,location)
    {
        super(name,userName,password,country,Governorate,email);
 
        this.category=category;
        this.subCategory=subCategory; 
        this.organizationType=organizationType; 
        this.description=description;
        this.purpose=purpose;
        this.rating=rating;
        this.website=website;
        this.socialMedia=socialMedia; 
        this.hotline=hotline; 
        this.logo=logo;
        this.requestStatus=requestStatus;
        this.location=location; 
        this.phoneNumber=phoneNumber; 
    }
    static getOrg(username)
    {
        return db.execute('Select * from organization where Username=?',[username]);

    }
    static getCategoryID(username)
    {
        return db.execute('Select Category_ID from has_category where Org_username=?',[username]);
    }

     getCategoryFromName(name)
    {
        return db.execute('Select ID from category where Name=?',[name]);
    }

    static getCategoryName(ID)
    {
        return db.execute('Select Name from category where ID=?',[ID]);
    }

    static getSubCategoryID(username)
    {
        return db.execute('Select Subcategory_ID from has_subcategory where Org_username=?',[username]);
    }
    static getSubCategoryName(ID)
    {
        return db.execute('Select Name from subcategory where ID=?',[ID]);
    }

    getSubCategoryIDFromName(name)
    {
        return db.execute('Select ID from subcategory where Name=?',[name]);
    }
    static getOrgTypeID(username)
    {
        return db.execute('Select OrgType_ID from has_organization_type where Org_username=?',[username]);
    }
    static getOrgTypeName(ID)
    {
        return db.execute('Select Type from organization_type where ID=?',[ID]);
    }
    getOrgTypeIDFromName(type)
    {
        return db.execute('Select ID from organization_type where Type=?',[type]);
    }

    static getLocation(username)
    {
        return db.execute('Select location from locations where Org_username=? ',[username]);
    }

    static getHotline(username)
    {
        return db.execute('Select Number from hotline where Org_username=? ',[username]);
    }

    static getSocailMedia(username)
    {
        return db.execute('Select socialmediaLink from socialmedia where Org_username=? ',[username]);
    }

    static getGovernorateName(ID)
    {
        return db.execute('Select Name from governorate where ID=?',[ID]);
    }
     getGovernorateID(name)
    {
        return db.execute('Select ID from governorate where Name=?',[name]);
    }
    static getCountryName(ID)
    {
        return db.execute('Select Name from country where ID=?',[ID]);
    }
     getCountryID(name)
    {
        return db.execute('Select ID from country where Name=?',[name]);
    }
    static login(username)
    {
        return db.execute('Select Username,password from organization where Username= ?',[username]);
    }
     updateProfileData(username)
    {
        return db.execute('UPDATE organization SET name=?,password=?,description=?,purpose=?,website=?,rating=?,logo=?,email=?,request=?,phone_num=? where Username=?',
        [this.name,this.password,this.description,this.purpose,this.website,this.rating,this.logo,this.email,this.requestStatus,this.phoneNumber,username])
        .then(db.execute('UPDATE hotline SET Number=? where Org_username=?',[this.hotline,username]))
        .then( this.getGovernorateID(this.Governorate)
        .then(([id])=>{ 
            return db.execute('UPDATE organization SET governorate_id=? where username=?',[id[0].ID,username]);
        }))
        .then( this.getCountryID(this.country)
        .then(([id])=>{ 
            return db.execute('UPDATE organization SET country_id=? where username=?',[id[0].ID,username]);
        }))
        .then( this.getCategoryFromName(this.category)
        .then(([id])=>{ 
            return db.execute('UPDATE has_category SET Category_ID=? where Org_username=?',[id[0].ID,username]);
        }))
        .then( this.getSubCategoryIDFromName(this.subCategory)
        .then(([id])=>{ 
            return db.execute('UPDATE has_subcategory SET Subcategory_ID=? where Org_username=?',[id[0].ID,username]);
        }))
        .then( this.getOrgTypeIDFromName(this.organizationType)
        .then(([id])=>{ 
            return db.execute('UPDATE has_organization_type SET OrgType_ID=? where Org_username=?',[id[0].ID,username]);
        }))
        .then()
        .catch(err=> console.log(err));
    }

    updateLocations(username,Orglocation)
    {  
       
        for(let i=0;i<Orglocation.length;i++)
        {
            if(Orglocation[i]!=this.location[i])
            {
               
                 db.execute('UPDATE locations SET location= ? where Org_username=? and location=?',[this.location[i],username,Orglocation[i]])
            }
        }
        return true;
    }
    updateSocailMedia(username,links)
    {  
        for(let i=0;i<links.length;i++)
        {
            if(links[i]!=this.socialMedia[i])
            {  
                 db.execute('UPDATE socialmedia SET socialmediaLink=? where Org_username=? and socialmediaLink=?',[this.socialMedia[i],username,links[i]])
            }
        }
        return true;
        
    }
    static get_rate(username)
    {
        return db.execute('select rating from organization where Username =? ',
        [username]);
    }
    static set_updated_rate(username,rate)
    {
        return db.execute('update organization set rating=? where Username=? ',
        [rate,username]);
    }
    calculateRating()
    {

    }
    excuteRegisterStrategy()
    {

    }
}

module.exports=Organization;



 // static displayProfileData()
    // {
    //     this.getOrg(username)
    //     .then(([org])=>{
    //          this.name=org[0].name; this.password=org[0].password;
    //           this.description=org[0].description;this.purpose=org[0].purpose; this.website=org[0].website;
    //           this.rating=org[0].rating;this.logo=org[0].logo;this.email=org[0].email;this.requestStatus=org[0].request;
    //           this.phoneNumber=org[0].phone_num;this.countryID=org[0].country_id;this.GovernorateID=org[0].governorate_id;
    //     })
    //     .catch(err=> console.log(err))
    
    //     this.getGovernorateName(GovernorateID)
    //         .then(([Gname])=>{
    //             GovernorateName=Gname[0].Name;
               
    //         })
    //         .catch(err=> console.log(err))
    
    //     await Organization.getCountryName(countryID)
    //     .then(([Cname])=>{
    //         countryName=Cname[0].Name;
            
    //     })
    //     .catch(err=> console.log(err))
        
    
    //     await Organization.getCategoryID(username)
    //     .then(([category])=>{
    //         categoryID=category[0].Category_ID;
           
    //     })
    //     .catch(err=> console.log(err))
    
    //     await Organization.getCategoryName(categoryID)
    //     .then(([name])=>{
    //         categoryName=name[0].Name;
    //     })
    //     .catch(err=> console.log(err))
    
    //     await Organization.getSubCategoryID(username)
    //     .then(([Subcategory])=>{
    //         SubcategoryID=Subcategory[0].Subcategory_ID;
    //     })
    //     .catch(err=> console.log(err))
    
    //     await Organization.getSubCategoryName(SubcategoryID)
    //     .then(([name])=>{
    //         SubcategoryName=name[0].Name;
    //     })
    //     .catch(err=> console.log(err))
    
    //     await Organization.getOrgTypeID(username)
    //     .then(([type])=>{
    //         organizationTypeID=type[0].OrgType_ID;
    //     })
    //     .catch(err=> console.log(err))
    
    //     await Organization.getOrgTypeName(organizationTypeID)
    //     .then(([name])=>{
    //         organizationTypeName=name[0].Type;
    //     })
    //     .catch(err=> console.log(err))
    
    //     await Organization.getLocation(username)
    //         .then(([location])=>{
                
    //             for(let i=0;i<location.length;i++)
    //             {
    //                 locationArray.push(location[i].location);
    //             }
    
    //         })
    //         .catch(err=> console.log(err))
    //    await Organization.getHotline(username)
    //         .then(([hotline])=>{
    //             hotlineTemp=hotline[0].Number;
    //         })
    //         .catch(err=> console.log(err))
    
    //     await  Organization.getSocailMedia(username)
    //         .then(([links])=>{
                
    //             for(let i=0;i<links.length;i++)
    //             {
    //                 socailMediaLinksArray.push(links[i].socialmediaLink);
    //             }
    
    //         })
    //         .catch(err=> console.log(err))
        
       
    
    //     Org.name=name; Org.userName=username; Org.password=password;Org.country=countryName; Org.Governorate=GovernorateName;
    //     Org.Subcategory=SubcategoryName; Org.category=categoryName;
    //    Org.organizationType=organizationTypeName; Org.description=description; Org.purpose=purpose; Org.rating=rating;
    //    Org.website=website; Org.logo=logo; Org.requestStatus=requestStatus; Org.phoneNumber=phoneNumber; Org.location=locationArray;
    //    Org.hotline=hotlineTemp; Org.socialMedia=socailMediaLinksArray;
    // }