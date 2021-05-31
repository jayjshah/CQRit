const express = require('express');
//const mongoose = require('mongoose');
const morgan=require('morgan')
//const createError=require('http-errors')
const authRoutes=require('./routes/auth-route')
const cookieParser=require('cookie-parser')
const { requireAuth, checkUser }=require('./middlewares/authware')
// const e = require('express');
const exec = require('child_process').exec;
const { spawn } = require('child_process');
const { readFileSync } = require('fs');
const fs = require('fs');
const { stdout } = require('process');
const { Script } = require('vm');
const bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({
    extended: false
});

require('dotenv').config()

const app = express();

app.use(express.json());
app.use(morgan('dev'));
//app.use(express.static('public'));
app.use('/static', express.static(__dirname + '/public/static'));
app.use('/css', express.static(__dirname + '/public/static/css'));
app.use('/js', express.static(__dirname + '/public/static/'));
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

require('./Controller/init_mongodb')


const PORT=process.env.PORT || 4000

app.listen(PORT,()=>{
    console.log(`listing on port ${PORT}`);
})

app.get('*',checkUser);
app.get('/', (req, res) => res.render('home'));

app.post('/portscan',urlencodedParser,requireAuth,async(req,res)=>{
    try {
        var url=req.body.dmn2;
        console.log(url);

        fs.open('scan.txt','w', function (err, file) {
            if (err) throw err;
            console.log('Saved!');})

        const py=exec('portscanning.py '+'-d '+url+' -o '+'scan.txt',(err,stdout)=>{
            if(err){
                res.send(err);
            }
            else{
                fs.readFile('scan.txt',function(err,data){
                    res.writeHead(200,{'Content-Type':'text/plain'});
                    res.write(stdout);
                    return res.end();
                }) 
            }
        });
    } catch (err) {
        console.log(err)
    }
})
app.post('/subscan',urlencodedParser,requireAuth, async (req, res) => {
    
    try {
        var url=req.body.dmn1;
        console.log(url);
        // var files=url+'.txt'
        // console.log(files)
        fs.open('scan.txt','w', function (err, file) {
            if (err) throw err;
            console.log('Saved!');
        })
        const pky=exec('subd.py '+ '-d ' + url+' -o '+'scan.txt',(err, stdout) => {
            if (err) {
                res.send(err);
            }
            else {
                fs.readFile('scan.txt', function(err, data) {
                    res.writeHead(200, {'Content-Type': 'text/plain'});
                    res.write(stdout);
                    return res.end();
                })
                // fs.appendFile(files,stdout, function (err) {
                //     if (err) throw err;
                //     console.log('Saved!');
                // })
                // res.sendFile()
                // res.send("scan.txt");
            }
        });
    //  const pk=exec('subd.py '+ '-d ' +url);
    //     pk.stdout.on('data',function(data){
    //             dataSend=data;
    //          });

    //     pk.on('close',(code)=>{
    //         res.send(dataSend)
    //     })
    // //     const py=spawn('python',['subd.py','-d',"collegeek.com"]);

    // //     // pky.stdout.on('data',function(data){
    // //     //     dataSend=data;
    // //     // });
        
    // //     // pky.on('close',(code)=>{
    // //     //     // send data to browser
    // //     //     res.send(dataSend)    }
    // //     //     )
    
        
    // //     py.stdout.on('data',function(data){
    // //         dataSend1=data;
    // //     });
    // //     py.on('close',(code)=>{
    // //     // send data to browser
    // //     res.sendFile(dataSend1)    }
    // //     )
    }
    catch (err) {
        res.send(err)
    }

});
    
app.get('/Reports', requireAuth,async (req, res) =>{ 
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


