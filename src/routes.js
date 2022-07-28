import { Router } from 'express';
import multer from 'multer';
import multerUpImgUsers from './app/middlewares/uploadImgUser';

import UserController from './app/controllers/UserController';
import LoginController from './app/controllers/LoginController';
import PerfilController from './app/controllers/PerfilController';
import PerfilImagemController from './app/controllers/PerfilImagemController';
import FisicaController from './app/controllers/FisicaController';
import AcademicoController from './app/controllers/AcademicoController';
import InglesController from './app/controllers/InglesController';
import TecnicaController from './app/controllers/TecnicaController';
import TreinosController from './app/controllers/TreinosController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const uploadImgUser = multer(multerUpImgUsers);

routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/users', UserController.store);
routes.put('/users', UserController.update);
routes.delete('/users/:id', UserController.desatibilitar);

routes.get('/excluidosUsers', UserController.excluidos);
routes.put('/restaurarUsers/:id', UserController.restaurar);

routes.put('/fisica', FisicaController.update);
routes.put('/academico', AcademicoController.update);
routes.put('/ingles', InglesController.update);
routes.put('/tecnica', TecnicaController.update);
routes.put('/treinos', TreinosController.update);
routes.delete('/treinos/:id', TreinosController.delete);

routes.get('/perfil', authMiddleware, PerfilController.show);
routes.put('/perfil', authMiddleware, PerfilController.update);
routes.put('/perfil-img', authMiddleware, uploadImgUser.single('file'),  PerfilImagemController.update);

routes.post('/login', LoginController.store);

export default routes;

//routes.delete('/users/:id', authMiddleware, UserController.delete);