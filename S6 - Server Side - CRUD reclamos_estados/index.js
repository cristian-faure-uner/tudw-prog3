import express from 'express';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';
import path  from 'path';
import { fileURLToPath } from 'url';

import { conexion } from './db/conexion.js';

dotenv.config();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({'estado':true});
});

app.post('/notificacion', (req, res) => {
    const correDestino = req.body.correoElectronico;

    const filename = fileURLToPath(import.meta.url);
    const dir = path.dirname(`${filename}`);
    
    const plantilla = fs.readFileSync(path.join(dir + '/utiles/handlebars/plantilla.hbs'), 'utf-8');

    const templete = handlebars.compile(plantilla);

    const datos = {
        nombre :'fulanito',
        reclamo: '1234'
    }

    const correoHtml = templete(datos);

    const transporter = nodemailer.createTransport({ 
        service: 'gmail',
        auth:{
            user: process.env.CORREO, 
            pass: process.env.CLAVE
        }
    });

    const mailOptions = {
        to: correDestino,
        subject: "NOTIFICACION Prog3",
        html: correoHtml,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error enviado el correo: ", error);
        } else {
            res.json({'estado': true, 'mensaje': 'Notificación enviada'});
        }
    });
})
 

// GET 
app.get('/reclamos-estados', async (req, res) => {
    try{
        // solo los reclamos activos
        const sql = 'SELECT * FROM reclamos_estado WHERE activo = 1;';

        // la consulta retorna: un array con datos y metadatos
        // desestructuro y me quedo con la primera parte, los datos
        const [result] = await conexion.query(sql);


        // probar para ver el array de datos y metadatos
        // const result = await conexion.query(sql);
        // console.log(result);


        res.status(200).json(result);

    }catch(err){
        res.status(500).json({
            mensaje: "Error interno."
        })
    }
} )

// GET por ID
app.get('/reclamos-estados/:idReclamosEstado', async (req, res) => {
    try{
        // obtenemos el valor del parámetro que viene en la ruta de la solicitud
        const idReclamosEstado = req.params.idReclamosEstado;

        // utilizamos '?' marcadores de posicion como buena práctica
        // evita inyeccion SQL
        const sql = `SELECT * FROM reclamos_estado WHERE activo = 1 AND idReclamosEstado = ?`;

        // el valor de 'idReclamosEstado' reemplazará a '?' en la consulta SQL
        const [result] = await conexion.query(sql, [idReclamosEstado]);

        if (result.length === 0){
            return res.status(404).json({
                mensaje: "No se encontro el estado."    
            })
        }
        
        res.status(200).json(result);

    }catch(err){
        res.status(500).json({
            mensaje: "Error interno."
        })
    }
} )


// PATCH
app.patch('/reclamos-estados/:idReclamosEstado', async (req, res) =>{
    try{
        const { descripcion, activo } = req.body;

        if (!descripcion) {
            return res.status(404).json({
                mensaje: "Se requiere el campo descripción"    
            })
        }
        
        if (!activo) {
            return res.status(404).json({
                mensaje: "Se requiere el campo activo"    
            })
        }

        const idReclamosEstado = req.params.idReclamosEstado;

        const sql = 'UPDATE reclamos_estado SET descripcion = ? , activo = ?  WHERE idReclamosEstado = ?';
        const [result] = await conexion.query(sql, [descripcion, activo, idReclamosEstado]);


        if (result.affectedRows === 0) {
            return res.status(404).json({
                mensaje: "No se pudo modificadar."    
            })
        }
        
        res.status(200).json({
            mensaje: "Reclamo modificado"
        });

    }catch(err){
        res.status(500).json({
            mensaje: "Error interno."
        })
    }
})


// POST completar

const puerto = process.env.PUERTO;
app.listen(puerto, () => {
    console.log(`Estoy escuchando en ${puerto}`);
});
