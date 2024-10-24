import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import passport from 'passport';
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import cors from "cors";

import fs from 'fs';
import path  from 'path';
import { fileURLToPath } from 'url';

import { estrategia, validacion } from './config/passport.js';

// middlewares
import validateContentType from './middlewares/validateContentType.js';

// rutas
import { router as v1AuthRouter } from './v1/routes/authRoutes.js';
import { router as  v1ReclamosEstadoRouter } from './v1/routes/reclamosEstadosRoutes.js';
import { router as v1ReclamosRouter } from './v1/routes/reclamosRoutes.js';
import { router as v1OficinasRouter } from './v1/routes/oficinasRoutes.js'

dotenv.config();

const app = express();

app.use(express.json());
app.use(validateContentType);
app.use(cors()); // instalar y agregar

passport.use(estrategia);
passport.use(validacion);
app.use(passport.initialize());

// obtengo la ruta del archivo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Crear un stream de escritura para el archivo de logs
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'accesos.log'), { flags: 'a' });
// Configurar Morgan para que use el formato 'combined' y guarde los logs en el archivo
app.use(morgan('combined', { stream: accessLogStream }));

app.get('/', (req, res) => {
    res.json({'estado':true});
});

// configuración swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API REST - Programación 3 - 2024',
            version: '1.0.0',
            description: 'API REST para la gestión de reclamos de la concesionaria de automóviles Prog.III. '
        },
        components: {
            securitySchemes: {
              bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
              },
            },
        },
        security: [
            {
              bearerAuth: [],
            },
        ],
        servers: [
            {
                url: 'http://localhost:3555',
            },
        ],
    },
    apis: ['./v1/routes/*.js'], 
};

// generar la especificación de swagger
const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use('/api/v1/auth', v1AuthRouter);
app.use('/api/v1/reclamos-estados', v1ReclamosEstadoRouter);
app.use('/api/v1/reclamos', passport.authenticate( 'jwt', { session:false }), v1ReclamosRouter);
app.use('/api/v1/oficinas', v1OficinasRouter);
// swagger-ui-express sirve la interfaz Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const puerto = process.env.PUERTO;
app.listen(puerto, () => {
    console.log(`Estoy escuchando en ${puerto}`);
});
