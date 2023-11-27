document.getElementById('fileInput').addEventListener('change', handleFileSelect);

function handleFileSelect(event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const chatData = e.target.result;
            displayChat(chatData);
        };

        reader.readAsText(file);
    }
}

function displayChat(chatData) {
    const chatContainer = document.getElementById('chatContainer');
    chatContainer.innerHTML = ''; // Clear previous chat data

    const messages = parseChatData(chatData);
    console.log(messages);
    var firstSender = "";
    var secondSender = "";
    var count = 0;
    var wcount = "";
    messages.forEach((message) => {
        const messageElement = document.createElement('div');
        const splited = message.split(":");
        const sender = splited[0];
        mes = splited[1];

        if(firstSender==""){
            firstSender = sender;
        }
        else{
            secondSender = sender;
        }
        

        if(message.includes(firstSender)){
            if(wcount==firstSender){
                
                count++;
            }
            else{
                wcount=firstSender;
                count=1;
            }
            messageElement.classList.add('left'); 
            if(count==1){
                messageElement.innerHTML = `<div class="lsender">${sender}</div>${mes}`;
            }
            else{
                messageElement.innerHTML = `${mes}`;
            }
            
        }
        else{
            if(wcount==secondSender){                
                count++;
            }
            else{
                wcount=secondSender;
                count=1;
            }
            messageElement.classList.add('right');
            if(count==1){
                messageElement.innerHTML = `<p class="test"><span class="rsender">${sender}<br></span>${mes}</p>`;
            }
            else{
                messageElement.innerHTML = `<p class="test">${mes}</p>`;
            }
            
        }
        
        chatContainer.appendChild(messageElement);
    });
}

function parseChatData(chatData) {
    const messages = [];


    const myArray = chatData.split("\r\n");

    for (let index = 0; index < myArray.length; index++) {
        const element = myArray[index];
        const message = element.split("]");
        
        messages.push(message[1])
    }
        
    
    return messages;
}

