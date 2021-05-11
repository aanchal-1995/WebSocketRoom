const url ='ws://localhost:8000/websocket'

const server = new WebSocket(url)
const group_id = document.getElementById('group-id')
const group_name = document.getElementById('group-name')
const messages = document.getElementById('chat')
const input = document.getElementById('message')
const handle = document.getElementById('handle')
const button = document.getElementById('send')
button.disabled= true
button.addEventListener('click', sendMessage, false)
group_id.onkeyup = function(event){
    if(event.keyCode ==13){
    var name = document.createElement('h1')
    name.innerHTML= group_id.value
    group_name.appendChild( name)}
}
server.onopen = function(){
    // server.send('Hello')
    button.disabled=false 
} 
server.onmessage = function(event){
    const {data}  = event
    generateMessage(data)
}

function generateMessage(msg){
    const newMessage  = document.createElement('div')
    newMessage.innerText = `${msg}`
    messages.appendChild(newMessage)
    
}

function sendMessage(){
    const text = input.value
    generateMessage(text);
    server.send(text)
}

