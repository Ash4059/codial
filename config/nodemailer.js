const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'jaiswalashish405@gmail.com', // generated ethereal user
      pass: 'ygcsnlmaoatpzpax', // generated ethereal password
    },
})

let renderHtml = (data, relativePath) => {
    let mailHtml;
    ejs.renderFile(
        path.join(__dirname,'../views/mailer', relativePath),
        data,
        function(error,template){
            if(error){
                console.log("Error in rendering template");
                return;
            }
            mailHtml = template;
        }
    )
    return mailHtml;
}

module.exports = {
    transporter: transporter,
    renderHtml: renderHtml
}