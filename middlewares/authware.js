const jwt=require('jsonwebtoken');
const User = require('../models/User');

const requireAuth =(req,res,next)=>{
    const token=req.cookies.jwt;

    //Verifying jwt token

    if (token){
        jwt.verify(token,process.env.secret,(err,decodedToken)=>{
            if(err){
                console.log(err.message);
                res.redirect('/login')                
            }
            else{
                next();
            }
        })
    }

    else{
        res.redirect('/login')
    }
}

const checkUser=(req,res,next)=>{

    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, process.env.secret, async (err, decodedToken) => {
        if (err) {
          res.locals.user = null;
          next();
        } else {
          let user = await User.findById(decodedToken._id);
          res.locals.user = user;
          console.log(user)
          next();
        }
      });
    } else {
      res.locals.user = null;
      next();
    }
};


module.exports={ requireAuth, checkUser };