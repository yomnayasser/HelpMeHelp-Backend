const express = require('express');
const bodyParser=require('body-parser');

var LoginRouter = require('./routes/user');
var AdminRouter = require('./Routes/adminRoutes')
var OrgLoginRouter = require('./Routes/OrganizationRouter')

const app=express();

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
const campaign = require('./Models/campaign');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());

app.use(LoginRouter);
app.use(AdminRouter);
app.use(OrgLoginRouter);

io.on('connection', (socket) => {
        console.log("connected lololo");
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
        console.log(socket.id);
    });
});

server.listen(port, () => {
  console.log(`Server running on port: ${port}`)
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = parseInt(date_ob.getFullYear())-1;
    let currentDate=""+year + "-" + month + "-" + date;
    campaign.getAllCampaigns().then(([result])=>{
        for(let i=0;i<result.length;i++)
        {
            let Edate = ("0" + result[i].EndDate.getDate()).slice(-2);
            let Emonth = ("0" + (result[i].EndDate.getMonth() + 1)).slice(-2);
            let Eyear = parseInt(result[i].EndDate.getFullYear())-1;

            let campDate=""+Eyear + "-" + Emonth + "-" + Edate;
            if(campDate<currentDate)
            {
                campaign.updateFinishedCampaignsStatus(result[i].Campaign_ID)
            }
            
            let Sdate = ("0" + result[i].EndDate.getDate()).slice(-2);
            let Smonth = ("0" + (result[i].EndDate.getMonth() + 1)).slice(-2);
            let Syear = parseInt(result[i].EndDate.getFullYear())-1;

            let campStartDate=""+Syear + "-" + Smonth + "-" + Sdate;
            if(campStartDate>=currentDate)
            {
                campaign.updateToOngoingCampaignsStatus(result[i].Campaign_ID)
            }

        }
    })
})