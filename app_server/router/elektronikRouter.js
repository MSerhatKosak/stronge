//HATA HATA veri tabanına içerik kaydederken yolu dogru kaydetmiyor ve kaydeden kişinin mailini dogru kaydetmiyor
//Herşeyi burdan yonlendiriyoruz
var express=require('express');
var router=express.Router();
//var controller =require('../controller/elektronikKontroller');//import
//Resim alma işleminin hata vermesi üzerine controller kaldırılmıştır ve buraya çagırılmıştır 
var fs=require('fs');
var users=require('../models/userSchema');
var icerikKaydet=require('../models/icerik');
var detayliBilgi=require('../models/kullaniciDetay');
var session=require('express-session');
var multer  = require('multer');
var jimp=require('jimp');



var path=require('path');
//session kontrol için bir degişken
var sessionKontrol;
//get isteklerini diger sayfadan gönderiyoruz
var tarih=new Date();
var eklemeTarih=tarih.toLocaleDateString()+'-'+tarih.getMinutes();
console.log('Sunucu Tarihi : ',eklemeTarih);
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/uploads')
    },
    
    filename: function (req, file, cb) {
      cb(null, eklemeTarih+ '-' + file.originalname );
      
    },
  });
var upload = multer({ storage: storage });

var depo=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'public/images/uploads/profilResim');
    },
    filename:function(req,file,cb){
        cb(null,eklemeTarih+'-'+file.originalname);
    }
    
});
var profilUpload=multer({storage:depo});
 


var hata;

router.get('/anasayfa',function(req,res){
    sessionKontrol=req.session;
    if(sessionKontrol.kullaniciAd_==null){
        icerikKaydet.find({},function(err,result){
            return res.render('login',{icerik:result});
        });
    }
    else{
        icerikKaydet.find({},function(err,result){
            return res.render('anasayfa',{icerik:result});
        });
       
    }
});
router.get('/login',function(req,res){
    sessionKontrol=req.session;
    if(sessionKontrol.kullaniciAd_==null){
        return res.render('login');
    }
    else{
        return res.render('anasayfa');
    }
});
router.get('/signup',function(req,res){
    return res.render('signup')
});
router.post('/signup',function(req,res){
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
});
router.post('/login',function(req,res){
    //Session işlemleri
      sessionKontrol=req.session;
      sessionKontrol.kullaniciAd_=req.body.ad;
      sessionKontrol.sifre__=req.body.password;
   
    
      //sessiona veritabanından gelen maili atıcaz ilerde kullanmak için
       users.findOne({kullaniciAd:req.body.ad},function(err,result){
           //console.log(result.mail);
          //maili burdan alıcaz ama mail dışarı çıkmıyor nedeni bilmiyorum 
       });
     
        
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
    
    
  });//post send ve kontrol yapılıyor
router.get('/paylas',function(req,res){
   
    sessionKontrol=req.session;
    if(sessionKontrol.kullaniciAd_==null){
      return  res.render('login');
  }
     else{  
            return res.render('paylas',{mesaj:hata}); 
   } 
  
 });
