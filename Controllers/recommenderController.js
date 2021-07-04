const recommender=require('../Models/recommender');
const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');
const model_url = "http://localhost:8080/tfjs_campaign_rec/model.json";

const loadModel = async () => {
    const model = await tf.loadLayersModel(model_url);
    return model;
}
const getUserRecs = (model, embed_id, campaigns)=>{
    const predRes = model.predict([campaigns, embed_id]);
    res = predRes.reshape([-1]);
    // console.log(res.shape);
    
    const {values, indices} = tf.topk(res, k=20);
    let campRes = [];
    camps = campaigns.dataSync();
    indx = indices.dataSync();
    indx.forEach((i)=>{
        let c = recommender.getCampaignInfo(camps[i]);
        campRes.push(c);
    });

    return campRes;
}
exports.getRecommendedVolunteerCampaigns=function(req,res){

}
exports.getRecommendedDonationCampaigns=function(req,res){
    
}