const express = require('express');

const app = express();
const server = require('http').createServer(app);
const port = process.env.PORT || 8080
const { Server } = require("socket.io");
const io = new Server(server);
const path = require('path');
const { Socket } = require('dgram');

app.use(express.static(path.join(__dirname + '/public')))

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname+'/index.html'));
})

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
        console.log(socket.id);
    });
});

server.listen(port, () => {
  console.log(`Server running on port: ${port}`)
})


