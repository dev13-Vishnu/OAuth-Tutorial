
const router = require ('express').Router();

const authCheck = (req,res,next)=>{
    try {
        if (!req.user) {
            //if user is not logged in
            res.redirect('/auth/login');
        } else {
            next();
        }
    } catch (error) {
        console.log(error)
    }
    
}


router.get('/',authCheck,(req,res)=>{
    res.render('profile',{user:req.user});  
})

module.exports = router;
