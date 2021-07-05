const account=require("./account");
var db=require('../Database/connection');
const org=require("./Organization");
const campaign=require("./campaign");

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
        return db.execute('select Name from country where ID= ?',[countryID]);
    }
    static getUserGovernorate(governorateID)
    {
        return db.execute('select Name from governorate where ID= ?',[governorateID]);
    }
    static rateCampaign(org_username,rate,username)
    {
        let promise=org.get_rate(org_username)
        promise.then(([rows])=>{
            let row=rows[0];
            let oldratestr=row.rating;
            let oldrate=parseFloat(oldratestr);
            
            let new_rate=(oldrate+rate)/2;
            console.log(new_rate);
            org.set_updated_rate(org_username,new_rate);
            return db.execute('insert into rate values(?,?,?)',
            [org_username,username,rate]);
        })
        .catch(err=> console.log(err));
        return promise;
    }
    updateSchedule()
    {
        
    }
    excuteRegisterStrategy()
    {

    }
    updateProfile(username)
    {
        return db.execute('UPDATE user SET Name=?,Password=?,Email=?,Age=?,Address=?,BirthDate=?,countryID=?,GovernorateID=? where username=?',[this.name,this.password,this.email,this.age,this.address,this.birthday,this.country,this.Governorate,username]);
    }
    static donate(amount,campID,username,date)
    {
        let promise=campaign.get_targetandprogress(campID);
        promise.then(([rows])=>{
            let row=rows[0];
            let target=parseFloat(row.Target);
            let Progress=parseFloat(row.Progress);
            let new_progress=Progress+amount;
            if(new_progress==target)
            {
                campaign.change_status_to_complete(campID);
            }
            
            campaign.update_progress(new_progress,campID);
            //console.log(date);
            return db.execute('INSERT INTO `join` VALUES (?, ?, ?, ?)',
            [campID,username,amount,date]);
        })
        .catch(err=> console.log(err));
        return promise;
    }
    static joinCampaign(campaign_id,username,userstate)
    {
        return db.execute('INSERT INTO `approve` VALUES (?, ?, ?)',
        [campaign_id,username,userstate]);
    }
    static approveJoinRequest(campaign_id,username,date)
    {
        campaign.add_volunteer(campaign_id);
        db.execute('INSERT INTO `join`(Campaign_ID,Username,Date_join) VALUES (?, ?, ?)',
        [campaign_id,username,date]);
        return db.execute('Delete from approve where CampaignID=? and Username=?',
        [campaign_id,username]);

    }
    static get_donation_history(username)
    {
        return db.execute('select Campaign_ID,Donation_val,Date_join from `join` where Username=? and Donation_val is not null',
        [username]);
    }
    updateZakat(double)
    {

    }
    
    
}
module.exports=User;