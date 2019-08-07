
/* var fs=require('fs');
var users=require('../models/userSchema');
var icerikKaydet=require('../models/icerik');
var session=require('express-session');
var multer  = require('multer');
var upload=multer({dest:'uploads'});
var path=require('path');


var sessionKontrol;  */
 /*module.exports.anasayfa=function(req,res){
    sessionKontrol=req.session;
    if(sessionKontrol.kullaniciAd_==null){
      return  res.render('login');
    }
    else{
        return res.render('anasayfa');
    }
   
 } */
/* module.exports.loginUser=function(req,res){
    sessionKontrol=req.session;
   if(sessionKontrol.kullaniciAd_==null){
     return  res.render('login');
   }
   else{
      return res.render('anasayfa')
   }
  //  return res.render('login');
} */
/*module.exports.signup=function(req,res){
    return res.render('signup')
}*/
/*module.exports.signUpPost=function(req,res){
    console.log(req.body);
    var kullanici= new users({
        kullaniciAd:req.body.username,
        mail:req.body.mail,
        sifre:req.body.password
    });
    kullanici.save(function(err,erro){
        if(err){
            console.log('Kullanici kaydetmede hata var');
            return res.render('signup');
            //burada ekrana hata verdirebiliris ve kaydederken şifreyi kripto
        }
        else{
            console.log('Kayıt başarılı');
            return res.render('login');
        }
    });
   //kullanici var mı yok mu kontrolu
} */
/*module.exports.loginPost=function(req,res){
  //Session işlemleri
    sessionKontrol=req.session;
    sessionKontrol.kullaniciAd_=req.body.ad;
    //console.log(sessionKontrol.kullaniciAd_);
    if(sessionKontrol.kullaniciAd_==null){
       return res.redirect('anasayfa');
    }
//kullanici kontrol
    var kontrol=1;
    var kontrol1=1
   users.findOne({kullaniciAd:req.body.ad},function(err,result){
      /// console.log('k ad ',result);     
       if(result){ kontrol=2;}
          else{kontrol=4;}
        // console.log(kontrol);
        if(kontrol==2){
         console.log('kad dogru');
         users.findOne({sifre:req.body.password},function(erra,resulta){
            //   console.log('Şifre',resulta)
               if(resulta){kontrol1=3}
                    else{kontrol1=0;}
              // console.log(kontrol);
               if(kontrol1==3){
                 return  res.redirect('anasayfa');
               }
               if(kontrol1==0){
                   console.log('Şifre yanlış');
                   return res.render('login');
                   kontrol=1;
               }
               if(kontrol1==1){
                  // console.log('Kad ile şifre yanlış');
               }           
           });
     }
     if(kontrol==4){
         console.log('kad yanlış');
         return res.render('login');
         kontrol=1;
     }    
   });
  
  
} */
/*module.exports.paylas=function(req,res){
   
   sessionKontrol=req.session;
   if(sessionKontrol.kullaniciAd_==null){
     return  res.render('login');
 }
    else{
     return res.render('paylas');
  } 
} */
/*module.exports.paylasPost=function(req,res){
   
    return res.render('paylas');
} */

