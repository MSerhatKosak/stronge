var mongoose =require('mongoose');
mongoose.Promise=require('bluebird');
var ConnectionUrl='mongodb://localhost:27017/database';
mongoose.connect(ConnectionUrl,{ useNewUrlParser: true },function(err,erro){

    if(err){
        console.log('Baglanmadı '+err);
       
    }
    
    else {
        console.log('Baglandı adreside bu: '+ConnectionUrl);
    }
    
   
});