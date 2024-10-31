import express from 'express';

import ReclamosController from '../../controllers/reclamosController.js';
import autorizarUsuarios from '../../middlewares/autorizarUsuarios.js';


const router = express.Router();

const reclamosController = new ReclamosController();

/**
 * @swagger
 * components:
 *   schemas:
 *     Reclamo:
 *       type: object
 *       properties:
 *         idReclamo:
 *           type: integer
 *           description: ID del reclamo
 *         asunto:
 *           type: string
 *           description: Asunto del reclamo
 *         descripcion:
 *           type: string
 *           description: descripcion del reclamo
 *         fechaCreado:
 *           type: string
 *           format: date-time
 *           description: fecha hora de creaciópn del reclamo. 
 *         fechaFinalizado:
 *           type: string
 *           format: date-time
 *           description: fecha hora de finalización del reclamo. 
 *         fechaCancelado:
 *           type: string
 *           format: date-time
 *           description: fecha hora de cancelación del reclamo. 
 *         idReclamoEstado:
 *           type: number
 *           description: ID del estado del reclamo
 *         idReclamoTipo:
 *           type: number
 *           description: ID del tipo del reclamo
 *         idUsuarioCreador:
 *           type: number
 *           description: ID del usuario creador del reclamo
 *         idUsuarioFinalizador:
 *           type: number
 *           description: ID del usuario finalizador del reclamo
 */

/**
 * @swagger
 * /api/v1/reclamos:
 *  get:
 *      summary: Obtiene una lista de todos los reclamos
 *      security:
 *          - bearerAuth: []
 *      tags: [Reclamos]
 *      responses:
 *          200:
 *           description: lista de reclamos
 *           content:
 *            application/json:
 *             schema: 
 *              type: array
 *              items:
 *               $ref: '#/components/schemas/Reclamo'
 */
router.get('/', reclamosController.buscarTodos);

router.get('/informe',  reclamosController.informe);

/**
 * @swagger
 * /api/v1/reclamos/{idReclamo}:
 *   get:
 *     summary: Obtiene información de un reclamo
 *     tags: 
 *       - Reclamos
 *     description: Devuelve los detalles de un reclamo por su ID.
 *     parameters:
 *       - name: idReclamo
 *         in: path
 *         required: true
 *         description: El ID del reclamo que se desea obtener.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       '200':
 *         description: Reclamo encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 idReclamo:
 *                   type: integer
 *                   description: ID del reclamo
 *                   example: 1
 *                 asunto:
 *                   type: string
 *                   description: Asunto del reclamo
 *                   example: "Problema con producto"
 *                 descripcion:
 *                   type: string
 *                   description: Descripción del reclamo
 *                   example: "El producto no funcionaba correctamente"
 *                 fechaCreado:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha y hora de creación del reclamo
 *                   example: "2024-10-12T10:30:00Z"
 *                 fechaFinalizado:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha y hora de finalización del reclamo
 *                 fechaCancelado:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha y hora de cancelación del reclamo
 *                 idReclamoEstado:
 *                   type: number
 *                   description: ID del estado del reclamo
 *                   example: 1
 *                 idReclamoTipo:
 *                   type: number
 *                   description: ID del tipo de reclamo
 *                   example: 2
 *                 idUsuarioCreador:
 *                   type: number
 *                   description: ID del usuario que creó el reclamo
 *                   example: 123
 *                 idUsuarioFinalizador:
 *                   type: number
 *                   description: ID del usuario que finalizó el reclamo
 *                   example: 124
 *       '404':
 *         description: Reclamo no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No se encontró un reclamo con el ID proporcionado."
 */
router.get('/:idReclamo', reclamosController.buscarPorId);


