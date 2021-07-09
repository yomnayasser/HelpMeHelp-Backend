const mysql=require('mysql2');

const db=mysql.createConnection({
    host:'localhost',
    user:'root',


    //password:'sarafares1999',
    //database:'helpmehelp',
   database:'helpmehelp',
     //password:'database',

    // password:'sarafares1999',

    //database:'helpmehelp',
   //database:'helpmehelpdb',
    // password:'database',
    //database:'helpmehelp',
  // database:'helpmehelpdb',

     //password:'database',

    // password:'database',

    password:'project123',
    namedPlaceholders:true
});

//connect to db
db.connect(function(err){
    if(err){
        throw err;
    }
    console.log('Mysql connected');
});

module.exports=db.promise();