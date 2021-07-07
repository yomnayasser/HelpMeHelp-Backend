const bcrypt = require('bcryptjs');
const Cryptr=require('cryptr')
const cryptr = new Cryptr('myTotalySecretKey');
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
    const password=req.body.password;
    let role;
    User.findbyID(username)
    .then(([user])=>{
        if(!user[0])
        {
             res.send({message:"NA" });
        }
        else
        {
            const decryptedPassword=cryptr.decrypt(user[0].password);
            if(password==decryptedPassword)
            {   
                User.getUserRole(username)
                .then(([role])=>{
                    role=role[0].role
                    res.send({role})
                })
                .catch(err=> console.log(err));
                 
            }
            else
            {
                role="false"
                res.send({role})
            }
        }      
    })
    .catch(err=> console.log(err));
}
// exports.PostUpdatedUser=function(req,res){
//     const user_Username=req.params.id;
//     const new_name=req.body.name;
//     const new_password=req.body.password;
//     const new_email=req.body.email;
//     const new_age=req.body.age;
//     const new_address=req.body.address;
//     const new_birthday=req.body.birthday;
//     const new_country=req.body.country;
//     const new_governorate=req.body.governorate;
//     User.findbyID(user_Username)
//     .then(([user])=>{
//         bcrypt.hash(new_password, 12)
//         .then((hashedPassword)=>{
//             const updatedUser=new User(new_name,user_Username,hashedPassword,new_country,new_governorate,new_email,new_age,new_address,new_birthday,user.role);
//             updatedUser.updateProfile(user_Username)
//             .then(
//                 res.status(200).json({
//                     message:"User updated"
//                 }))
//             .catch(err=> console.log(err));
//         })
//     })
//     .catch(err=> console.log(err));
// }

exports.getCountryFromID= function (req,res)
{
    const ID=req.params.id;
    let country;
   User.getUserCountry(ID)
    .then(([cname])=>{
        country=cname[0].Name;
        res.send(country)    
    })
    .catch(err=> console.log(err));
}


exports.getGovFromID= function (req,res)
{
    const ID=req.params.id;
    let gov;
   User.getUserGovernorate(ID)
    .then(([gname])=>{
        gov=gname[0].Name;
        res.send({gov})    
    })
    .catch(err=> console.log(err));
}

exports.getUserCampaginContributions= function (req,res)
{
    const username=req.params.id;
    var ids= new Array();
    campaign.getUserCampaignsIDS(username)
    .then(([IDS])=>{
        if(IDS.length==0)
        {
            ids.push(0)
            res.send({ids})

        }
        for(let i=0;i<IDS.length;i++)
        {
            ids.push(IDS[i].Campaign_ID)
            if(i==IDS.length-1)
            {
                res.send({ids})  
            }
           
        }
         
    })
    .catch(err=> console.log(err));
}

exports.getAllCampagins= function (req,res)
{
    let ID; let name; let status; let orgUsername; let U_username;
    let address; let description; let startDate; let endDate;
    let progress; let target; let rating; let image; let dontationTypeID; 
    var allCampaigns= new Array();
    campaign.getAllCampaigns()
    .then(([campaigns])=>{
        for(let i=0;i<campaigns.length;i++)
        {
            var camp = new campaign();
            name=campaigns[i].Name;
            status=campaigns[i].Status;
            ID=campaigns[i].Campaign_ID;
            address=campaigns[i].Address;
            image=campaigns[i].Image;
            description=campaigns[i].Description;
            startDate=campaigns[i].StartDate;
            endDate=campaigns[i].EndDate;
            progress=campaigns[i].Progress;
            target=campaigns[i].Target;
            orgUsername=campaigns[i].Org_username;
            U_username=campaigns[i].U_username;
            dontationTypeID=campaigns[i].DonationType;

            camp.name=name; camp.status=status;camp.orgUsername=orgUsername; camp.U_username=U_username; camp.startDate=startDate;
            camp.endDate=endDate; camp.description=description; camp.progress=progress; camp.address=address;
            camp.image=image; camp.target=target; camp.ID=ID; camp.dontationTypeID=dontationTypeID;
            allCampaigns.push(camp);

            if(i==campaigns.length-1)
            {
               console.log(allCampaigns)
                res.send(allCampaigns);
            }

        }
    })
    .catch(err=> console.log(err))
}

