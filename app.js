// ADDING DIFFERENT MODULES 
const express = require("express");
const cons = require('consolidate');
const fs = require('fs');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const { SIGHUP } = require("constants");
mongoose.connect('mongodb://localhost/Devjam',{useNewUrlParser: true, useUnifiedTopology: true});
const port = 80;

//BUILDING SCHEMAS AND MODELS
const signupSchema = new mongoose.Schema({
    name: String,
    hospital: String,
    email: String,
    contact: String,
    materials: String
  });
const Signup = mongoose.model('Signup', signupSchema);
const InNeed = mongoose.model('InNeed', signupSchema);
const homeSchema = new mongoose.Schema({
    name: String,
    email: String,
    contact: String,
    address: String
});
const HomeService = mongoose.model('HomeService', homeSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'))
app.use(express.urlencoded());  

//HTML AS THE TEMPLATE ENGINE RELATED CODE
app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

//ENDPOINTS FOR NAVIGATION BAR
app.get("/" ,(req,res) => {
    const params = { };
    res.status(200).render('index.html', params);
})
app.get("/signup" ,(req,res) => {
    const params = { };
    res.status(200).render('signup.html', params);
})
app.get("/inNeed" ,(req,res) => {
    const params = { };
    res.status(200).render('inNeed.html', params);
})
app.get("/homeService" ,(req,res) => {
    const params = { };
    res.status(200).render('homeService.html', params);
})

//ENDPOINTS FOR THE FORMS
app.post('/signup', (req,res) => {  //for the signup page
    let myData = new Signup(req.body);
    myData.save().then(()=>{
        res.status(200).render('data.html');
    }).catch(()=>{
        res.send("Couldn't reach the database")
    });
});
app.post('/homeService', (req,res) => {    // for the homeservice page
    let myData = new HomeService(req.body);
    myData.save().then(()=> {
        res.status(200).render('data.html');
    }).catch(()=>{
        res.send("Couldn't reach the database")
    });
});

//STARTING THE SERVER
app.listen(port,'127.0.0.1',()=> {
    console.log(`Listening on the port: ${port}`);
});
