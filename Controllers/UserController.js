const bcrypt = require('bcryptjs');
const User=require('../Models/User');

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