var mongoose =require('mongoose');
var schema=mongoose.Schema;
mongoose.set('useCreateIndex', true);//kullanım şekli degişmiş
//Veri tabanı alanlarımızı ayırdık ve özelliklerini belirtik
var kullaniciSchema=new schema({
    kullaniciAd:String,
    mail:String,
    sifre:{type:String,required:true}
},{collection:'users'});
var kullanici =mongoose.model('user',kullaniciSchema); //kullanacagamız modülü yazdık
module.exports=kullanici; //modulu export ediyoruz burada