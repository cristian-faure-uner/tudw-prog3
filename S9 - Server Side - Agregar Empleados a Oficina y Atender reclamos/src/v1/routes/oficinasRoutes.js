import express from 'express';

import OficinasController from '../../controllers/oficinasController.js';

const router = express.Router();

const oficinasController = new OficinasController();

// router.get('/', oficinasController.buscarTodos);
// router.get('/:idOficina', oficinasController.buscarPorId);
// router.post('/', oficinasController.crear);
// router.patch('/:idOficina', oficinasController.modificar);

router.post('/agregar-empleados', oficinasController.agregarEmpleados);
// router.post('/quitar-empleados', oficinasController.quitarEmpleados);


export {router};