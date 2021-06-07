const { json } = require('body-parser');
const User=require('../models/User');
//const jwt=require('jsonwebtoken');
const { signAccessToken }=require('./jwtoken');
const crypto=require('crypto')

const handleError=(err) => {
    console.log(err.message,err.code);
    let errors={ email:'',password:''};

    if (err.code === 11000) {
        errors.email = 'that email is already registered';
        return errors;
      }

      if (err.message.includes('incorrect email')){
        errors.email="that email was not registered"
      }
      if (err.message.includes('incorrect password')){
        errors.password="Password Doesn\n't matched"
      }

      // validation errors
      if (err.message.includes('user validation failed')) {
        // console.log(err);
        Object.values(err.errors).forEach(({ properties }) => {
          // console.log(val);
          // console.log(properties);
          errors[properties.path] = properties.message;
        });
      } 
      return errors;
     }



module.exports.signup_get=(req,res)=>{
    res.render('signup');
}

module.exports.login_get=(req,res)=>{
    res.render('login');
}

module.exports.signup_post =async (req,res) => {
    const { email,password }=req.body;
    
      try {
        const user=await User.create({ email, password });
        const tkn=await signAccessToken(user._id);
        res.cookie('jwt',tkn,{httponly:true})
        console.log(user);
        res.status(201).json({user:user._id});
    } 
      catch (err) {
       const errors=handleError(err);
       res.status(400).json({ errors })
       res.send.json({errors})

    }
 }

 module.exports.logout_get=async (req,res)=>{
   res.cookie('jwt','',{ expiresIn :1 });
   res.redirect('/');
 }


module.exports.login_post=async (req,res)=>{

  const { email, password }=req.body;
  
  try {
    const user=await User.login(email,password)
    const tkn=await signAccessToken(user._id);
    res.cookie('jwt',tkn,{ httponly:true })
    console.log(user);
    res.status(200).json({user:user._id})
  }
  catch (err) {
    const errors=handleError(err);
    res.status(400).json({errors});
  }
 }

