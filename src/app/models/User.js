import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const User = new mongoose.Schema({
    name: {
        type: String,

    },
    email: {
        type: String,

    },
    cel: {
        type: String,

    },
    data_de_inicio: {
        type: String,

    },
    data_de_nascimento: {
        type: String,

    },
    turma: {
        type: String,

    },
    formatura_e_m: {
        type: String,

    },
    expectativa_de_viagem: {
        type: String,

    },
    academico: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'academico',
    },
    fisica: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'fisica',
    },
    ingles: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ingles',
    },
    tecnica: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tecnica',
    },
    treinos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'treinos',
    }],
    ativo: {
        type: Boolean,
    },
},
    {
        timestamps: true,
    });

User.plugin(mongoosePaginate);

export default mongoose.model('user', User);