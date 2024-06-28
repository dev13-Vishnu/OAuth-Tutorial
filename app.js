const express = require("express");
const authRoutes = require('./Routes/auth-routes');
const profileRoutes = require('./Routes/profile-route');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const session = require('express-session');
const passport = require('passport');

const app = express();

app.set('view engine','ejs');

app.use(session({
    maxAge:24*60*60*10000,
    secret:[keys.session.cookieKey]
}))

app.use(passport.initialize());
app.use(passport.session());

//connect to mongoose
(async () => {
    try {
        await mongoose.connect(keys.mongodb.dbURI);
        console.log('Connected to MongoDB!');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit the process on connection failure (optional)
    }
})();


//set up routes
app.use('/auth',authRoutes);
app.use('/profile',profileRoutes);

//create home route
app.get('/',(req,res)=>{
    res.render('home',{user:req.user});
})

app.listen(3000,()=>{
    console.log('server is running on port 3000');
})