/**
 * @swagger
 * /api/v1/reclamos:
 *   post:
 *     summary: Crear un nuevo reclamo
 *     description: Endpoint para crear un reclamo en el sistema.
 *     tags: 
 *       - Reclamos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - asunto
 *               - fechaCreacion
 *               - idusuarioCreador
 *               - idReclamoTipo
 *               - idreclamoEstado
 *             properties:
 *               asunto:
 *                 type: string
 *                 description: El asunto o título del reclamo
 *                 example: "Tren delantero defectuoso"
 *               fechaCreacion:
 *                 type: string
 *                 format: date-time
 *                 description: Fecha y hora de creación del reclamo
 *                 example: "2024-10-12T10:30:00Z"
 *               idusuarioCreador:
 *                 type: integer
 *                 description: ID del usuario que creó el reclamo
 *                 example: 123
 *               idReclamoTipo:
 *                 type: integer
 *                 description: ID del tipo de reclamo
 *                 example: 2
 *               idreclamoestado:
 *                 type: integer
 *                 description: ID del estado inicial del reclamo
 *                 example: 1
 *     responses:
 *       201:
 *         description: Reclamo creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 idReclamo:
 *                   type: integer
 *                   description: ID del reclamo
 *                   example: 456
 *                 asunto:
 *                   type: string
 *                   description: Asunto del reclamo
 *                   example: "Tren delantero defectuoso"
 *                 descripcion:
 *                   type: string
 *                   description: Descripción del reclamo
 *                 fechaCreado:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha y hora de creación del reclamo
 *                   example: "2024-10-12T10:30:00Z"
 *                 fechaFinalizado:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha y hora de finalización del reclamo
 *                 fechaCancelado:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha y hora de cancelación del reclamo
 *                 idReclamoEstado:
 *                   type: number
 *                   description: ID del estado del reclamo
 *                   example: 1
 *                 idReclamoTipo:
 *                   type: number
 *                   description: ID del tipo del reclamo
 *                   example: 2
 *                 idUsuarioCreador:
 *                   type: number
 *                   description: ID del usuario creador del reclamo
 *                   example: 123
 *                 idUsuarioFinalizador:
 *                   type: number
 *                   description: ID del usuario finalizador del reclamo
 *                   example: 124
 *       400:
 *         description: Datos faltantes o inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estado:
 *                   type: string
 *                   example: "Falla"
 *                 mensaje:
 *                   type: string
 *                   example: "Faltan datos obligatorios"
 */
router.post('/', reclamosController.crear);

