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

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'))

app.use(expressLayouts);
// extract style and js files from sub pages into layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.set('view engine','ejs');
app.set('views','./views')

app.use(session({
    name:'Codeial',
    // To do changes needed
    secret:'tiruvananthpuram',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge: (1000*60*100)
    }
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log("Error in running the server : ",err);
        return;
    }
    console.log(`Server is running on port: ${port}`);
})