const jwt=require('jsonwebtoken')
const createError=require('http-errors')

module.exports={
    signAccessToken:(userId)=>{
        return new Promise((resolve,reject)=>{
            const payload={
                name:'1 JWT'
            }
            const secret=process.env.secret
            const option={
                expiresIn:'1h',
                issuer:'abc.com',
                audience:'userId'
            }
            jwt.sign(payload,secret,option,(err,token)=>{
                if(err){
                    console.log(err.message)
                    reject(createError.InternalSeverError())
                } 
                resolve(token)
            })
        })
    }
}