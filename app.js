
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// DBMS
// Mongodb database connection
mongoose.connect("mongodb://127.0.0.1:27017/userDB");
// Schema 
const userSchema = {
    email: String,
    password: String
}
const User = new mongoose.model("User", userSchema);


// BACKEND
// index page
app.get('/', function(req, res) {
    res.render('home');
});

// login page
app.get('/login', function(req, res) {
    res.render('login');
});

// register page
app.get('/register', function(req, res) {
    res.render('register');
});


//post req register page
app.post("/register",(req, res)=> {
    const user = new User({
        email: req.body.username,
        password: req.body.password
    })

    user.save((err)=> {
        if(err) {
            console.log(err);
        } else {
            res.render("secret");
        }
    })
})

app.post("/login", (req, res)=> {
    const un = req.body.usermane;
    const pw = req.body.password;

    User.findOne({email: un},(err, foundUser)=>{
        if(err) {
            conssole.log(err)
        } else {
            if(foundUser) {
                if(foundUser.password === pw) {
                    res.render("secret")
                }
            }
        }
    })
})




// port
app.listen(6969,()=>{
    console.log("Server Started!...(6969)")
});