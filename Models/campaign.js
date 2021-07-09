const { decodeBase64 } = require("bcryptjs");
var db=require('../Database/connection');
var arabicNameToEn = require("arabic-name-to-en")
const smartSearch = require('smart-search')

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
    static add_volunteer(campaign_id)
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

        })
        .catch(err=> console.log(err));
        return promise;
    }
    static add_donation_campaign()
    {
        
    }
    static search(startRow,rowCount,text)
    {
        let promise= db.execute('select * from campaign limit ?,?',
        [startRow,rowCount]);
        promise.then((rows)=>{
            let campaigns=rows[0];
            let all_eng_campaigns=rows[0];
            //console.log(campaigns);
            //console.log(rows[0]);
            //console.log(campaigns[2].Name);
            //console.log(rows[0][2].Name);
            for(let i=0;i<campaigns.length;i++)
            {
                all_eng_campaigns[i].Name=arabicNameToEn(all_eng_campaigns[i].Name);
                all_eng_campaigns[i].Description=arabicNameToEn(all_eng_campaigns[i].Description);
            } 
            //console.log(campaigns[2].Name);
            //console.log(rows[0][2].Name);
            //console.log(all_eng_campaigns[2].Name);
            const entries = all_eng_campaigns;
            var patterns = [text];
            var fields = { Name: true, Description: true };
            var results = smartSearch(entries, patterns, fields);
            console.log(results);

        })
        .catch(err=> console.log(err));
        return promise;
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
    
    static getCampaignDonationTypeIDfromName(dontationTypeName)
    {
        return db.execute('select id from donation_type where Type=?',[dontationTypeName]);
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
    //calculateRating(double);
    //checkEnd();
    //excuteLaunchingStrategy();
    //excuteRegisterStrategy();
}
module.exports=campaign;