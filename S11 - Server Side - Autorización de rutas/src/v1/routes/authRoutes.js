import express from 'express';
import AuthController from '../../controllers/authController.js';
import { check } from 'express-validator';

import { validarCampos } from '../../middlewares/validarCampos.js';

const router = express.Router();
const authController = new AuthController();

router.post('/login', 
    [
        check('correoElectronico', 'El correo electrónico es requerido!').not().isEmpty(),
        check('correoElectronico', 'Revisar el formato del correo electrónico!').isEmail(),
        check('contrasenia', 'La contrasenia es requerida!').not().isEmpty(),
        validarCampos
    ], 
    authController.login);

export {router};