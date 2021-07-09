const bcrypt = require('bcryptjs');
const Cryptr=require('cryptr')
const cryptr = new Cryptr('myTotalySecretKey');
const csv = require('csv-parser');
const fs = require('fs');

const Organization=require('../Models/Organization');
const Campaign=require('../Models/campaign');
const User=require('../Models/User');
const { getMaxListeners } = require('../Database/connection');

exports.OrgSignUp=function(req,res)
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
        'اسوان':'Aswan',
        'شمال سيناء':'North Sinai',
        'سوهاج':'Sohag',
        'دمياط':'Damietta',
        'جنوب سيناء':'South Sinai',
        'بني سويف':'Bein Suef',
        'الوادى الجديد':'New Valley',
        'المنيا':'Minya',
        'المنوفية':'Monufia',
        'القليوبيه':'Qalyubia',
        'بورسعيد':'Port Said',
        'مطروح':'Matruh',
        'الفيوم':'Faiyum',
        'الغربية':'Gharbia',
        'الشرقية':'Sharqia',
        'السويس':'Suez',
        'الدقهليه':'Dakahlia',
        'الجيزة':'Giza',
        'البحيرة':'Beheira',
        'البحر الاحمر':'Red Sea',
        'الاقصر':'Luxor',
        'القاهرة':'Cairo',
        'الاسكندرية':'Alexandria',
        'الإسماعيلية':'Ismailia',
        'اسيوط':'Asyut',
    };
    let orgTypes = {
        "جمعية محلية":"local association",
        "مؤسسة محلية":"local institution",
        "مؤسسة مركزية":"central institution",
        "فرع/ مد نشاط":"branch"
    };
    let cat = {
        "تنمية المجتمعات المحلية":"community development",
        "مساعدات اجتماعية":"social assistance",
        "رعاية الطفولة والأمومة":"child and maternal welfare",
        "خدمات ثقافية وعلمية ودينية":"cultural, scientific and religious services",
        "انشطة صحية":"health activities",
        "التنمية السكانية":"population development",
        "رعاية الفئات الخاصة والمعوقين":"disabled Persons and Special Groups Welfare",
        "التنمية الزراعية":"agricultural development",
        "أنشطة تعليمية":"educational activities",
        "التوعية بحقوق الانسان":"human rights awareness",
        "الدعم الفني وتطوير القدرات":"support for development of technical skills",
        "تمكين وتأهيل الشباب":"youth empowerment",
        "حماية البيئة والمحافظة عليها":"environmentalism",
        "التنمية اقتصادية":"economic development",
        "رعاية الاسرة":"family care",
        "الدفاع الاجتماعى":"social protection",
        "التنظيم والإدارة":"administration and management",
        "رعاية طلاب العلم المهجريين و المغربين من غير الناطقين باللغه العربية":"support for non-arabic speaking immigrant students"
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
