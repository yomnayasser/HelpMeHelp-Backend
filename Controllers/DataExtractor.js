const bcrypt = require('bcryptjs');
const Cryptr=require('cryptr')
const cryptr = new Cryptr('myTotalySecretKey');
const csv = require('csv-parser');
const fs = require('fs');

const Organization=require('../Models/Organization');
const Campaign=require('../Models/campaign');
const User=require('../Models/User');
const { getMaxListeners } = require('../Database/connection');
var db=require('../Database/connection');

OrgSignUp=function(req,res)
{
    const name=req.body.name;
    const userName=req.body.userName;
    const password=req.body.password;
    const country="Egypt";
    const Governorate=req.body.governorate;
    const email=req.body.email;
    const category=req.body.category;
    const subCategory=req.body.subCategory; 
    const organizationType=req.body.organizationType; 
    const description=req.body.description;
    const purpose=req.body.purpose;
    const rating=0;
    const website=req.body.website;
    const socialMedia=req.body.socialMedia; 
    const hotline=[req.body.hotlineNumber,req.body.hotlineDesc]; 
    const logo=req.body.logo;
    const requestStatus="pending";
    const location=req.body.location; 
    const phoneNumber=req.body.phoneNumber;
    const encryptedPassword=cryptr.encrypt(password);
    const org=new Organization(name,userName,encryptedPassword,country,Governorate,email,category,subCategory,
        organizationType,description,purpose,rating,website,socialMedia,hotline,logo,requestStatus,phoneNumber,location);
        Organization.getOrg(userName).then(([found])=>{
            if(found[0])
            {
                res.send(false);
            }
            else
            {
                org.checkHotline().then(([exist])=>{
                    if(exist[0])
                    {
                        if(exist[0].Number==0)
                        {
                            org.register().then(res.send(true)); 
                        }
                        else
                        {
                            res.send("hotline already exists");
                        }
                        
                    }
                    else{
                        org.register().then(res.send(true));         
                    }
                }).catch(err=> console.log(err))
            }
        })
        .catch(err=> console.log(err));
}

exports.readAndSaveOrganizations = async function(req,res){
    let count =0;
    let orgs=[];
    let gov = {//kafr l shiekh,Qena
        '??????????':'Aswan',
        '???????? ??????????':'North Sinai',
        '??????????':'Sohag',
        '??????????':'Damietta',
        '???????? ??????????':'South Sinai',
        '?????? ????????':'Bein Suef',
        '???????????? ????????????':'New Valley',
        '????????????':'Minya',
        '????????????????':'Monufia',
        '??????????????????':'Qalyubia',
        '??????????????':'Port Said',
        '??????????':'Matruh',
        '????????????':'Faiyum',
        '??????????????':'Gharbia',
        '??????????????':'Sharqia',
        '????????????':'Suez',
        '????????????????':'Dakahlia',
        '????????????':'Giza',
        '??????????????':'Beheira',
        '?????????? ????????????':'Red Sea',
        '????????????':'Luxor',
        '??????????????':'Cairo',
        '????????????????????':'Alexandria',
        '??????????????????????':'Ismailia',
        '??????????':'Asyut',
    };
    let orgTypes = {
        "?????????? ??????????":"local association",
        "?????????? ??????????":"local institution",
        "?????????? ????????????":"central institution",
        "??????/ ???? ????????":"branch"
    };
    let cat = {
        "?????????? ?????????????????? ??????????????":"community development",
        "?????????????? ????????????????":"social assistance",
        "?????????? ?????????????? ????????????????":"child and maternal welfare",
        "?????????? ???????????? ???????????? ????????????":"cultural, scientific and religious services",
        "?????????? ????????":"health activities",
        "?????????????? ????????????????":"population development",
        "?????????? ???????????? ???????????? ??????????????????":"disabled Persons and Special Groups Welfare",
        "?????????????? ????????????????":"agricultural development",
        "?????????? ??????????????":"educational activities",
        "?????????????? ?????????? ??????????????":"human rights awareness",
        "?????????? ?????????? ???????????? ??????????????":"support for development of technical skills",
        "?????????? ???????????? ????????????":"youth empowerment",
        "?????????? ???????????? ?????????????????? ??????????":"environmentalism",
        "?????????????? ????????????????":"economic development",
        "?????????? ????????????":"family care",
        "???????????? ??????????????????":"social protection",
        "?????????????? ????????????????":"administration and management",
        "?????????? ???????? ?????????? ?????????????????? ?? ???????????????? ???? ?????? ???????????????? ???????????? ??????????????":"support for non-arabic speaking immigrant students"
    };
    fs.createReadStream('./Dataset/organizations.csv')
        .pipe(csv())
        .on('data', (row) => {
            let rate = (Math.random() * 5);
            // console.log(row['ID']);
            let phone;
            if(row['PhoneNum']=='')phone=null;
            else phone=row['PhoneNum']
              orgs.push({
                  embedID:row['ID'],
                  name:row['Name'],
                  username:'Org_'+row['ID'],
                  password:123,
                  rating:rate,
                  website:'',
                  email:`org${row['ID']}@gmail.com`,
                  Governrate:gov[row['Governrate']],
                  request:'accepted',
                  address:row['Address'],
                  phone:phone,
                    purpose:'This organization wants to help.',
                  orgType:orgTypes[row['OrgType']],
                  category:cat[row['Category']],
                  subCategories:row['Categories'],
                  description:row['activities'],
                  country:'Egypt',
                  countryID:1
                });
                // console.log(row['Governrate']);
                // console.log(gov[row['Governrate']]);
              count++;
        })
        .on('end', async() => {
          console.log('orgsallinfo CSV file successfully processed');
          for(let i=32; i<orgs.length; i++){
            //   console.log(orgs[i].Governrate); 
            let encryptedPassword=cryptr.encrypt(orgs[i].password);
            let subCategory = orgs[i].subCategories.split("\n");
            const org=new Organization(orgs[i].name,
                orgs[i].username,encryptedPassword,orgs[i].country,
                orgs[i].Governrate,orgs[i].email,orgs[i].category,cat[subCategory[0]],
                orgs[i].orgType,orgs[i].description,orgs[i].purpose,
                orgs[i].rating,orgs[i].website,[''],0,'',
                orgs[i].request,orgs[i].phone,[orgs[i].address]);
                await org.register()
                // .then(()=>{
                    // console.log('another one')
                // })
                // .catch(err=> console.log(err))
            
        }
        console.log('done');
        res.send(true);
          }).on('error', function(err) {
            console.log(err);
          });
    
}

