var db=require('../Database/connection');
const Organization=require('../Models/Organization')
class admin
{
    static addHotline(number,description)
    {
        return db.execute('select number from hotline where number= ?',[number])
        .then(([exist])=>{
            if(!exist[0])
            {
                return db.execute('insert into hotline(number,description) values (?,?)',[number,description]);
            }
            else
            {
                return null;
            }
        })
    }
    static addAdmin(username)
    {
        return db.execute('select username from user where username= ? ',[username])
        .then(([username])=>{
            if(!username[0])
            {
                return null;
            }
            else
            {
                return db.execute('UPDATE user SET role="admin" where username=?',[username]);
            }
        })
    }
    static viewAllPendingOrganizations()
    {
        return db.execute('select username from organization where request="pending"');
    }
    static GetOrganizations()
    {
         return db.execute('select username from organization');
    }
    static async getOrganizationInfo(username)
    {
        var Org=new Organization();
    let categoryID,categoryName,name,password,description,purpose,website,organizationTypeID,rating,logo,email,requestStatus,organizationTypeName,
    phoneNumber,countryID,countryName,GovernorateID,GovernorateName,hotlineTemp,SubcategoryID,SubcategoryName; 
    var socailMediaLinksArray = new Array(); 
    var locationArray = new Array();
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
        if(!category[0])
        {
            categoryName="";
        }
        else
        {
            categoryID=category[0].Category_ID;
            Organization.getCategoryName(categoryID)
            .then(([name])=>{
                categoryName=name[0].Name;
            })
            .catch(err=> console.log(err))
        }
    })
    .catch(err=> console.log(err))

    await Organization.getSubCategoryID(username)
    .then(([Subcategory])=>{
        if(!Subcategory[0])
        {
            SubcategoryName="";
        }
        else
        {
            SubcategoryID=Subcategory[0].Subcategory_ID;
            Organization.getSubCategoryName(SubcategoryID)
            .then(([name])=>{
                SubcategoryName=name[0].Name;
            })
            .catch(err=> console.log(err))
        }
    })
    .catch(err=> console.log(err))

    await Organization.getOrgTypeID(username)
    .then(([type])=>{
        if(!type[0])
        {
            organizationTypeName="";
        }
        else
        {
            organizationTypeID=type[0].OrgType_ID;
            Organization.getOrgTypeName(organizationTypeID)
            .then(([name])=>{
                organizationTypeName=name[0].Type;
            })
            .catch(err=> console.log(err))
        }
    })
    .catch(err=> console.log(err))

    await Organization.getLocation(username)
        .then(([location])=>{
            if(!location)
            {
                locationArray=null;
            }
            else
            {
                for(let i=0;i<location.length;i++)
                {
                    locationArray.push(location[i].location);
                }
            }
        })
        .catch(err=> console.log(err))
   await Organization.getHotline(username)
        .then(([hotline])=>{
            if(!hotline[0])
            {
                hotlineTemp=null;
            }
            else{
                hotlineTemp=hotline[0].Number;
            }
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

        Org=new Organization(name,username,password,countryName,GovernorateName,email,categoryName,SubcategoryName
        ,organizationTypeName,description,purpose,rating,website,socailMediaLinksArray,hotlineTemp,logo,requestStatus,
        phoneNumber,locationArray);
        //console.log(Org);
        return Org;
    }
    static acceptOrganization(Organization_userName)
    {
        return db.execute('UPDATE organization SET request="accepted" where username= ?',[Organization_userName]);
    }
    static removeOrganization(Organization_userName)
    {
        return db.execute("Delete from has_category where org_username=?",[Organization_userName])
        .then(db.execute("Delete from has_subcategory where org_username=?",[Organization_userName]))
        .then(db.execute("Delete from has_organization_type where org_username=?",[Organization_userName]))
        .then( db.execute("Select Number from hotline where org_username=?",[Organization_userName])
        .then(([number])=>{ 
            if(number[0].Number!=null)
            {
                console.log("hereeeeee")
            return db.execute("Delete from hotline where org_username=?",[Organization_userName])
            }
        }))
        // .then(db.execute("Delete from hotline where org_username=?",[Organization_userName]))
        .then(db.execute("Delete from locations where org_username=?",[Organization_userName]))
        .then( db.execute("Select socialmediaLink from socialmedia where Org_username=?",[Organization_userName])
        .then(([links])=>{ 
            if(links[0].socialmediaLink!=null)
            {
            return db.execute("Delete from hotline where org_username=?",[Organization_userName])
            }
        }))
        //.then(db.execute("Delete from socialmedia where org_username=?",[Organization_userName]))
        .then(db.execute("DELETE FROM organization WHERE username=?",[Organization_userName]))
        .catch(err=> console.log(err));
    }
}
module.exports=admin;