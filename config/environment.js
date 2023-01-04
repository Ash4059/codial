const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log',{
    size: "10M", // rotate every 10 MegaBytes written
    interval: "1d", // rotate daily
    path: logDirectory
})

const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie:'tiruvananthpuram',
    db:'codeial_development',
    smtp: {
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'jaiswalashish405@gmail.com', // generated ethereal user
          pass: 'ygcsnlmaoatpzpax', // generated ethereal password
        }
    },
    google_client_id: "1068250646074-ii05q0ie78u0hmgota6geoib44ljek01.apps.googleusercontent.com",
    google_client_secret: "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",
    google_callback_url: "http://localhost:8080/users/auth/google/callback",
    jwt_secret_key: "Codeial",
    morgan:{
        mode: 'dev',
        options: {stream: accessLogStream}
    }
};

const production = {
    name: 'production',
    asset_path: './assets',
    session_cookie:'ga92IijchfbgApzoItwm6P6RXxjpNCxT',
    db:'codeial_prooduction',
    smtp: {
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'jaiswalashish405@gmail.com', // generated ethereal user
          pass: 'ygcsnlmaoatpzpax', // generated ethereal password
        }
    },
    google_client_id: "1068250646074-ii05q0ie78u0hmgota6geoib44ljek01.apps.googleusercontent.com",
    google_client_secret: "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",
    google_callback_url: "http://localhost:8080/users/auth/google/callback",
    jwt_secret_key: "UNKMX53RHQyqsFKoq8FoPK56vcgmklhU",
    morgan:{
        mode: 'dev',
        options: {stream: accessLogStream}
    }
};

module.exports = production;