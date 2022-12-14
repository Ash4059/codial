const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8080;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// Used for session cookie
const session = require('express-session');
const passport = require('./config/passport-local-strategy');
const passportLocal = require('passport-local');
const passportJWTLocal = require('./config/passport-jwt-local-strategy');
const passportGoogle = require('./config/passport-google-oauth-strategy');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMWare = require('./config/middleware');
const env = require('./config/environment');
const logger = require('morgan');


// Setup the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSocket = require('./config/chat_socket').chatSocket(chatServer);
chatServer.listen(8000);
console.log("Chat server is listening on port 8000");

if(env.name == "development"){
    app.use(sassMiddleware({
        src: path.join(__dirname,env.asset_path,'scss'),
        dest: path.join(__dirname,env.asset_path,'css'),
        debug: true,
        outputStyle: 'expanded',
        prefix: '/css'
    }));
}

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static(env.asset_path))
// Make the upload path available to browser
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(expressLayouts);
// extract style and js files from sub pages into layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.set('view engine','ejs');
app.set('views','./views')
app.use(logger(env.morgan.mode,env.morgan.options));

// Mongo store is used to store the session cookie in db
app.use(session({
    name:'Codeial',
    // To do changes needed
    secret:env.session_cookie,
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge: (1000*60*100)
    },
    store:new MongoStore(
        {
        mongooseConnection : db,
        autoRemove : 'disabled'
    },
    function(err){
        console.log(err || "Connect mongodb setup OK");
    }
    )
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMWare.setFlash);
app.use('/',require('./routes'));


app.listen(port,function(err){
    if(err){
        console.log("Error in running the server : ",err);
        return;
    }
    console.log(`Server is running on port: ${port}`);
})