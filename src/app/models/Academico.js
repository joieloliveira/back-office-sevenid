import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Academico = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },  
    gpa_trimestre: {
        type: String,
    },
    gpa_ano_acumulativo: {
        type: String,
    },
    gpa_em_acumulativo: {
        type: String,
    },
},
{
    timestamps: true,
});

Academico.plugin(mongoosePaginate);

export default mongoose.model('academico', Academico);