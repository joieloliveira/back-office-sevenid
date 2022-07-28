import * as Yup from 'yup';
import bcrypt from 'bcryptjs';
import Tecnica from '../models/Tecnica';
import User from '../models/User';

class TecnicaController {

    async update(req, res) {
        const schema = Yup.object().shape({
            user: Yup.string()
                .required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: true,
                code: 108,
                message: "Erro: Dados do formulário inválido!"
            });
        };

        const { user } = req.body;

        const userExiste = await User.findOne({ _id: user });
        if (!userExiste) {
            return res.status(400).json({
                error: true,
                code: 109,
                message: "Erro: User id não encontrado"
            });
        }

        const userTecnicaExiste = await Tecnica.findOne({ user: user });
        if (!userTecnicaExiste) {
            const userTecnica = await Tecnica.create(req.body);

            await User.updateOne({ _id: user }, { tecnica: userTecnica._id });

            return res.status(200).json({
                error: false,
                message: "Usuário tecnica editado com sucesso!",
            })
        }

        await Tecnica.updateOne({ user: user }, req.body );

        return res.status(200).json({
            error: false,
            message: "Usuário tecnica editado com sucesso!",
        })

    };
};

export default new TecnicaController();