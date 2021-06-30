const mysql=require('mysql2');

const db=mysql.createConnection({
    host:'localhost',
    user:'root',
   //password:'database',
     password:'project123',
    database:'helpmehelp',
    // stringifyObjects:'true',
});

//connect to db
db.connect(function(err){
    if(err){
        throw err;
    }
    console.log('Mysql connected');
});

module.exports=db.promise();