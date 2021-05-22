class messages
{
    constructor(id,msg,senderType,senderUserName,timeStamp)
    {
        this.id=id;
        this.msg=msg;
        this.senderType=senderType;
        this.senderUserName=senderUserName;
        this.timeStamp=timeStamp;
    }
    
}
module.exports=messages;