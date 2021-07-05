const mysql=require('mysql2');

const db=mysql.createConnection({
    host:'localhost',
    user:'root', 
   database:'helpmehelpdb',
   // database:'helpmehelp',
    password:'database',
   // password:'project123',
   // password:'sarafares1999',
});

//connect to db
db.connect(function(err){
    if(err){
        throw err;
    }
    console.log('Mysql connected');
});

module.exports=db.promise();