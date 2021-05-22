const express = require('express');
const bodyParser=require('body-parser')

var LoginRouter = require('./routes/user');

const app=express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());

app.use(LoginRouter);

//connect to server
app.listen('8080',function(){
    console.log('server started');
});