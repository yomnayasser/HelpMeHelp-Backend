const mysql=require('mysql2');

const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    // password:'sarafares1999',
    database:'helpmehelpdp',
    // database:'helpmehelpdb',
<<<<<<< HEAD
    password:'database',
=======
    // database:'helpmehelp',
    // password:'database',
    database:'editeddb',
    password:'project123',
>>>>>>> 4053729f022652e655ab267b1dc45ec68979efa5
});

//connect to db
db.connect(function(err){
    if(err){
        throw err;
    }
    console.log('Mysql connected');
});

module.exports=db.promise();