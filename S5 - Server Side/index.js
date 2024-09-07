import express from 'express';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';
import path  from 'path';
import { fileURLToPath } from 'url';

// cargo las variables de entorno que defini en '.env'
dotenv.config();

// creo una instancia de express
const app = express();

// defino un middleware para mi aplicacion 
// que procese las solicitudes en formato JSON
app.use(express.json());


// primer endpoint de mi aplicación, ruta de prueba
app.get('/', (req, res) => {
    // res.status(200).send({'estado':true});
    res.json({'estado':true});
});


// endpoint para 'notificar a un cliente' a través de un correo
// utiliza el método POST de HTTP
// recibe un JSON con el correo electrónico del destinatario
app.post('/notificacion', (req, res) => {
    const correDestino = req.body.correoElectronico;

    // convierto la URL del archivo actual 'index.js' en una ruta de archivo
    const filename = fileURLToPath(import.meta.url);
    // obtengo el directorio de index.js'
    const dir = path.dirname(`${filename}`);
    
    // leo el archivo 'plantilla.hbs' 
    // contiene una plantilla handlebars que quiero enviar al cliente
    const plantilla = fs.readFileSync(path.join(dir + '/utiles/handlebars/plantilla.hbs'), 'utf-8');

    // compilo la plantilla, otengo una funcion 'template'
    const templete = handlebars.compile(plantilla);

    const datos = {
        nombre :'fulanito',
        reclamo: '1234'
    }

    // a mi plantilla le paso la información que quiero mandar
    // handlebars va a reemplazar los ''{{}}'' con la información de 'datos'
    const correoHtml = templete(datos);

    // creo el transportador que nodemailer utiliza para el envio de correos electrónicos
    // le paso los datos de configuración que necesita: 
    // * el servicio que voy a utilizar
    // * usuario y constraseña
    const transporter = nodemailer.createTransport({ 
        service: 'gmail',
        auth:{
            user: process.env.CORREO, // no olvidar definir en el .env
            pass: process.env.CLAVE
        }
    });

    // opciones de envio 
    const mailOptions = {
        to: correDestino,
        subject: "NOTIFICACION Prog3",
        html: correoHtml,
    };

    // envio el correo electrónico
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error enviado el correo: ", error);
        } else {
            // console.log("Correo enviado: ", info.response);
            res.json({'estado': true, 'mensaje': 'Notificación enviada'});
        }
    });
})
 

const puerto = process.env.PUERTO;
// lanzo mi aplicación en el puero configurado en .env 
app.listen(puerto, () => {
    console.log(`Estoy escuchando en ${puerto}`);
});
