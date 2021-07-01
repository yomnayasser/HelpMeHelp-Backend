const account=require("./account");
var db=require('../Database/connection');
class Organization extends account
{
    constructor(name,userName,password,country,Governorate,email,category,subCategory,organizationType,description,purpose,rating,website,socialMedia,hotline,logo,requestStatus,phoneNumber,location)
    {
        super(name,userName,password,country,Governorate,email);
 
        this.categoryName=category;
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
    static getOrgTypeID(username)
    {
        return db.execute('Select OrgType_ID from has_organization_type where Org_username=?',[username]);
    }
    static getOrgTypeName(ID)
    {
        return db.execute('Select Type from organization_type where ID=?',[ID]);
    }

    static getLocation(username)
    {
        return db.execute('Select * from locations where Org_username=? ',[username]);
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
    static getCountryName(ID)
    {
        return db.execute('Select Name from country where ID=?',[ID]);
    }
    static login(username)
    {
        return db.execute('Select Username,password from organization where Username= ?',[username]);
    }
   static updateProfile(username)
    {
         db.execute('UPDATE organization SET name=?,password=?,description=?,purpose=?,website=?,rating=?,logo=?,email=?,request=?,phone_num=?,countryID=?,GovernorateID=? where username=?',
        [this.name,this.password,this.description,this.purpose,this.website,this.rating,this.logo,this.email,this.requestStatus,this.phoneNumber,this.country,this.Governorate,username]);

        db.execute('UPDATE locations SET location= ? where Org_username=?',[this.location,username])

        db.execute('UPDATE has_category SET Category_ID=? where Org_username=?',[this.category,username]);
        db.execute('UPDATE has_organization_type SET OrgType_ID=? where Org_username=?',[this.organizationType,username]);
        db.execute('UPDATE has_subcategory SET Subcategory_ID=? where Org_username=?',[this.subCategory,username]);




    }
    calculateRating()
    {

    }
    excuteRegisterStrategy()
    {

    }
}

module.exports=Organization;