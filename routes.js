import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import sessions from "express-session";

const app = express();

//set the view engine to ejs
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//to use session few propertise need to set 
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));

const userEmail = 'waqarhussain@gmail.com';
const userPassword = 'test1234';

// a variable to save a session
var session;

// Load views here  
app.get("/login",(req,res)=>{
    if(session.userid){
        res.redirect("/");
    }else{
        var title = "login";
        res.render("pages/login",{title:title});    
    }
});

app.get("/",(req,res)=>{
    session=req.session;
    if(!session.userid){
        res.redirect("/login");
    }else{
        var title = "Home";
        res.render("pages/index",{title:title});
    }
});

app.get("/about",(req,res)=>{
var title = "About";
res.render("pages/about",{title:title});
});

app.get("/products",(req,res)=>{
var title = "products";
res.render("pages/about",{title:title});
});

app.get("/product/:id",(req,res)=>{
var title = "products";
res.render("pages/about",{title:title});
});

app.get("/contact",(req,res)=>{
var title = "Contact Form";
res.render("pages/contact",{title:title,name: req.body.name});
});

app.post("/contact_process",(req,res)=>{
    res.render("pages/contact",{title:title,name: req.body.name});
});

//-----------------------------------------------------------------------
// process of data 
app.post("/loginCheck",(req,res)=>{
   console.log(req.body.email);
   console.log(req.body.password);

   if(req.body.email == userEmail && req.body.password == userPassword){
        session=req.session;
        session.userid=req.body.email;
        console.log(req.session);
        res.send(`Hey there, welcome <a href=\'/logout'>click to logout</a>`);
    }
    else{
        res.send('Invalid username or password');
    }
});

app.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/login');
});

// default route if route not found 
app.get("*",(req,res)=>{
res.render("pages/404");
});

// process request data here

app.listen(5000);