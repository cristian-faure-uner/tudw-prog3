import express from 'express';

import ReclamosController from '../../controllers/reclamosController.js';

const router = express.Router();

const reclamosController = new ReclamosController();



router.get('/', reclamosController.buscarTodos);
router.get('/:idReclamo', reclamosController.buscarPorId);
router.post('/', reclamosController.crear);
router.patch('/:idReclamo', reclamosController.modificar);
router.post('/atencion/:idReclamo', reclamosController.atencionReclamo);

export {router};