const express = require('express');
const app = express();
const port = 8080;

const expressLayouts = require('express-ejs-layouts');

app.use(express.static('./assets'))

app.use(expressLayouts);
// extract style and js files from sub pages into layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


app.use('/',require('./routes'));

app.set('view engine','ejs');
app.set('views','./views')


app.listen(port,function(err){
    if(err){
        console.log("Error in running the server : ",err);
        return;
    }
    console.log(`Server is running on port: ${port}`);
})