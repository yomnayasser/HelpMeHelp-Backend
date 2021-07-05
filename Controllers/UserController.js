const bcrypt = require('bcryptjs');
const User=require('../Models/User');
const campaign=require("../Models/campaign");
const org=require("../Models/Organization");
const hotline=require("../Models/hotline");
const chat=require("../Models/chat");
var arabicNameToEn = require("arabic-name-to-en")

/*exports.getOldMessages=function(req,res){
    const chatID=req.body.chatID;
    const chatType=req.body.chatType;
    chat.get_old_messages(chatType,chatID)
    .then(([messages])=>{
        res.status(200).json({message:'message returned'});
        console.log(messages[0].Text);
    })
    .catch(err=>console.log(err));
}*/
/*exports.saveMessage=function(req,res){
    const message=req.body.message;
    const sender=req.body.sender;
    const chatID=req.body.chatID;
    const chatType=req.body.chatType;
    const senderType=req.body.senderType;
    chat.save_message(message,sender,chatID,chatType,senderType)
    .then(()=>{
        res.status(200).json({message:'message done'});
        //console.log(messages);
    })
    .catch(err=>console.log(err));
}*/
/*exports.chat=function(req,res){
    const sender=req.body.sender;
    const reciever=req.body.reciever;
    const chatType=req.body.chatType;
    chat.add_chat(sender,reciever,chatType)
    .then(()=>{
        res.status(200).json({message:'chat done'});
        chat.get_id(sender,reciever,chatType)
        .then(([Chat_ID])=>{
            console.log(Chat_ID[0].Chat_ID);
        })
        .catch(err=>console.log(err));
    })
    .catch(err=>console.log(err));
}*/
exports.search=function(req,res){
    const startRow=req.body.startRow;
    const rowCount=req.body.rowCount;
    const arabic_text=req.body.text;
    const text=arabicNameToEn(arabic_text);
    console.log(text);
    //hotline.search(startRow,rowCount,text)
    //org.search(startRow,rowCount,text);
    campaign.search(startRow,rowCount,text)
    .then(()=>{
        res.status(200).json({message:'search done'});       
    })
    .catch(err=>console.log(err));
}
/*exports.history=function(req,res){
    const username=req.body.username;
    User.get_donation_history(username)
    .then((hist)=>{
        res.status(200).json({message:'history done'});
        console.log(hist);
    })
    .catch(err=>console.log(err));
}*/
/*exports.approve=function(req,res){
    const campid=req.body.campid;
    const username=req.body.username;
    const date=req.body.date;
    User.approveJoinRequest(campid,username,date)
    .then(()=>{
        res.status(200).json({message:'approve done'});
    })
    .catch(err=>console.log(err));
}*/
exports.join=function(req,res){
    const campid=req.body.campid;
    const username=req.body.username;
    const userstate=req.body.userstate;
    User.joinCampaign(campid,username,userstate)
    .then(()=>{
        res.status(200).json({message:'join done'});
    })
    .catch(err=>console.log(err));
}
exports.donate=function(req,res){
    const campid=req.body.campid;
    const username=req.body.username;
    const amount=req.body.amount;
    const date=req.body.date;
    User.donate(amount,campid,username,date)
    .then(()=>{
        res.status(200).json({message:'donation done'});
    })
    .catch(err=>console.log(err));
}
exports.addUserRate=function(req,res){
    const campaign_id=req.body.org_username;
    const rate=req.body.rate;
    const username=req.body.username;
    User.rateCampaign(campaign_id,rate,username)
    .then(()=>{
        res.status(200).json({message:'rating done'});
    })
    .catch(err=>console.log(err));
}

exports.GetUser=function(req,res){
    const username=req.body.username;
    const pass=req.body.password;
    User.findbyID(username)
    .then(([user])=>{
        if(!user[0])
        {
             res.status(400).json({message:"not found" });
        }
        else
        {
            bcrypt.compare(pass,user[0].password)
            .then(doMatch =>{
                if(doMatch)
                {
                    //const loggedInUser=new User(user.name,user.username,user.password,user.country,user.Governorate,user.email,user.age,user.address,user.birthday,user.role);
                    //maza ba3d? 
                     res.status(200).json({ message:"you are logged in"});            
                };
            
                res.status(400).json({message:"wrong password"});
            })
            .catch(err=> console.log(err));
        }      
    })
    .catch(err=> console.log(err));
}
exports.PostUpdatedUser=function(req,res){
    const user_Username=req.params.id;
    const new_name=req.body.name;
    const new_password=req.body.password;
    const new_email=req.body.email;
    const new_age=req.body.age;
    const new_address=req.body.address;
    const new_birthday=req.body.birthday;
    const new_country=req.body.country;
    const new_governorate=req.body.governorate;
    User.findbyID(user_Username)
    .then(([user])=>{
        bcrypt.hash(new_password, 12)
        .then((hashedPassword)=>{
            const updatedUser=new User(new_name,user_Username,hashedPassword,new_country,new_governorate,new_email,new_age,new_address,new_birthday,user.role);
            updatedUser.updateProfile(user_Username)
            .then(
                res.status(200).json({
                    message:"User updated"
                }))
            .catch(err=> console.log(err));
        })
    })
    .catch(err=> console.log(err));
}