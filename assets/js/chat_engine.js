class ChatEngine{
    constructor(chatBoxId,userEmail){
        console.log(chatBoxId);
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        this.socket = io.connect("http://localhost:8000");

        if(this.userEmail){
            this.connectionHandler();
        }
    }

    connectionHandler(){
        const self = this;
        this.socket.on('connect',function(){
            console.log("Connection established using sockets....!");

            self.socket.emit('join_room',{
                userEmail: self.userEmail,
                chatRoom: 'codeial'
            })

            self.socket.on('user_joined',function(data){
                console.log("a user joined",data);
            })
        })

        $('#send-message').click(function(){
            const message = $('#chat-message-input').val();
    
            if(message != ""){
                self.socket.emit('send_message',{
                    message: message,
                    userEmail: self.userEmail,
                    chatRoom: 'codeial'
                })
            }
        })

        self.socket.on('recieve_message',function(data){
            console.log("Message recieved", data.message);

            const newMessage = $('<li>');
            let messageType = 'other-message';

            if(data.userEmail === self.userEmail){
                messageType = 'self-message';
            }

            newMessage.append($('<span>',{
                'html': data.message
            }));

            newMessage.append($('<sub>',{
                'html': data.userEmail
            }));

            newMessage.addClass(messageType);

            $('#chat-messages-list').append(newMessage);
        })
    }
}