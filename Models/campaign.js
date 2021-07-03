const { decodeBase64 } = require("bcryptjs");
var db=require('../Database/connection');

class campaign {
    constructor(ID,name,status,ownerID,ownerType,address,description,startDate,endDate,process,rating,image,LaunchingCampaignStrategy,campaignFactory){
        this.ID=ID;
        this.name=name;
        this.status=status;
        this.ownerID=ownerID;
        this.ownerType=ownerType;
        this.address=address;
        this.description=description;
        this.startDate=startDate;
        this.endDate=endDate;
        this.process=process;
        this.rating=rating;
        this.image=image;
        this.LaunchingCampaignStrategy=LaunchingCampaignStrategy;
        this.campaignFactory=campaignFactory;
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
    //calculateRating(double);
    //checkEnd();
    //excuteLaunchingStrategy();
    //excuteRegisterStrategy();
}
module.exports=campaign;