launchVolunteerOrDonationCampaign= async function (req,res)
{
    const orgUsername= req.params.id;
    const name = req.body.name;
    const status = "upcoming"
    const address = req.body.address;
    const description = req.body.description;
    let process=req.body.process;
    const startDate = req.body.StartDate;
    let endDate = req.body.EndDate;
    const progress = 0;
    const target = req.body.target;
    let image = req.body.image;
    const dontationTypeName = req.body.DonationType;
    let QuizLink=req.body.QuizLink;

    Campaign.getCampaignDonationTypeIDfromName(dontationTypeName).then(([id])=>{
        const dontationTypeID= id[0].id;
        if(QuizLink==null)
        {
            QuizLink="Not Found";
        }
        if(image==null)
        {
            image="Not Found";
        }
        // if(endDate==null)
        // {
        //     endDate="Not Found";
        // }
        if(process==null)
        {
            process="Not Found";
        }
        const camp=new Campaign(name,status,orgUsername,null,address,description,process,startDate,endDate,progress,target,image,dontationTypeID,QuizLink);
        camp.addVolunteeringOrDonationCampaign().then(function([result]){
            if(result['insertId'])
            {
                Campaign.addCampaignToEmbedCampaign(result['insertId']).then(()=>{
                    res.send('Done');
                }).catch(err=>console.log(err));
            }
        }).catch(err=>console.log(err));
    }) 
} 

exports.readInsertCamp = async function (req,res)
{
    fs.createReadStream('./Dataset/campaigns.csv')
        .pipe(csv())
        .on('data', async (row) => {
            let embed = row['Embed_ID'];
            if(embed<200 || embed>500)return;
            let name = row['Name'];
            let status = row['Status'];
            let address = 'egypt';
            let description = row['Description'];
            let process=req.body.process;
            let startDate = new Date(row['StartDate']);
            let endDate = new Date(row['EndDate']);
            const progress = 0;
            const target = 100;
            let image = null;
            let dontationTypeName = row['DonationType'];
            let QuizLink=null;
            //select Username from helpmehelp.organization where name="resala";
            let orgUsername= await (db.execute('select Username from helpmehelp.organization where name=?',[row['Name']]));
            await Campaign.getCampaignDonationTypeIDfromName(dontationTypeName).then(async ([id])=>{
                const dontationTypeID= id[0].id;
                if(QuizLink==null)
                {
                    QuizLink="Not Found";
                }
                if(image==null)
                {
                    image="Not Found";
                }
                // if(endDate==null)
                // {
                    //     endDate="Not Found";
                    // }
                    if(process==null)
                    {
                        process="Not Found";
                    }
                    const camp=new Campaign(name,status,orgUsername[0].Username,null,address,description,process,startDate,endDate,progress,target,image,dontationTypeID,QuizLink);
                    await camp.addVolunteeringOrDonationCampaign().then(async function([result]){
                        if(result['insertId'])
                        {
                            await (db.execute('insert into campaign_embed values(?,?)',[result['insertId'],embed]));
                            // Campaign.addCampaignToEmbedCampaign(result['insertId']).then(()=>{
                            //     res.send('Done');
                            // }).catch(err=>console.log(err));
                        }
                    }).catch(err=>console.log(err));
                })
            })
            .on('end', async() => {
              console.log('orgsallinfo CSV file successfully processed');
            //   console.log('done');
            res.send(true);
              }).on('error', function(err) {
                console.log(err);
              });
}
            
exports.readInsertUser=function(req,res)
{
    fs.createReadStream('./Dataset/users.csv')
    .pipe(csv())
    .on('data', async (row) => {
        
    let name=row['Name'];
    let embed = row['EmbedID'];
    if(embed>200||embed<6)return;
    let userName=row['Username']+(embed+1);
    let password=row['Password'];
    let country="Egypt";
    let Governorate="Cairo";
    let email=row['BirthDate'];
    let age=row['Age'];
    let address="Cairo";
    let birthdate=new Date(row['BirthDate']);
    let role="user";
    let image='';

    let encryptedPassword=cryptr.encrypt(password);
    let u=new User(name,userName,encryptedPassword,country,Governorate,email,age,address,birthdate,role,image);
       await User.findbyID(userName).then(async ([found])=>{
            if(found[0])
            {
                return;
            }
            else
            {
                await u.register();
            }
        })
        .catch(err=> console.log(err));
    })
    .on('end', async() => {
      console.log('orgsallinfo CSV file successfully processed');
    //   console.log('done');
    res.send(true);
      }).on('error', function(err) {
        console.log(err);
      });
}   
  