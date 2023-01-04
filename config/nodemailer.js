const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const env = require('./environment');

let transporter = nodemailer.createTransport(env.smtp)

let renderHtml = (data, relativePath) => {
    let mailHtml;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers', relativePath),
        data,
        function(error,template){
            if(error){
                console.log("Error in rendering template", error);
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