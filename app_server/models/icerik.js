var mongoose =require('mongoose');
var schema=mongoose.Schema;
mongoose.set('useCreateIndex', true);//kullanım şekli degişmiş
//Veri tabanı alanlarımızı ayırdık ve özelliklerini belirtik
var icerikSchema=new schema({
   Unid:String,
    Baslik:String,
    resimYol:String,
    konu:String,
    kategori:String,
    kucukResim:String,
    icerik:String,
    paylasanKisi:{
        KullaniciAd:String,
        mail:String
    },
    
},{collection:'icerikler'});
var kullanici =mongoose.model('icerik',icerikSchema); //kullanacagamız modülü yazdık
module.exports=kullanici; //modulu export ediyoruz burada