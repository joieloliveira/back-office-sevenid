import mongoose from 'mongoose';

class DataBase {
    constructor() {
        this.mongoDataBase();
    }
    mongoDataBase() {
        this.mongoDBConnection = mongoose.connect('mongodb+srv://sevenidadm:sevenidadm123@cluster0.qipl1.mongodb.net/test', {
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