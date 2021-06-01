const mongoose=require('mongoose')
const Schema=mongoose.Schema
const bcrypt=require('bcrypt')
const { isEmail }=require('validator')


const userSchema=new Schema({
    email:{
        type:String,
        required:[true,'Please Enter an email'],
        lowercase:true,
        unique:true,
        validate:[ isEmail ,'Please Enter Valid Email']
    },
    password:{
        type:String,
        required:[true,'Please Enter a Password'],
        minLength:[6,'Minimum Password length is 6 characters']
       //unique:true,
    },
})

userSchema.pre('save',async function(next){
    try{
        const salt=await bcrypt.genSalt(8)
        const hashedp=await bcrypt.hash(this.password,salt)
        this.password=hashedp
        next()
    }

    catch(error){
        next(error)
    }
})

userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw Error('incorrect password');
    }
    throw Error('incorrect email');
  }
  
const User=mongoose.model('user',userSchema)

module.exports=User