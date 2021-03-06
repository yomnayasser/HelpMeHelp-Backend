
var db=require('../Database/connection');

class chat
{
    constructor(id,messages)
    {
        this.id=id;
        this.messages=messages;
    }
    static save_message(message,sender,Chat_ID,chatType,senderType)
    {
        var d = new Date();
        const timestamp=d.getFullYear() + "-" + (d.getMonth()+1) + "-" +  d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        if(chatType=="UU")
        {
            return db.execute("insert into uu_message (ChatID,timestamp,text,Sender_username) values(?,?,?,?)",
            [Chat_ID,timestamp,message,sender]);
        }
        else
        {
            return db.execute("insert into ou_message (Chat_ID,Timestamp,Text,Sender_username,Sender_type) values(?,?,?,?,?)",
            [Chat_ID,timestamp,message,sender,senderType]);
        }
    }
    static add_chat(sender,reciever,chatType)///sender is always the user
    {
        if(chatType=="UU")
        {
            let promise=db.execute("select Chat_ID from uu_chat where Username1=? and Username2=?",[reciever,sender]);
            promise.then(([Chat_ID1])=>{
                if(Chat_ID1.length==0)
                {
                    let promise=db.execute("select Chat_ID from uu_chat where Username1=? and Username2=?",[sender,reciever]);
                    promise.then(([Chat_ID])=>{
                        if(Chat_ID.length==0)
                        {
                            db.execute("insert into uu_chat (Username1,Username2) values(?,?)",
                            [sender,reciever]);
                        }
                    })
                    .catch(err=> console.log(err));
                }
            })
            .catch(err=> console.log(err));
            return promise;
        }
        else
        {
            let promise=db.execute("select Chat_ID from ou_chat where U_username=? and Org_username=?",[sender,reciever]);
            promise.then(([Chat_ID])=>{
                if(Chat_ID.length==0)
                {
                    db.execute("insert into ou_chat (U_username,Org_username) values(?,?)",
                    [sender,reciever]);   
                }
            })
            .catch(err=> console.log(err));
            return promise;
        }
    }

    static get_id(sender,reciever,chatType)
    {
        if(chatType=="UU")
        {
            return db.execute("select Chat_ID from uu_chat where Username1=? and Username2=?",[sender,reciever]);
        }
        else
        {
            return db.execute("select Chat_ID from ou_chat where U_username=? and Org_username=?",[sender,reciever]);
        }
    }
    static get_old_messages(chatType,Chat_ID)
    {
        if(chatType=="UU")
        {
            return db.execute("select Timestamp,text,Sender_username from uu_message where ChatID=? ",[Chat_ID]);
        }
        else
        {
            return db.execute("select Timestamp,Text,Sender_username from ou_message where Chat_ID=?",[Chat_ID]);
        }
    }
    static get_allChats_O(username)
    {
        return db.execute("select Chat_ID,U_username from ou_chat where Org_username=?",[username]);
    }
    static get_allChats_U1(username)
    {
        return db.execute("select Chat_ID,Username1 from uu_chat where Username2=?",[username]);   
    }
    static get_allChats_U2(username)
    {
        return db.execute("select Chat_ID,Username2 from uu_chat where Username1=?",[username]);   
    }
    static get_allChats_U3(username)
    {
        return db.execute("select Chat_ID,Org_username from ou_chat where U_username=?",[username]);  
    }

}
module.exports=chat;