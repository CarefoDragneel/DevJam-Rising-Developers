const express = require("express");
const cons = require('consolidate');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 80;

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'))
app.use(express.urlencoded());  

//HTML AS THE TEMPLATE ENGINE RELATED CODE
app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

//ENDPOINTS
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

//STARTING THE SERVER
app.listen(port,'127.0.0.1',()=> {
    console.log(`Listening on the port: ${port}`);
});