/**
 * @swagger
 * /api/v1/reclamos/{idReclamo}:
 *   patch:
 *     summary: Actualiza un reclamo existente
 *     tags:
 *       - Reclamos
 *     description: Permite modificar campos de un reclamo existente. Se pueden actualizar los campos `asunto`, `descripcion`, `fechaCreado`, `fechaFinalizado`, `fechaCancelado`, `idUsuarioFinalizador`, `idReclamoTipo`, `idReclamoEstado`.
 *     parameters:
 *       - name: idReclamo
 *         in: path
 *         required: true
 *         description: El ID del reclamo que se desea actualizar.
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               asunto:
 *                 type: string
 *                 description: El asunto o título del reclamo
 *                 example: "Problema con la entrega"
 *               descripcion:
 *                 type: string
 *                 description: Descripción detallada del reclamo
 *                 example: "El pedido llegó incompleto"
 *               fechaCreado:
 *                 type: string
 *                 format: date-time
 *                 description: Fecha y hora de creación del reclamo
 *                 example: "2024-10-12T10:30:00Z"
 *               fechaFinalizado:
 *                 type: string
 *                 format: date-time
 *                 description: Fecha y hora de finalización del reclamo
 *                 example: "2024-10-13T12:00:00Z"
 *               fechaCancelado:
 *                 type: string
 *                 format: date-time
 *                 description: Fecha y hora de cancelación del reclamo
 *                 example: "2024-10-14T15:00:00Z"
 *               idUsuarioFinalizador:
 *                 type: integer
 *                 description: ID del usuario que finalizó el reclamo
 *                 example: 456
 *               idReclamoTipo:
 *                 type: integer
 *                 description: ID del tipo de reclamo
 *                 example: 2
 *               idReclamoEstado:
 *                 type: integer
 *                 description: ID del estado actual del reclamo
 *                 example: 3
 *     responses:
 *       '200':
 *         description: Reclamo actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 idReclamo:
 *                   type: integer
 *                   description: ID del reclamo actualizado
 *                   example: 1
 *                 asunto:
 *                   type: string
 *                   description: Asunto del reclamo
 *                   example: "Problema con la entrega"
 *                 descripcion:
 *                   type: string
 *                   description: Descripción del reclamo
 *                   example: "El pedido llegó incompleto"
 *                 fechaCreado:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha y hora de creación del reclamo
 *                   example: "2024-10-12T10:30:00Z"
 *                 fechaFinalizado:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha y hora de finalización del reclamo
 *                   example: "2024-10-13T12:00:00Z"
 *                 fechaCancelado:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha y hora de cancelación del reclamo
 *                   example: "2024-10-14T15:00:00Z"
 *                 idUsuarioFinalizador:
 *                   type: integer
 *                   description: ID del usuario que finalizó el reclamo
 *                   example: 456
 *                 idReclamoTipo:
 *                   type: number
 *                   description: ID del tipo de reclamo
 *                   example: 2
 *                 idReclamoEstado:
 *                   type: number
 *                   description: ID del estado actual del reclamo
 *                   example: 3
 *       '400':
 *         description: Datos inválidos o faltantes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estado:
 *                   type: string
 *                   example: "Falla"
 *                 mensaje:
 *                   type: string
 *                   example: "Faltan datos obligatorios o formato incorrecto"
 *       '404':
 *         description: Reclamo no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No se encontró un reclamo con el ID proporcionado."
 */
router.patch('/:idReclamo', reclamosController.modificar);

/**
 * @swagger
 * /api/v1/atencion:
 *   post:
 *     summary: Marca como atendido el reclamo
 *     description: Endpoint marcar como atendido el reclamo que recibe como parametro, ademas notificia al cliente el cambio de estado
 *     tags: 
 *       - Reclamos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idReclamo
 *               - idreclamoEstado
 *             properties:
 *               idReclamo:
 *                 type: integer
 *                 description: ID del  reclamo
 *                 example: 2
 *               idreclamoestado:
 *                 type: integer
 *                 description: ID del estado inicial del reclamo
 *                 example: 1
 *     responses:
 *       201:
 *         description: Correo electrónico enviado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estado:
 *                   type: string
 *                   example: "OK"
 *                 mensaje:
 *                   type: string
 *                   example: "Correo electrónico enviado."
 *       404:
 *         description: Mensaje informativo con el error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estado:
 *                   type: string
 *                   example: "Falla"
 *                 mensaje:
 *                   type: string
 *                   example: "Faltan datos obligatorios"
 */
router.post('/atencion/:idReclamo', autorizarUsuarios([2]), reclamosController.atencionReclamo);

/**
 * @swagger
 * /api/v1/cancelacion:
 *   post:
 *     summary: Marca como cancelado el reclamo
 *     description: Endpoint marcar como cancelado el reclamo que recibe como parametro, ademas notificia al cliente el cambio de estado
 *     tags: 
 *       - Reclamos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idReclamo
 *             properties:
 *               idReclamo:
 *                 type: integer
 *                 description: ID del  reclamo
 *                 example: 2
 *     responses:
 *       201:
 *         description: Correo electrónico enviado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estado:
 *                   type: string
 *                   example: "OK"
 *                 mensaje:
 *                   type: string
 *                   example: "Correo electrónico enviado."
 *       404:
 *         description: Mensaje informativo con el error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estado:
 *                   type: string
 *                   example: "Falla"
 *                 mensaje:
 *                   type: string
 *                   example: "Faltan datos obligatorios"
 */
router.post('/cancelacion/:idReclamo', autorizarUsuarios([3]), reclamosController.cancelacionReclamo);



export {router};