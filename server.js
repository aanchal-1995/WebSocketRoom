const express = require('express')
const WebSocket = require('ws')
const path  = require('path')
const app = express();

app.set('view engine','ejs')
app.use(express.static('views'));
app.use('/', require('./server/router/router'))

const server= app.listen(8000, ()=>{
    console.log(`Server is running on 8000`)
})

const wss = new WebSocket.Server({
    server
})   


wss.on('connection', function(ws){
    ws.on('message',function(data){
        wss.clients.forEach(function each(client){
            if(client!== ws && client.readyState === WebSocket.OPEN){
                client.send(data)
            }
        })
    })
})   
