const { Router } = require("express");
const Startup = require('../models/startupUser');

const router = Router();


router.get('/signup' , (req , res) => {
    return res.render('startupSignup');
})

router.get('/signin' , (req , res) => {
    return res.render('startupLogin');
})

router.get('/startupRegister' , (req , res) => {
    return res.render('startupRegister');
})


router.post('/signup' , async(req , res) => {
    const { fullName , email , password } = req.body;

    try{ 
        await Startup.create({
            fullName,
            email,
            password,
        });
        return res.redirect('startupRegister');

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
        return res.cookie('token' , token).redirect('startupHome');
        
        
        }catch (error){
            // console.error("Error in /signin:", error);
            return res.render("startupLogin" , {
                error : "Incorrect Email or Password" ,
        })

    }

    })



router.get('/criteria' , (req , res) => {
    return res.render('startupCriteria')
})

router.get('/startupHome' , (req , res) => {
    return res.render('startupHome')
})


router.get('/logout' ,(req , res) => {
    res.clearCookie('token')
    .redirect('/');
})



module.exports = router;