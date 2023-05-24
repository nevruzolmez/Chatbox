const socket = io('http://localhost:3000');
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const messageContainer = document.getElementById('container')

const name = prompt('What is your name?')
appendMessage('You Joined');
socket.emit('new-user',name)

socket.on('chat-message', data => {
    appendMessage(data)
})
socket.on('user-connected', name => {
    appendMessage(`${name} connected`)
})

messageForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = messageInput.value
    socket.emit('send-chat-message',message)
    messageInput.value = ""
})

function appendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.innerText = message
    messageContainer.append(messageElement);
}