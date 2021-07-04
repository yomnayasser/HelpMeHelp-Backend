var db=require('../Database/connection');
class recommender{

    static getEmbedUser(username)
    {
        return db.execute('select embed_user from user_embed where username= ?',[username]);
    }
    static getAllEmbedCampaigns()
    {
        return db.execute('select campaign_embed from campaign_embed');
    }
    static getCampaignInfo(embedCampaign)
    {
        
        db.execute('select camapaign_ID from campaign_embed where camapaign_embed=?',[embedCampaign]).then((campaignID)=>{
            db.execute('select * from campaign where ')
        })
    }
}
module.exports=recommender;