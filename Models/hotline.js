var db=require('../Database/connection');
const smartSearch = require('smart-search')
class hotline
{
    constructor()
    {

    }
    static search(startRow,rowCount,text)
    {
        let promise= db.execute('select * from hotline limit ?,?',
        [startRow,rowCount]);
        promise.then((rows)=>{
            const hotlines=rows[0]; 
            const entries = hotlines;
            var patterns = [text];
            var fields = { Org_username: true, Description: true};
            var results = smartSearch(entries, patterns, fields);
            console.log(results);
        })
        .catch(err=> console.log(err));
        return promise;
    }
}
module.exports=hotline;