exports.UserProfile=async function(req,res)
{
    const username=req.params.id;
    const user = new User();
    let name; let userName; let password; let image;
    let country; let Governorate; let email; let age;
    let address; let birthday; let role; let countryID; let GovernorateID;
    await User.findbyID(username)
    .then(([user])=>{
        name=user[0].Name; password=cryptr.decrypt(user[0].password); age=user[0].Age; birthday=user[0].birthdate;
        email=user[0].email; userName=user[0].Username; address=user[0].Address; role=user[0].role; image=user[0].image;
        countryID=user[0].countryID;  GovernorateID=user[0].governorateID;
    })
    .catch(err=> console.log(err))

    await User.getUserGovernorate(GovernorateID)
        .then(([Gname])=>{
            Governorate=Gname[0].Name;
           
        })
        .catch(err=> console.log(err))

    await User.getUserCountry(countryID)
    .then(([Cname])=>{
        country=Cname[0].Name;
        
    })
    .catch(err=> console.log(err))

    user.name=name; user.userName=username; user.password=password;user.country=country; user.Governorate=Governorate;
    user.email=email; user.age=age; user.birthday=birthday; user.address=address; user.role=role; user.image=image;
   console.log(user)
   res.send(user)   
}

exports.updateUserPorfile= function(req,res)
{
    const username=req.params.id;
    const name=req.body.name; let password=req.body.password; 
    let country=req.body.country; let Governorate=req.body.Governorate; let email=req.body.email; let age=req.body.age;
    let address=req.body.address; let birthday=req.body.birthday; let image=req.body.image;

    const hashedPassword=cryptr.encrypt(password);
    User.getUserRole(username).then(([role])=>{
        const updatedUser = new User(name,username,hashedPassword,country,Governorate,email,age,address,birthday,role[0],image);
        updatedUser.updateProfile(username)
        .then(res.send(true))
        .catch(err=> console.log(err));
        console.log(updatedUser);
    })
}

exports.getUserjoinedCampagin= function (req,res)
{
    const username=req.params.id;
    let ID; let name; let status; let orgUsername; let U_username;
    let address; let description; let startDate; let endDate;
    let progress; let target; let rating; let image; let dontationTypeID; 
    var allCampaigns= new Array();
    campaign.getUserCampaignsIDS(username)
    .then(([IDS])=>{
        console.log(IDS.length)
        for(let i=0;i<IDS.length;i++)
        {
            campaign.getAllUserCampaigns(IDS[i].Campaign_ID)
            .then(([campaigns])=>{
            var camp = new campaign();
            name=campaigns[0].Name;
            status=campaigns[0].Status;
            ID=campaigns[0].Campaign_ID;
            address=campaigns[0].Address;
            image=campaigns[0].Image;
            description=campaigns[0].Description;
            startDate=campaigns[0].StartDate;
            endDate=campaigns[0].EndDate;
            progress=campaigns[0].Progress;
            target=campaigns[0].Target;
            orgUsername=campaigns[0].Org_username;
            U_username=campaigns[0].U_username;
            dontationTypeID=campaigns[0].DonationType;

            camp.name=name; camp.status=status;camp.orgUsername=orgUsername; camp.U_username=U_username; camp.startDate=startDate;
            camp.endDate=endDate; camp.description=description; camp.progress=progress; camp.address=address;
            camp.image=image; camp.target=target; camp.ID=IDS[i].Campaign_ID; camp.dontationTypeID=dontationTypeID;
            allCampaigns.push(camp);

            if(i==IDS.length-1)
            {
               console.log(allCampaigns)
                res.send(allCampaigns);
            }
                
        })
        .catch(err=> console.log(err));
        }
    })
    .catch(err=> console.log(err));
}

exports.checkUserCampaginStatus= function (req,res)
{
    const ID=req.params.id;
    const username=req.params.username;
    let status;
    User.getUserCampaginStatus(username,ID)
    .then(([status])=>{
        if(status[0]==null)
        {
            status="null"
        }
        else
        {
            status=status[0].Userstate;
        }
         res.send({status})
       // console.log({status})
    })
    .catch(err=> console.log(err));
}

exports.UserSignUp=function(req,res)
{
    const name=req.body.name;
    const userName=req.body.userName;
    const password=req.body.password;
    const country=req.body.country;
    const Governorate=req.body.Governorate;
    const email=req.body.email;
    const age=req.body.age;
    const address=req.body.address;
    const birthdate=req.body.birthday;
    const role="user";
    const image=req.body.image;

    const encryptedPassword=cryptr.encrypt(password);
    const u=new User(name,userName,encryptedPassword,country,Governorate,email,age,address,birthdate,role,image);
        User.findbyID(userName).then(([found])=>{
            if(found[0])
            {
                res.send("username already exists");
            }
            else
            {
                u.register().then(res.send("user registered succesfully"));
            }
        })
        .catch(err=> console.log(err));
}