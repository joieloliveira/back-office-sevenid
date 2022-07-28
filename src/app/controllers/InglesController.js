import * as Yup from 'yup';
import bcrypt from 'bcryptjs';
import Ingles from '../models/Ingles';
import User from '../models/User';

class InglesController {

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

        const userInglesExiste = await Ingles.findOne({ user: user });
        if (!userInglesExiste) {
            const userIngles = await Ingles.create(req.body);

            await User.updateOne({ _id: user }, { ingles: userIngles._id });

            return res.status(200).json({
                error: false,
                message: "Usuário ingles editado com sucesso!",
            })
        }

        await Ingles.updateOne({ user: user }, req.body );

        return res.status(200).json({
            error: false,
            message: "Usuário ingles editado com sucesso!",
        })

    };
};

export default new InglesController();