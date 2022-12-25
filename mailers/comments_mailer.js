const nodeMailer = require('../config/nodemailer');

// This is another way of expoorting method
exports.newComments = (comments)=>{
    console.log("Inside new comments mailer");
    
    let htmlString = nodeMailer.renderHtml({comment:comments},'/comments/new_comments.ejs');

    nodeMailer.transporter.sendMail({
        from: 'jaiswalashish405@gmail.com',
        to: comments.user.email,
        subject: "New comment published",
        html: htmlString
    },(error,info)=>{
        if(error){
            console.log("Error in sending mail",error);
        }
        return;
    })
}