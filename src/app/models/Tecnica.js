import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Tecnica = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },  
    passe: {
        type: String,
    },
    finalizacao: {
        type: String,
    },
    drible: {
        type: String,
    },
    recomposição: {
        type: String,
    },
    passe_longo: {
        type: String,
    },
    recepcao: {
        type: String,
    },
    tipo_de_jogo: {
        type: String,
    },
    adversario: {
        type: String,
    },
    data: {
        type: String,
    },
},
{
    timestamps: true,
});

Tecnica.plugin(mongoosePaginate);

export default mongoose.model('tecnica', Tecnica);