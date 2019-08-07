var mongoose =require('mongoose');
var schema=mongoose.Schema;
mongoose.set('useCreateIndex', true);//kullanım şekli degişmiş
//Veri tabanı alanlarımızı ayırdık ve özelliklerini belirtik
var detayProfil=new schema({
    pId:String,
    profilResmi:String,
    ad:String,
    soyad:String,
    meslek:String,
    sirket:String,
    ulke:String,
    sehir:String,
    webSiteUrl:String,
    site1:String,
    site2:String,
    site3:String,
    site4:String,
    site5:String,
    tanitBaslik:String,
    tanitİcerik:String,
    oturumSahip:String,
    icerikKonu:String,
    icerikBaslik:String,
    paylasanKisi:String,
    resimYolu:String,
    
    
},{collection:'detayProfil'});
var kullanici =mongoose.model('detayProfil',detayProfil); //kullanacagamız modülü yazdık
module.exports=kullanici; //modulu export ediyoruz burada