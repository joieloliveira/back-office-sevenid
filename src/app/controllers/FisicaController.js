import * as Yup from 'yup';
import bcrypt from 'bcryptjs';
import Fisica from '../models/Fisica';
import User from '../models/User';

class FisicaController {

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

        const userFisicaExiste = await Fisica.findOne({ user: user });
        if (!userFisicaExiste) {
            const userFisica = await Fisica.create(req.body)

            await User.updateOne({ _id: user }, { fisica: userFisica._id });

            return res.status(200).json({
                error: false,
                message:"Usuário fisica editado com sucesso!",
            })
        }

        await Fisica.updateOne({ user: user }, req.body);

        return res.status(200).json({
            error: false,
            message: "Usuário fisica editado com sucesso!",
        })

    };
};

export default new FisicaController();