import * as Yup from 'yup';
import bcrypt from 'bcryptjs';
import Academico from '../models/Academico';
import User from '../models/User';

class AcademicoController {

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

        const userAcademicoExiste = await Academico.findOne({ user: user });
        if (!userAcademicoExiste) {
            const userAcademico = await Academico.create(req.body)

            await User.updateOne({ _id: user }, { academico: userAcademico._id });

            return res.status(200).json({
                error: false,
                message: "Usuário academico editado com sucesso!",
            })
        }

        await Academico.updateOne({ user: user }, req.body );

        return res.status(200).json({
            error: false,
            message: "Usuário academico editado com sucesso!",
        })

    };
};

export default new AcademicoController();