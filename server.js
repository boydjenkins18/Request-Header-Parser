var express=require('express');
var cors=require('cors');
var bodyParser=require('body-parser');
var app=express();
var port=process.env.PORT || 10000;
var ip=process.env.IP;
var requestIP=require('request-ip');
var reqLang=require('express-request-language');
var cookieParser=require('cookie-parser');
var os=require('os');
//App Setup
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(reqLang({
  languages: ['en-US','en', 'zh-CN','fr','ar','es'],
  cookie: {
    name: 'language',
    options: { maxAge: 24*3600*1000 },
    url: '/languages/{language}'
  }
}));
app.set('view engine','ejs');
app.use('/public',express.static(process.cwd()+'/public'));

process.setMaxListeners(0);


//routes

app.get('/',function(req,res){

  res.render('pages/home');
});



app.get('/whoami',function(req,res){

var clientIP=requestIP.getClientIp(req);
var clientLang=req.language;
var clientSoftware=os.type() +'; '+ os.platform() +'; '+os.arch();
var clientCPU=os.cpus()[0].model;

  res.json({ipaddress:clientIP,language:clientLang,software:clientSoftware,cpu:clientCPU});
});


//Start Server
app.listen(port,ip,function(){
  console.log('Server is listening on port '+port+'...');
});
