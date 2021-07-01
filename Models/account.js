class account
{
    constructor(name,userName,password,country,Governorate,email)
    {
       // this.ID=ID;
       this.name=name;
        this.userName=userName;
        this.password=password;
        this.country=country;
        this.Governorate=Governorate;
        this.email=email;
      //  this.registerStrategy=registerStrategy;
    }
    login(userName,password)
    {
        throw new Error("Abstract Method has no implementation");
    }
    updateProfile(username)
    {
        //throw new Error("Abstract Method has no implementation");
    }
    approveApplicants(VolunteerCampaign)
    {

    }
}
module.exports=account;
