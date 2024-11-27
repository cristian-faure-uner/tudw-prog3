import express from 'express';
import multer from 'multer';
import { storage } from '../../config/multer.js';

import UsuariosController from '../../controllers/usuariosController.js';
import autorizarUsuarios from '../../middlewares/autorizarUsuarios.js';

const router = express.Router();
const usuariosController = new UsuariosController();
const upload = multer( { storage } );

router.patch('/:idUsuario', upload.single('imagen'), autorizarUsuarios([1,2]), usuariosController.modificar);
// completar con un GET que retorne la imagen del usuario (idUsuario)

export {router};