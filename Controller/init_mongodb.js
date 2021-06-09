const mongoose=require('mongoose')

mongoose.connect(process.env.db_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true, useFindAndModify:false })
  .then((result) => console.log('mongodb connected.'))
  .catch((err) => console.log(err));

  mongoose.connection.on('connected',()=>{
    console.log("mongoose connected to db")
})

mongoose.connection.on('error',(err)=>{
    console.log(err.message)
})

mongoose.connection.on('disconnected',()=>{
    console.log("mongoose connection is disconnected ")
})

process.on('SIGINT',async()=>{
    await mongoose.connection.close()
    process.exit(0)
})

//mongodb+srv://admin:<password>@cluster0.evsmh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority