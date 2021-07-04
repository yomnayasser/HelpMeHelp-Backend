const mysql=require('mysql2');

const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    // password:'sarafares1999',
    database:'helpmehelpdp',
    // database:'helpmehelpdb',
    password:'database',
});

//connect to db
db.connect(function(err){
    if(err){
        throw err;
    }
    console.log('Mysql connected');
});

module.exports=db.promise();