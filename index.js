const express =require('express');
const app =express();
const port =8000;
const db =require('./config/mongoose');
const session =require('express-session');
const passport =require('passport');
const passportLocal =require('./config/passport-local-strategy');
const cookieParser =require('cookie-parser');

app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));
const expressLayouts =require('express-ejs-layouts');
app.use(expressLayouts);

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use(session({
    name:'Codeial',
    secret:'blahsomething',
    saveUninitialized:false,
    resave: false,
    cookie:{
        maxAge:(1000*60*100)
    }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/',require('./routes/index'));

app.set('view engine','ejs');
app.set('views','./views');

app.listen(port ,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});