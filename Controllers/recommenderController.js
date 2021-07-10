const recommender=require('../Models/recommender');
const Campaign=require('../Models/campaign')
const index=require('../index');
const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');
const modelPath = "http://localhost:8080/tfjs_campaign_recommender/model.json";
// const modelID = 'mode_name';
// const modelPath = `localstorage://${modelID}`;

// let model = loadModel();
let userRecDict = {};

const loadModel = async () => {
    const model = await tf.loadLayersModel(modelPath);
    model.summary();
    return model;
}
const getUserRecs = async (model, embed_id, campaigns)=>{
    // console.log(campaigns);
    let num = Math.floor(campaigns.length*0.2)
    await tf.ready();
    // .then(() => {
        const tf_cids = tf.tensor1d(campaigns);
        let tf_uid = tf.tensor1d(embed_id);
        const predRes = model.predict([tf_cids, tf_uid]);
        // console.log(predRes.shape);
        
        res = predRes.reshape([-1]);
        
        const {values, indices} = tf.topk(res, k=num);
        
        let indx = indices.dataSync();
        // console.log(indx);
        return indx;
    // });
}

const saveModel = async ()=>{
    const handler = tfn.io.fileSystem("./tfjs_campaign_recommender/model.json");
    const saveModelResults = await model.save(handler); 
    console.log('model exported');

}

const retrainModel = ()=>{
    recommender.getAllInteractions().then(([i])=>{
        model.compile({
            loss: 'meanSquaredError',
            optimizer: tf.train.adam(0.001),
            metrics: ["accuracy"]
        });
        model.fit([i.campEmbed, i.userEmbed], i.interactionType, {epochs:5}).then(()=>{
            saveModel();
        });
    });
}

exports.getRecommendedVolunteerCampaigns= async function(req,res){
    // if(embed_id in userRecDict){
    //     // return userRecDict[embed_id];
    //     res.status(200).json(userRecDict[embed_id]);
    // }
    console.log('recommending volunteer campaigns for user: '+req.params.id);
    const model = index.model1;
    let embed_id;
    await recommender.getEmbedUser(req.params.id).then(([id])=>embed_id=id[0].embed_user);
    let campaignIDs;
    await recommender.getAllOngoingCampaignIDS().then(([camps])=>{campaignIDs=camps;});
    let c_arr=[];
    for(let i=0; i<campaignIDs.length; i++){
        let embed;
        await recommender.getEmbedCampaigns(campaignIDs[i].Campaign_ID).then(([campaign_embed])=>{
            embed= campaign_embed[0].campaign_embed;
        })
        c_arr.push(embed)
    }
    // console.log(c_arr.length);
    // console.log(campaigns);
    // let c_arr = (()=>{u=[]; for(let i = 0; i < campaigns.length; i++)u.push(campaigns[i].campaign_embed); return u;})();
    let u_arr = (()=>{u=[]; for(let i = 0; i < c_arr.length; i++)u.push(embed_id); return u;})();
    let indx = await getUserRecs(model, u_arr, c_arr);
    let campRes = [];
    for(let i=0; i<indx.length; i++){
        // console.log(`indx: ${i}, camp embed: ${c_arr[i]}`);
        let cid;
        await recommender.getCampaignID(c_arr[i])
        .then(([campaignID])=>{
            cid= campaignID;
        }).catch(err=> console.log(err));
        await Campaign.getCampaginDeitals(cid[0].campaign_ID)
        .then(([c])=>{
        campRes.push(c[0]);
            })
            // console.log('in then');
    }
    userRecDict[embed_id] = campRes;
    console.log(`res: ${campRes}`);
    campRes.filter((campaign)=>campaign.DonationType==1);
    res.status(200).json(campRes);
}
exports.getRecommendedDonationCampaigns=async function(req,res){
    // if(embed_id in userRecDict){
    //     // return userRecDict[embed_id];
    //     res.status(200).json(userRecDict[embed_id]);
    // }
    const model = index.model1;
    let embed_id;
    await recommender.getEmbedUser(req.params.id).then(([id])=>embed_id=id[0].embed_user);
    let campaignIDs;
    await recommender.getAllOngoingCampaignIDS().then(([camps])=>{campaignIDs=camps;});
    let c_arr=[];
    for(let i=0; i<campaignIDs.length; i++){
        let embed;
        await recommender.getEmbedCampaigns(campaignIDs[i].Campaign_ID).then(([campaign_embed])=>{
            embed= campaign_embed[0].campaign_embed;
        })
        // console.log(embed);
        c_arr.push(embed)
    }
    // console.log(campaigns);
    // let c_arr = (()=>{u=[]; for(let i = 0; i < campaigns.length; i++)u.push(campaigns[i].campaign_embed); return u;})();
    let u_arr = (()=>{u=[]; for(let i = 0; i < c_arr.length; i++)u.push(embed_id); return u;})();
    let indx = await getUserRecs(model, u_arr, c_arr);
    let campRes = [];
    for(let i=0; i<indx.length; i++){
        // console.log(`indx: ${i}, camp embed: ${c_arr[i]}`);
        let cid;
        await recommender.getCampaignID(c_arr[i])
        .then(([campaignID])=>{
            cid= campaignID;
        }).catch(err=> console.log(err));
        await Campaign.getCampaginDeitals(cid[0].campaign_ID)
        .then(([c])=>{
        campRes.push(c[0]);
            })
            // console.log('in then');
    }
    userRecDict[embed_id] = campRes;
    let r = campRes.filter((campaign)=>campaign.DonationType!=1);
    // console.log(`res: ${r}`);
    
    res.status(200).json({r});
}