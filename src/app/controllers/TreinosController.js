import * as Yup from 'yup';
import bcrypt from 'bcryptjs';
import Treinos from '../models/Treinos';
import User from '../models/User';

class TreinosController {

    async update(req, res) {

        const { user } = req.body;
        const { treinoId } = req.body;

        if (treinoId && treinoId != "") {
            await Treinos.updateOne({ _id: treinoId }, req.body), (err) => {
                if (err) return res.status(400).json({
                    error: true,
                    code: 105,
                    message: "Usuário Treinos não editado com sucesso!"
                });
            };

            return res.status(400).json({
                error: true,
                message: "Usuário Treino editado com sucesso!",
            })
        }

        const userExiste = await User.findOne({ _id: user });
        if (!userExiste) {
            return res.status(400).json({
                error: true,
                code: 109,
                message: "Erro: User id não encontrado"
            });
        }

        const userTreino = await Treinos.create(req.body)

        const userTreinos = await User.findOne({ _id: user });

        userTreinos.treinos.push(userTreino._id);

        await userTreinos.save()

        return res.status(200).json({
            error: false,
            message: "Usuário treino add com sucesso!",
        })
    };

    async delete(req, res) {

        const treinoId = req.params.id;

        if (treinoId && treinoId != "") {
            await Treinos.deleteOne({ _id: treinoId }, (err) => {
                if (err) return res.status(400).json({
                    error: true,
                    code: 105,
                    message: "Usuário Treinos não deletado com sucesso!"
                });
            });

            return res.status(200).json({
                error: true,
                message: "Usuário Treino deletado com sucesso!",
            })
        }
    };

};

export default new TreinosController();