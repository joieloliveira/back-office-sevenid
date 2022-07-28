import * as Yup from 'yup';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import Fisica from '../models/Fisica';

class UserController {

    async index(req, res) {

        res.json({Name: "Ola Mundo"});

        // const { page = 1 } = req.query;
        // const { limit = 40 } = req.query;
        // await User.paginate({ ativo: true }, {
        //     select: '_id name email cel data_de_inicio data_de_nascimento turma formatura_e_m expectativa_de_viagem createdAt updatedAt',
        //     page,
        //     limit,
        //     populate: 'academico fisica ingles tecnica treinos'
        //     // populate: ({
        //     //     path: 'treinos',
        //     //     options: { limit: 2 }
        //     // })
        // }).then((users) => {

        //     return res.json({
        //         error: false,
        //         users: users
        //     });
        // }).catch((erro) => {
        //     return res.status(400).json({
        //         error: true,
        //         code: 106,
        //         message: "Erro: Não foi possível executar a solicitação!"
        //     });
        // });
    };

    async show(req, res) {
        User.findOne({ _id: req.params.id }, ' _id name email cel  createdAt updatedAt').then((user) => {

            return res.json({
                error: false,
                user: user
            });
        }).catch((err) => {
            return res.status(400).json({
                error: true,
                code: 107,
                message: "Erro: Não foi possível executar a solicitação!"
            })
        });
    };

    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string()
                .required(),
            email: Yup.string()
                .email()
                .required(),
            // cel: Yup.string()
            //     .required(),
            // data_de_inicio: Yup.string()
            //     .required(),
            // data_de_nascimento: Yup.string()
            //     .required(),
            // turma: Yup.string()
            //     .required(),
            // formatura_e_m: Yup.string()
            //     .required(),
            // expectativa_de_viagem: Yup.string()
            //     .required(),
            // password: Yup.string()
            //     .required()
            //     .min(6)
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: true,
                code: 103,
                message: "Error: Dados inválidos!"
            });
        };

        const emailExiste = await User.findOne({ email: req.body.email });
        if (emailExiste) {
            return res.status(400).json({
                error: true,
                code: 102,
                message: "Error: Este e-mail já está cadastrado!"
            });
        };

        var dados = req.body;
        //dados.password = await bcrypt.hash(dados.password, 8);

        const user = await User.create({ ...dados, ativo: true }, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 101,
                message: "Error: Usuário não foi cadastrado com sucesso!"
            });

            return res.status(200).json({
                error: false,
                message: "Usuário cadastrado com sucesso!",
                data: user
            })
        });
    };

    async update(req, res) {
        const schema = Yup.object().shape({
            _id: Yup.string()
                .required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: true,
                code: 108,
                message: "Erro: Dados do formulário inválido!"
            });
        };

        const { _id } = req.body;

        const usuarioExiste = await User.findOne({ _id: _id });

        if (!usuarioExiste) {
            return res.status(400).json({
                error: true,
                code: 109,
                message: "Erro: Usuário não encontrado!"
            });
        };

        var dados = req.body;
        // if (dados.password) {
        //     dados.password = await bcrypt.hash(dados.password, 8);
        // };

        await User.updateOne({ _id: dados._id }, dados, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 111,
                message: "Erro: Usuário não foi editado com sucesso!"
            });

            return res.json({
                error: false,
                message: "Usuário editado com sucesso!"
            });
        });
    };

    async desatibilitar(req, res) {
        const usuarioExiste = await User.findOne({ _id: req.params.id }, 'ativo');
        
        if (usuarioExiste.ativo==false) {
            await User.deleteOne({ _id: req.params.id }, (err) => {
                if (err) return res.status(400).json({
                    error: true,
                    code: 105,
                    message: "Error: Usuário não foi excluido permanentemente!"
                });
            });
            return res.status(200).json({
                error: false,
                message: "Usuário foi excluido permanentemente!"
            });
        };

        if (!usuarioExiste) {
            return res.status(400).json({
                error: true,
                code: 104,
                message: "Erro: Usuário não encontrado"
            });
        };

        const user = await User.updateOne({ _id: req.params.id }, { ativo: false }, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 105,
                message: "Error: Usuário não foi desabilitado com sucesso!"
            });
        });

        // const fisica = await Fisica.deleteOne({ user: req.params.id }, (err) => {
        //     if (err) return res.status(400).json({
        //         error: true,
        //         code: 105,
        //         message: "Error: Usuário.fisica não foi apagado com sucesso!"
        //     });
        // });

        return res.json({
            error: false,
            message: "Usuário desabilitado com sucesso!"
        });
    };

    async restaurar(req, res) {

        const usuarioExiste = await User.findOne({ _id: req.params.id });
        if (!usuarioExiste) {
            return res.status(400).json({
                error: true,
                code: 104,
                message: "Erro: Usuário não encontrado"
            });
        };

        const user = await User.updateOne({ _id: req.params.id }, { ativo: true }, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 105,
                message: "Error: Usuário não restaurado com sucesso!"
            });
        });

        // const fisica = await Fisica.deleteOne({ user: req.params.id }, (err) => {
        //     if (err) return res.status(400).json({
        //         error: true,
        //         code: 105,
        //         message: "Error: Usuário.fisica não foi apagado com sucesso!"
        //     });
        // });

        return res.json({
            error: false,
            message: "Usuário restaurado com sucesso!"
        });
    };

    async excluidos(req, res) {

        // res.json({Name: "Joiel"});

        const { page = 1 } = req.query;
        const { limit = 40 } = req.query;
        await User.paginate({ ativo: false }, { select: '_id name email cel createdAt updatedAt', page, limit }).then((users) => {

            return res.json({
                error: false,
                users: users
            });
        }).catch((erro) => {
            return res.status(400).json({
                error: true,
                code: 106,
                message: "Erro: Não foi possível executar a solicitação!"
            });
        });
    };

};

export default new UserController();