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

// passport
import { estrategia, validacion } from './config/passport.js';
// configuración swagger
import { swaggerOptions } from './config/swagger.js';

// middlewares
import validateContentType from './middlewares/validateContentType.js';

// rutas
import { router as v1AuthRouter } from './v1/routes/authRoutes.js';
import { router as  v1ReclamosEstadoRouter } from './v1/routes/reclamosEstadosRoutes.js';
import { router as v1ReclamosRouter } from './v1/routes/reclamosRoutes.js';
import { router as v1OficinasRouter } from './v1/routes/oficinasRoutes.js'
import { router as v1Usuarios } from './v1/routes/usuariosRoutes.js'

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors()); 

passport.use(estrategia);
passport.use(validacion);
app.use(passport.initialize());

// morgan
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'accesos.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));


// como test api rest
app.get('/api/v1/', (req, res) => {
    res.json({'estado': true});
});

app.use('/api/v1/auth', v1AuthRouter);
app.use('/api/v1/reclamos-estados', v1ReclamosEstadoRouter);
app.use('/api/v1/reclamos', passport.authenticate( 'jwt', { session:false }), v1ReclamosRouter);
app.use('/api/v1/oficinas', v1OficinasRouter);
app.use('/api/v1/usuarios', passport.authenticate( 'jwt', { session:false }), v1Usuarios);

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const puerto = process.env.PUERTO;
app.listen(puerto, () => {
    console.log(`Estoy escuchando en ${puerto}`);
});
