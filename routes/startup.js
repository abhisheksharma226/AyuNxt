const { Router } = require("express");
const Startup = require('../models/startupUser');

const router = Router();


router.get('/signup' , (req , res) => {
    return res.render('startupSignup')
})

router.get('/signin' , (req , res) => {
    return res.render('startupLogin')
})

router.get('/')


router.post('/signup' , async(req , res) => {
    const { fullName , email , password } = req.body;

    try{ 
        await Startup.create({
            fullName,
            email,
            password,
        });
        return res.redirect('/');

    }catch(error){
        return res.render("startupSignup" , {
            error : "Email Already Exist!"
        })
    }
    
})



router.post('/signin' , async(req , res) => {
     const { email , password } = req.body;

     try{
        
         const token = await Startup.matchPasswordAndGenerateToken({ email, password });
        return res.redirect('/');
        //  return res.cookie('token' , token).redirect('/');
        
        }catch (error){
            // console.error("Error in /signin:", error);
            return res.render("startupLogin" , {
                error : "Incorrect Email or Password" ,
        })

    }

    })



router.get('/logout' ,(req , res) => {
    res.clearCookie('token')
    .redirect('/');
})



module.exports = router;