var routeElektronikControl=require('./elektronikRouter');


module.exports=function (app) {
app.use('/',routeElektronikControl); //Routerda gelen istegi karşıladıgımız için urlde ne girmek istedigini seçtimiz için burda sadce elektronikroutere gönderiyoruz asıl işi orda yapıyoruz
app.use('/anasayfa',routeElektronikControl);
app.use('/login',routeElektronikControl);
app.use('/signup',routeElektronikControl);
app.use('/paylas',routeElektronikControl);
app.use('/author-login',routeElektronikControl);

}