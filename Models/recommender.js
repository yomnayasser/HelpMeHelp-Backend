var db=require('../Database/connection');
const Campaign=require('../Models/campaign')
class recommender{

    static getEmbedUser(username)
    {
        return db.execute('select embed_user from user_embed where username= ?',[username]);
    }
    static getAllOngoingCampaignIDS(){
        return db.execute('select Campaign_ID from campaign where Status="ongoing"');
    }
    static getEmbedCampaigns(campID)
    {
        return db.execute('select campaign_embed from campaign_embed where campaign_ID=?',[campID]);
    }
    static getCampaignID(embedCampaign)
    {
        return db.execute('select campaign_ID from campaign_embed where campaign_embed=?',[embedCampaign])
        // .then(([campaignID])=>{
        //     console.log(`camp id: ${campaignID[0].campaign_ID}`)
            
        //     Campaign.getCampaginDeitals(campaignID[0].campaign_ID)
        //     // .then(([camp])=>{
        //     //     console.log(camp);
        //     //     return camp;
        //     // })      
        // })
    }
    static getAllInteractions()
    {
        let date_ob = new Date();
        // current date
        // adjust 0 before single digit date
        let date = ("0" + date_ob.getDate()).slice(-2);
        // current month
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        // current year
        let year = parseInt(date_ob.getFullYear())-1;

        let currentDate=""+year + "-" + month + "-" + date;
        return db.execute('select campEmbed,userEmbed,interactionType from interactions where date > ?',[currentDate]);
    }
}
module.exports=recommender;