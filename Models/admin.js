var db=require('../Database/connection');
const org=require('../Models/Organization')
class admin
{
    static addHotline(number,description)
    {
        return db.execute('select number from hotline where number= ?',[number])
        .then(([exist])=>{
            if(!exist[0])
            {
                return db.execute('insert into hotline(number,description) values (?,?)',[number,description]);
            }
            else
            {
                return null;
            }
        })
    }
    static addAdmin(username)
    {
        return db.execute('select username from user where username= ? ',[username])
        .then(([username])=>{
            if(!username[0])
            {
                return null;
            }
            else
            {
                return db.execute('UPDATE user SET role="admin" where username=?',[username]);
            }
        })
    }
    static viewAllPendingOrganizations()
    {
        return db.execute('select * from organization where request="pending"');
        //ageb azay ba2e el dataa :)
    }
    static getAllOrganizationInfo(pendingArr)
    {
        var category_name,subcategory_name,organization_type,hotline,location,socialmedialink;
        for(let i=0;i<pendingArr.length;i++)
        {
            db.execute('select category_ID from has_category where org_username= ?',[pendingArr.username])
            .then((id)=>{
                category_name=db.execute('select name from category where ID= ?',id)
            }).catch(err=> console.log(err));

            db.execute('select subcategory_ID from has_subcategory where org_username= ?',[pendingArr.username])
            .then((id)=>{
                subcategory_name=db.execute('select name from subcategory where ID= ?',id)
            }).catch(err=> console.log(err));

            db.execute('select orgType_id from has_organization_type where org_username= ?',[pendingArr.username])
            .then((id)=>{
                organization_type=db.execute('select type from organization_type where ID= ?',id)
            }).catch(err=> console.log(err));

            hotline=db.execute('select number from hotline where org_username= ?',[pendingArr.username]);

            location=db.execute('select location from locations where org_username= ?',[pendingArr.username]);
            
            socialmedialink=db.execute('select socialmedialink from socialmedia where org_username= ?',[pendingArr.username]);

            
        }
    }
    static acceptOrganization(Organization_userName)
    {
        return db.execute('UPDATE organization SET request="accepted" where username= ?',[Organization_userName]);
    }
    static removeOrganization(Organization_userName)
    {
        return db.execute("Delete from has_category where org_username=?",[Organization_userName])
        .then(db.execute("Delete from has_subcategory where org_username=?",[Organization_userName]))
        .then(db.execute("Delete from has_organization_type where org_username=?",[Organization_userName]))
        .then(db.execute("Delete from hotline where org_username=?",[Organization_userName]))
        .then(db.execute("Delete from locations where org_username=?",[Organization_userName]))
        .then(db.execute("Delete from socialmedia where org_username=?",[Organization_userName]))
        .then(db.execute("DELETE FROM organization WHERE username=?",[Organization_userName]))
        .catch(err=> console.log(err));
    }
}
module.exports=admin;