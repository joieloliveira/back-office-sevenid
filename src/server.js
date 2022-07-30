import app from './app';

var port = process.env.PORT || 3001;
app.listen(port, function (){
    console.log("Servidor iniciado na porta ", port);
});