const express = require('express');
const bodyParser=require('body-parser')

var LoginRouter = require('./routes/user');
var AdminRouter = require('./Routes/adminRoutes')
var OrgLoginRouter = require('./Routes/OrganizationRouter')

const app=express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());

app.use(LoginRouter);
app.use(AdminRouter);
app.use(OrgLoginRouter);

//connect to server
/*app.listen('8080',function(){
    console.log('server started');
});*/

//////chat///////////
const server = require('http').createServer(app);
const port = process.env.PORT || 8080
const { Server } = require("socket.io");
const io = new Server(server);
const path = require('path');
const { Socket } = require('dgram');




io.on('connection', (socket) => {
      console.log("connected lololo");
    socket.on('chat message', (msg) => {
        socket.broadcast.emit('chat message', msg);
        console.log(msg);
        console.log(socket.id);
    });
    //socket.on('disconnect', () => {
      //  console.log("disconnnected")
        //if(socket)socket.disconnect();
      //})
});


server.listen(port, () => {
  console.log(`Server running on port: ${port}`)
})