router.post('/paylas',upload.single('myFile'),function(req,res){
  //sunucudaki dosyanın adını alıyor
    var snc=path.join(__dirname,req.file.path);
    console.log('snc den gelen lin******: '+snc);
 

    sessionKontrol=req.session;
    //console.log(req.session.sifre);
   // console.log(sessionKontrol.kullaniciAd_);
    //Dosya alma veritabanına kaydetme 
    
   var veriTabaniKayıt;
   var kontrolSilme=path.join(__dirname,req.file.originalname);
   var siliciAd=kontrolSilme.split('.');
   var yol=path.join(__dirname,req.file.path);
   //console.log(req.file);
    var bolunmusYol=yol.split('.');
    //console.log(bolumusYol[1]);
    var copyYol;
    var saveAndPath='public/images/kucukicerik/'+req.file.filename;
    if(bolunmusYol[1]=='png'){
      //Ekrana başarılı yazıdıracazgız
      console.log('Yüklenen Dosya resim png');
      veriTabaniKayıt='public/images/uploads/'+req.file.filename;
      console.log('VeriTabanı YOL '+veriTabaniKayıt);
      jimp.read(copyYol='public/images/uploads/'+req.file.filename, function (err, img) {
        img.resize(296, 202)            // resize
             .quality(70)               // set JPEG quality
                                        // set greyscale
           .write(saveAndPath); // save
              console.log('Resimin kopyası küçültüldii !!')  
    });		
      hata='';
     
    }

  

  
    if(bolunmusYol[1]=='jpg'){
        console.log('Yüklenen Dosya resim jpg'); 
        veriTabaniKayıt='public/images/uploads/'+req.file.filename;
        console.log(veriTabaniKayıt);
        hata='';
    
    }
    else{
        if(siliciAd[1]!='jpg' && siliciAd[1]!='png')
        fs.unlink(req.file.path ,function(err){
          hata='Lütfen resim seçiniz';
        console.log('Resim olmadı için silindi');
          
           
        });
       
    }

 
    var unİd=(Math.random()*100000000000000000);
    var YeniIcerik=new icerikKaydet({
        Unid:unİd,
        Baslik:req.body.basliks,
        resimYol:veriTabaniKayıt,
        konu:req.body.konu,
        kategori:req.body.konu ,
        kucukResim:saveAndPath,
        icerik:req.body.icerik,
        
        paylasanKisi:{
            KullaniciAd:sessionKontrol.kullaniciAd_,
            mail:sessionKontrol.mail__
        }
    });
    
    YeniIcerik.save(function(err,erro){
        if(err){
            
            console.log('Veri tabanına kaydederken hata');
        }
        else{
            console.log('Kayıt başarılı');
            
        }
    });
     var detayEkle=new detayliBilgi({
        oturumSahip:sessionKontrol.kullaniciAd_,
        icerikBaslik:req.body.basliks,
        paylasanKisi:sessionKontrol.kullaniciAd_,
        resimYolu:saveAndPath,
    })
    detayEkle.save(function(err,data){

    });
    
   return res.render('paylas',{mesaj:hata});
   
   
    
  
});

router.get('/author-login',function(req,res){
    sessionKontrol=req.session;
//Veri tabanından gelen içerikleri gösterme
detayliBilgi.find({oturumSahip:sessionKontrol.kullaniciAd_},function(err,doc){
icerikKaydet.find({paylasanKisi:{KullaniciAd:sessionKontrol.kullaniciAd_}},function(err,data){
    return res.render('author-login',{bilgi:doc,bilgiler:data});
});
});


 
    
});
router.get('/author-edit',function(req,res){
    sessionKontrol=req.session;
    if(sessionKontrol.kullaniciAd_==null){
      return  res.render('login');
  }
     else{
            var dty=new detayliBilgi({
                oturumKisi:sessionKontrol.kullaniciAd_
            });
            dty.save(function(err,data){

            });
            res.render('author-edit');
   } 
    
});

