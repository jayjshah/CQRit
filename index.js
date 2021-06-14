const express = require('express');
const morgan=require('morgan')
const authRoutes=require('./routes/auth-route')
const cookieParser=require('cookie-parser')
const { requireAuth,checkUser }=require('./middlewares/authware')
const exec = require('child_process').exec;
const { spawn } = require('child_process');
const { readFileSync } = require('fs');
const fs = require('fs');
const { stdout } = require('process');
const { Script } = require('vm');
const bodyParser = require('body-parser');
const cors=require('cors')

var urlencodedParser = bodyParser.urlencoded({
    extended: false
});

require('dotenv').config()

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use('/static', express.static(__dirname + '/public/static'));
app.use('/css', express.static(__dirname + '/public/static/css'));
app.use('/js', express.static(__dirname + '/public/static/'));
app.use('/pics',express.static(__dirname+'/public/static/pics'))
app.use(cookieParser());
app.use(cors())

// view engine
app.set('view engine', 'ejs');

require('./Controller/init_mongodb')


const PORT=process.env.PORT || 4000

app.listen(PORT,()=>{
    console.log(`listing on port ${PORT}`);
})

app.get('*',checkUser);
app.get('/', (req, res) => res.render('home'));

app.post('/portscan',urlencodedParser,async(req,res)=>{

    try {
        var url=req.body.dmn2;
        console.log(url);
                
        const py=exec('portscanning.py '+'-d '+url,(err,stdout)=>{
            if(err){
                res.send(err);
            }
            else{
                    res.writeHead(200,{'Content-Type':'text/plain'});
                    res.write(stdout);
                    return res.end();
                } 
            }
        );
    }
     catch (err) {
        console.log(err)
    }
})

app.get('/dorking',async (req,res)=>{
    try {
        res.render('gdork')
    } catch (err) {
        console.log(err)
    }
})

// app.post('/gdork',urlencodedParser,requireAuth,async (req,res)=>{
//     try {
//         var url=req.body.dm3;
//         console.log(url)
//         res.render('gdork')
//     } catch (err) {
//         console.log(err)
//         res.send(err)
//     }
// })

app.post('/subscan',urlencodedParser, async (req, res) => {
    
    try {
        var url=req.body.dmn1;
        console.log(url);
        
        const pky=exec('subd.py '+ '-d ' + url,(err, stdout) => {
            if (err) {
                res.send(err);
            }
            else {
                    res.writeHead(200, {'Content-Type': 'text/plain'});
                    res.write(stdout);
                    return res.end();
                }
            
        });
        // const py=spawn('python',['subd.py','-d',req.body.dmn1]);

        // py.stdout.on('data',function(data){
        //     dataSend1=data;
        // });
        // py.on('close',(code)=>{
        // // send data to browser
        // res.sendFile(dataSend1)    }
        // )
    }
    catch (err) {
        res.send(err)
    }

});
    
app.get('/scanner',async (req, res) =>{ 
res.render('index');
});



function mainfunction(a){    
    const pky=exec('subd.py '+ '-d ' +a,(err, stdout) => {
            if (err) {
               return err
            }
            else {
                return stdout
      }
        });             
    console.log("main f");
}
app.use(authRoutes);


// const emailverification= require("./routes/email_verification");
// app.use("/api", emailverification);

// const verify = require("./routes/email_verification");
// app.use("/api", verify);


app.use((req,res)=>{
    res.status(404).render('./error/404')
})