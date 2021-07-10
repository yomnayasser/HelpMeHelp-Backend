const { decodeBase64 } = require("bcryptjs");
var db=require('../Database/connection');
var arabicNameToEn = require("arabic-name-to-en")
const smartSearch = require('smart-search');
const { search } = require("./Organization");
var nodeq = require("node-q");
const { pause } = require("../Database/connection");

class campaign {
    constructor(name,status,orgUsername,U_username,address,description,process,startDate,endDate,progress,target,image,dontationTypeID,QuizLink){
        // this.ID=ID;
        this.name=name;
        this.status=status;
        this.orgUsername=orgUsername;
        this.U_username=U_username;
        this.address=address;
        this.description=description;
        this.process=process;
        this.startDate=startDate;
        this.endDate=endDate;
        this.progress=progress;
        this.target=target;
        // this.rating=rating;
        this.image=image;
        this.dontationTypeID=dontationTypeID;
        this.QuizLink=QuizLink;
        // this.LaunchingCampaignStrategy=LaunchingCampaignStrategy;
        // this.campaignFactory=campaignFactory;
    }
    static getCampaginDeitals(campaign_id)
    {
        return db.execute('select * from campaign where Campaign_ID=?',
        [campaign_id]);
    }
    static getDonationType(campaign_id)
    {
        return db.execute('select DonationType from campaign where Campaign_ID=?',
        [campaign_id]);
    }
    static get_targetandprogress(campaign_id)
    {
        return db.execute('select Progress,Target from campaign where Campaign_ID=?',
        [campaign_id]);
    }
    static change_status_to_complete(campaign_id)
    {
        return db.execute('update campaign set Status=? where Campaign_ID=?',
        ["complete",campaign_id]);
    }
    static update_progress(new_progress,campaign_id)
    {
        return db.execute('update campaign set Progress=? where Campaign_ID =?',
        [new_progress,campaign_id]);
    }
    static add_volunteer(campaign_id,username,date)
    {
        let promise=this.get_targetandprogress(campaign_id);
        promise.then(([rows])=>{
            let row=rows[0];
            let target=parseFloat(row.Target);
            let Progress=parseFloat(row.Progress);
            let new_progress=Progress+1;
            if(new_progress==target)
            {
                this.change_status_to_complete(campaign_id);
            }
            this.update_progress(new_progress,campaign_id);
            return db.execute('INSERT INTO `join`(Campaign_ID,Username,Date_join) VALUES (?, ?, ?)',
            [campaign_id,username,date]).then(()=>{
                db.execute('update `approve` Set userstate=? where campaignid=? and username= ?'
                ,["accepted",campaign_id,username]);
            })
        })
        .catch(err=> console.log(err));
        return promise;
    }
    static reject_volunteer(campaign_id,username)
    {
        return db.execute('update `approve` Set userstate=? where campaignid=? and username= ?'
        ,["Rejeted",campaign_id,username]);
    }
    static reject_donor(campaign_id,username)
    {
        return db.execute('update request_donation Set request_status=? where campaign_id=? and username= ?'
        ,["Rejeted",campaign_id,username]);
    }
    static add_donor(campaign_id,username,date,Donation_val)
    {
        let promise=this.get_targetandprogress(campaign_id);
         promise.then(([rows])=>{
            let row=rows[0];
            let target=parseFloat(row.Target);
            let Progress=parseFloat(row.Progress);
            let new_progress=Progress+Donation_val;
            if(new_progress==target)
            {
                campaign.change_status_to_complete(campaign_id);
            }       
            campaign.update_progress(new_progress,campaign_id);
            //console.log(date);
            console.log(campaign_id,"+",username,"+",Donation_val,"+",date)
            return db.execute('INSERT INTO `join` VALUES (?, ?, ?, ?)',
            [campaign_id,username,Donation_val,date]).then(()=>{
                db.execute('update request_donation Set Request_status=? where campaign_id=? and username= ?'
                ,["accepted",campaign_id,username]);
            })
    })
    .catch(err=> console.log(err));
    return promise;
    }
    
    static search(startRow,rowCount,text,campaigns)
    {
        //let campaigns=[];
        let promise= db.execute('select * from campaign limit ?,?',
        [startRow,rowCount]);
        var all_eng_campaigns=[]
        promise.then((rows)=>{
            //console.log(rows[0]);
            for(let i=0;i<rows[0].length;i++)
            {
                all_eng_campaigns.push({id:rows[0][i].Campaign_ID,name:rows[0][i].Name,desc:rows[0][i].Description});
            }
            //console.log(all_eng_campaigns);
            //var all_eng_campaigns=rows[0];
            //const temp=all_eng_campaigns;
            //console.log(all_eng_campaigns);
            for(let i=0;i<all_eng_campaigns.length;i++)
            {
                all_eng_campaigns[i].name=arabicNameToEn(all_eng_campaigns[i].name);
                all_eng_campaigns[i].desc=arabicNameToEn(all_eng_campaigns[i].desc);
            } 
            //console.log(rows[0]);
            const entries = all_eng_campaigns;
            var patterns = [text];
            var fields = { name: true, desc: true };
            var results = smartSearch(entries, patterns, fields);
            //console.log(results);
            for(let i=0;i<results.length;i++)
            {
                for(let j=0;j<rows[0].length;j++)
                {
                    //console.log(results[i].entry.id);

                    if(results[i].entry.id==rows[0][j].Campaign_ID)
                    {
                        console.log("da5l2");
                        campaigns.push(rows[0][j]);
                        //console.log(campaigns);
                    }
                }
            }
            //console.log(campaigns);
            //return promise;
            //this.sleep(10000).then(() => {
                
            //});
            //this.paused();
            
            /*for(let i=0;i<results.length;i++)
            {
                db.execute('select * from campaign where Campaign_ID=? limit ?,?',[results[i].entry.Campaign_ID,startRow,rowCount])
                .then(([campaign])=>{
                    campaigns.push(campaign[0]);
                    //console.log(campaign[0]);
                })
                .catch(err=> console.log(err));
            }*/
            
            //console.log(campaigns[0]);
            //return campaigns;
            
        })
        .catch(err=> console.log(err));
        return promise;
    }
    static sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));
    static async paused() {

        await new Promise(resolve => setTimeout(resolve, 10000));
    }
    static getPendingApplicants(ID)
    {
        return db.execute('Select Username from `approve` where CampaignID=? and Userstate="Pending"',[ID]);
    }

    static getUserCampaignsIDS(username)
    {
        return db.execute('Select Campaign_ID from `join` where Username=?',[username]);
    }

    static getAllCampaigns()
    {
        return db.execute('select * from campaign')
    }
    
    static getAllUserCampaigns(ID)
    {
        return db.execute('Select * from campaign where Campaign_ID=?',[ID]);
    }
    static getDonationTypeNameFromId(dontationTypeID)
    {
        return db.execute('select type from donation_type where ID=?',[dontationTypeID]);
    }    
    static getCampaignDonationTypeIDfromName(dontationTypeName)
    {
        return db.execute('select ID from donation_type where Type=?',[dontationTypeName]);
    }
    addVolunteeringOrDonationCampaign()
    {
        return db.query('insert into campaign(name,address,status,quizlink,description,image,target,startdate,enddate,progress,org_username,u_username,donationtype,process) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
        ,[this.name,this.address,this.status,this.QuizLink,this.description,this.image,this.target,this.startDate,this.endDate,this.progress,this.orgUsername,this.U_username,this.dontationTypeID,this.process]);
    }
    static addCampaignToEmbedCampaign(id)
    {
        return db.execute('SELECT MAX(campaign_embed) as maxid FROM campaign_embed').then(([maxid])=>{
            if(maxid[0]==null)
            {
                return db.execute('insert into campaign_embed values(?,?)',[id,1]);  
            }
            else{
                return db.execute('insert into campaign_embed values(?,?)',[id,(maxid[0].maxid+1)]);
            }
        })
    }
    static updateFinishedCampaignsStatus(campaign_id)
    {
        return db.execute('update campaign set status=? where campaign_id=?',["finished",campaign_id]);
    }
    static updateToOngoingCampaignsStatus(campaign_id)
    {
        return db.execute('update campaign set status=? where campaign_id=?',["ongoing",campaign_id]);
    }
    static getDonationValue(camp_id,username)
    {
        return db.execute('select Donation_val from request_donation where campaign_id=? and username=?'
        ,[camp_id,username]);
    }
    static getAllCampaignsUserMade(username)
    {
        return db.execute('Select * from campaign where U_username=?',[username]);
    }
    static getDonationPendingApplicants(ID)
    {
        return db.execute('Select Username from request_donation where Campaign_ID=? and request_status="Pending"',[ID]);
    }

    //calculateRating(double);
    //checkEnd();
    //excuteLaunchingStrategy();
    //excuteRegisterStrategy();
}
module.exports=campaign;