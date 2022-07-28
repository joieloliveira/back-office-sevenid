import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Treinos = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },  
    data: {
        type: String,
    },
    presenca: {
        type: String,
    },
    turma: {
        type: String,
    },
    tipo_de_trabalho: {
        type: String,
    },
    intensidade: {
        type: String,
    },
    foco: {
        type: String,
    },
    observacoes_gerais: {
        type: String,
    },
},
{
    timestamps: true,
});

Treinos.plugin(mongoosePaginate);

export default mongoose.model('treinos', Treinos);