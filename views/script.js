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
    var name = document.createElement('div')
    
    name.innerHTML= group_id.value
    group_name.appendChild( name)
    
    group_id.style.display = "none"
}
}
server.onopen = function(){
    // server.send('Hello')
    button.disabled=false 
} 
server.onmessage = function(event){
    const {data}  = event
    const msg = data.substring(0,data.indexOf(':'))
    const user = data.substring(data.indexOf(':')+1)
    // console.log(msg)
    // console.log(user)
    // const user = handle.value
    generateMessage(msg, user)
}

function generateMessage(msg, user){
    const newMessage  = document.createElement('div')
    newMessage.innerText = `${user}: ${msg}`
    messages.appendChild(newMessage)
    
}

function sendMessage(){
    const text = input.value
    const user = handle.value
    generateMessage(text, user);
    server.send(text+':'+user)
}

