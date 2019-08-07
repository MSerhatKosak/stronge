var http=require('http');
var fs=require('fs');
var express=require('express');
var path=require('path');
var app=express();
var db=require('./app_server/models/db');
app.set('view engine','ejs');//görüntü motorunu tanıttık
var session=require('express-session');
var flash=require('req-flash');




var bodyParser=require('body-parser');// post metodlarını ayıklamak için kullandıgımız yer

//görüntü motorunun nerde oldugunu gösteriyoruz

var routeElektronikControl=require('./app_server/router/elektronikRouter');//routera yonlendiriyoruz
app.use('/public',express.static(path.join(__dirname,'public')));// path metodu ile stylaheeti aktif ediyoruz

app.set('views',path.join('./app_server/views')); //ejs görüntü motorunun yolunu gösteriyoruz

app.use(bodyParser.urlencoded({extended:false})); //bodyparseri urlden gelen verileri ayıklaması için kullanıyoruz
app.use(bodyParser.json()); //burdakileri ise json nesneneleri ayıklamak için kullanıyoruz

//Session İşlemleri
app.use(session({secret: 'max',saveUninitialized: true,resave: true}));
app.use(flash());

//Sayfadaki resmi böyle alıyoruz


require('./app_server/router/routerManager')(app); //app use lar fazla yer kaplamasın diye bunun içinde ayrı bir şey oluşturduk




app.listen(3000);
console.log('Port 3000 de çalışıyor');