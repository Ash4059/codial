const nodeMailer = require('../config/nodemailer');

// This is another way of expoorting method
exports.newComments = (comments)=>{
    console.log("Inside new comments mailer");
    
    nodeMailer.transporter.sendMail({
        from: 'jaiswalashish405@gmail.com',
        to: comments.user.email,
        subject: "New comment published",
        html: "<h1>Yup, your comments is now published</h1>"
    },(error,info)=>{
        if(error){
            console.log("Error in sending mail",error);
        }
        console.log("Message send",info);
        return;
    })
}