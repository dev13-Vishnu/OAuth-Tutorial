const express = require("express");

const app = express();

app.set('view engine','ejs');

//create home route
app.get('/',(req,res)=>{
    res.render('home');
})

app.listen(3000,()=>{
    console.log('server is running on port 3000');
})