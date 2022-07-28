import mongoose from 'mongoose';

class DataBase {
    constructor() {
        this.mongoDataBase();
    }
    mongoDataBase() {
        this.mongoDBConnection = mongoose.connect('mongodb://localhost/sevenBackOffice', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("Conexão com MongoDB realizada com sucesso!")
        }).catch((erro) => {
            console.log("Erro: Conexão com MongoDB não foi realizado com sucesso: " + erro)
        })
    }
}

export default new DataBase();
//'mongodb+srv://joieloliveira:jo131012@cluster0.zqnjq.mongodb.net/test'