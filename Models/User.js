const account=require("./account");
var db=require('../Database/connection');
const org=require("./Organization");
const campaign=require("./campaign");

class User extends account
{
    constructor(name,userName,password,country,Governorate,email,age,address,birthday,role,image)
    {
        super(name,userName,password,country,Governorate,email);
        this.age=age;
        this.address=address;
        this.birthday=birthday;
        this.role=role;
        this.image=image;
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
    getGovernorateID(name)
    {
        return db.execute('Select ID from governorate where Name=?',[name]);
    }
    getCountryID(name)
    {
        return db.execute('Select ID from country where Name=?',[name]);
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
        return db.execute('UPDATE user SET Name=?,password=?,email=?,Age=?,Address=?,birthdate=?,image=? where Username=?'
        ,[this.name,this.password,this.email,this.age,this.address,this.birthday,this.image,username])
        .then( this.getGovernorateID(this.Governorate)
        .then(([id])=>{ 
            return db.execute('UPDATE user SET governorateID=? where username=?',[id[0].ID,username]);
        }))
        .then( this.getCountryID(this.country)
        .then(([id])=>{ 
            return db.execute('UPDATE user SET countryID=? where username=?',[id[0].ID,username]);
        }))
        .catch(err=> console.log(err));
    }
    static donate(Donation_val,campaign_id,username,RequestStatus)
    {
        return db.execute('INSERT INTO request_donation VALUES (?, ?, ?, ?)',
        [campaign_id,username,Donation_val,RequestStatus]);
    }
    static joinCampaign(campaign_id,username,userstate)
    {
        return db.execute('INSERT INTO `approve` VALUES (?, ?, ?)',
        [campaign_id,username,userstate]);
    }
    // static approveDonorRequest(campaign_id,username,Donation_val)
    // {
    //     campaign.add_donor(campaign_id,username,new Date(),Donation_val);
    //     // return db.execute('Delete from approve where CampaignID=? and Username=?',
    //     // [campaign_id,username]);
    // }
    static get_donation_history(username)
    {
        return db.execute('select Campaign_ID,Donation_val,Date_join from `join` where Username=? and Donation_val is not null',
        [username]);
    }
    static get_volunteer_history(username)
    {
        return db.execute('select Campaign_ID,Date_join from `join` where Username=? and Donation_val is null',
        [username]);
    }
    static getUserRole(username)
    {
        return db.execute('Select role from user where Username = ?',[username]);
    }

    static getUserCampaginStatus(username,ID)
    {
        return db.execute('Select Userstate from `approve` where Username = ? and CampaignID=?',[username,ID]);
    }
    register()
    {
        try{
            return this.getCountryID(this.country).then(([countryID])=>{
                this.getGovernorateID(this.Governorate).then(([governorateID])=>{
                    db.execute('insert into user values(?,?,?,?,?,?,?,?,?,?,?)'
                    ,[this.userName,this.name,this.age,this.address,this.email,this.image,this.password,this.role,this.birthday,countryID[0].ID,governorateID[0].ID])
                    .then(()=>{
                        db.execute('SELECT MAX(embed_user) as maxid FROM user_embed').then(([maxid])=>{
                            if(maxid[0]==null)
                            {
                                return db.execute('insert into user_embed values(?,?)',[this.userName,1]);  
                            }
                            else{
                                return db.execute('insert into user_embed values(?,?)',[this.userName,(maxid[0].maxid+1)]);
                            }
                        })
                    })
                }).catch(err=> console.log(err));
            })
        }
        catch(err){
            err=> console.log(err);
        }
    }
    
    
}
module.exports=User;