router.post('/author-edit',profilUpload.single('ProfilResim'),function(req,res){
    //Session
    sessionKontrol=req.session;

   //Şifre degiştirme
    if(req.body.newPas==''){
        console.log('Şifreyi  boş gönderiyorsunuz');
    }
    else{
        users.findOneAndUpdate({kullaniciAd:sessionKontrol.kullaniciAd_},({sifre:req.body.newPas}),function(err,doc){
            if(err){
                console.log(err);
            }
            else{
                console.log(doc.sifre);
            }
       
    });
    }
   //Yüklenen resmi sündürme işlemi 
   
  
    
 
//veri tabanı kullanici detay kayıt
 try {
    var profilResmiUrl=path.join(__dirname,req.file.path);
 } catch (error) {
     console.log('Resim boş oldugu için url alınamıyor');
 }

 var pIade=(Math.random()*100000000000000000);
 var mongoResimKayit='public/images/uploads/profilResim/'+req.file.filename;
 detayliBilgi.findOne({oturumSahip:sessionKontrol.kullaniciAd_},function(err,docc){
if(docc.oturumSahip==sessionKontrol.kullaniciAd_){
    detayliBilgi.findOneAndUpdate({oturumSahip:sessionKontrol.kullaniciAd_},{profilResmi:profilResmiUrl,  
        pId:pIade,
        ad:req.body.ad_,
        profilResmi:mongoResimKayit,
        soyad:req.body.soyad_,
        meslek:req.body.meslekYetenek_,
        sirket:req.body.sirket_,
        ulke:req.body.ülke,
        sehir:req.body.sehir,
        webSiteUrl:req.body.webSiteUrl_,
        site1:req.body.iletisimFace,
        site2:req.body.iletisimTwit,
        site3:req.body.iletisimGoogle,
        site4:req.body.iletisimPin,
        site5:req.body.iletisimInst,
        tanitBaslik:req.body.hakkımdaBaslık_,
        tanitİcerik:req.body.onYazı,},function(err,doc){

        });
}
if(docc.oturumSahip==null){
    var veriKayit=new detayliBilgi({
        pId:pIade,
        ad:req.body.ad_,
        profilResmi:mongoResimKayit,
        soyad:req.body.soyad_,
        meslek:req.body.meslekYetenek_,
        sirket:req.body.sirket_,
        ulke:req.body.ülke,
        sehir:req.body.sehir,
        webSiteUrl:req.body.webSiteUrl_,
        site1:req.body.iletisimFace,
        site2:req.body.iletisimTwit,
        site3:req.body.iletisimGoogle,
        site4:req.body.iletisimPin,
        site5:req.body.iletisimInst,
        tanitBaslik:req.body.hakkımdaBaslık_,
        tanitİcerik:req.body.onYazı,
       });
       veriKayit.save(function(err,roc){

       });
}

 });
    
    	
    //Resim kontrol işlemleri
    try {
        var  resimAd=req.file.originalname;
            var resimKontrol=resimAd.split('.');
            if(resimKontrol[1]=='jpg'){
                console.log('Resim jpg');
               
               
            }
            if(resimKontrol[1]=='png'){
              console.log('resim')
            }
            else{
                fs.unlink(req.file.path,function(err){
                    if(!err){
                        console.log('Resim formatı olmadıgı için silindi');
                    }
                    
                });   
            }  

    } catch (error) {
        console.log('Dosyayı boş gönderiyorsunuz')
    }
    

    
   //session kontrol işlemleri 
   if(sessionKontrol.kullaniciAd_==null){
    return  res.render('login');
}
   else{   
      
        res.render('author-edit');   
 } 
  
});

router.get('/',function(req,res){
    
   icerikKaydet.find({},function(err,result){
   
    return res.render('anonim-home',{icerik:result});
   });
      
   
    
});

router.get('/activite',function(req,res){
   sessionKontrol=req.session
   if(sessionKontrol.kullaniciAd_==null){
       return res.render('login');
   }
   else{
    icerikKaydet.find({},function(err,result){
        detayliBilgi.find({},function(err,data){
            return res.render('activiteler',{icerik:result,datalar:data});
        });
        });
    }     
});
router.get('/topluluk',function(req,res){


    detayliBilgi.find({},function(err,result){
      console.log(result);
        return  res.render('topluluk',{detayic:result});
        
      });
 
 
});
router.get('/sayfa/:icerikId',function(req,res){
    var iid=req.params.icerikId;
    icerikKaydet.findOne({Unid:iid},function(err,data){
       var kisi= data.paylasanKisi.KullaniciAd
    detayliBilgi.findOne({oturumSahip:kisi},function(err,longD){
       var oturumKisi=longD.oturumSahip;
        icerikKaydet.find({paylasanKisi:{KullaniciAd:oturumKisi}},function(err,result){
            icerikKaydet.find({},function(err,resul){
                return res.render('sayfa',{icerikKonu:data,kisiBilgi:longD,icerikler:result,randomic:resul});
            });
            
        });
       
    });        
    });

});
router.get('/profil/:pId',function(req,res){
    var pid=req.params.pId;
    console.log('kİd'+pid);
    sessionKontrol=req.session;
    //Veri tabanından gelen içerikleri gösterme
    detayliBilgi.find({oturumSahip:sessionKontrol.kullaniciAd_},function(err,doc){
    icerikKaydet.find({paylasanKisi:{KullaniciAd:sessionKontrol.kullaniciAd_}},function(err,data){
        return res.render('profil',{bilgi:doc,bilgiler:data});
    });
    });
    
    
});
router.get('/cikis',function(req,res){
  
  sessionKontrol=req.session;
  sessionKontrol.kullaniciAd_=null;
    return res.redirect('/');
  
});
module.exports=router;
 