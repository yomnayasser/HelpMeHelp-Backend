const account=require("./account");
var db=require('../Database/connection');

class User extends account
{
    constructor(name,userName,password,country,Governorate,email,age,address,birthday,role)
    {
        super(name,userName,password,country,Governorate,email);
        this.age=age;
        this.address=address;
        this.birthday=birthday;
        // this.zakatAmount=zakatAmount;
        // this.zakatProgress=zakatProgress;
        this.role=role;
        //this.interests=interests;
        //this.skills=skills;
       // this.donationHistory=donationHistory;
        //this.joinedCampaigns=joinedCampaigns;
    }
    static findbyID(username)
    {
        return db.execute('Select * from user where Username = ?',[username]);
    }
    static getUserCountry(countryID)
    {
        return db.execute('select name from country where countryID= ?',[countryID]);
    }
    static getUserGovernorate(governorateID)
    {
        return db.execute('select name from governorate where governorateID= ?',[governorateID]);
    }
    login()
    {

    }
    updateSchedule()
    {
        
    }
    excuteRegisterStrategy()
    {

    }
    updateProfile(username)
    {
        return db.execute('UPDATE user SET name=?,password=?,email=?,age=?,address=?,birthdate=?,countryID=?,GovernorateID=? where username=?',[this.name,this.password,this.email,this.age,this.address,this.birthday,this.country,this.Governorate,username]);
    }
    rateCampaign(id,rate)
    {

    }
    donate(amount,campID)
    {

    }
    joinCampaign(campaign)
    {

    }
    updateZakat(double)
    {

    }
    
    
}
module.exports=User;