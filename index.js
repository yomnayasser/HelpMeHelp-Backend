const express = require('express');
const bodyParser=require('body-parser')

var LoginRouter = require('./routes/user');
var AdminRouter = require('./Routes/adminRoutes')
var OrgLoginRouter = require('./Routes/OrganizationRouter')
var recommendRouter = require('./Routes/recommendRoutes')

const app=express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());

app.use(LoginRouter);
app.use(AdminRouter);
app.use(OrgLoginRouter);
app.use(recommendRouter);

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
const tf = require('@tensorflow/tfjs');
const tfn = require('@tensorflow/tfjs-node');

const modelPath = "http://localhost:8080/tfjs_campaign_recommender/model.json";
// const modelPath = "./tfjs_campaign_recommender/model.json";
let model1;
const loadModel = async () => {
  const handler = tfn.io.fileSystem("./tfjs_campaign_recommender/model.json");
  const model = await tf.loadLayersModel(handler);
  // model.summary();
  console.log('model loaded');
  return model;
}
server.listen(port, () => {
  console.log(`Server running on port: ${port}`)
  tf.ready().then(() => {
    console.log("tf ready");
    loadModel().then((model)=>{
      model1 = model;
      exports.model1 = model1;
    })
  });
})