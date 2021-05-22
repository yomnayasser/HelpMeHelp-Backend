const account=require("./account");
class Organization extends account
{
    constructor(category,subCategory,organizationType,description,purpose,rating,website,socialMedia,hotline,logo,requestStatus,location)
    {
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
    }
    login()
    {

    }
    updateProfile()
    {

    }
    calculateRating()
    {

    }
    excuteRegisterStrategy()
    {

    }
}