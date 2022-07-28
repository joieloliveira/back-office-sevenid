import app from './app';

var port = process.env.PORT || 3000;
app.listen(port, function (){
    console.log("Servidor iniciado na porta ", port);
});