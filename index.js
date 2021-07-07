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

app.use(express.static(path.join(__dirname + '/public')))

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname+'/chatUI.html'));
})

io.on('connection', (socket) => {
        console.log("connected")
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
        console.log(socket.id);
    });
});

server.listen(port, () => {
  console.log(`Server running on port: ${port}`)
})