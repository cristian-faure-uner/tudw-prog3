import { createObjectCsvWriter } from 'csv-writer';
import puppeteer, { Browser } from "puppeteer";
import handlebars from 'handlebars';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class InformeService {
    
    informeReclamosCsv = async (datosReporte) => {
        let ruta = path.resolve(__dirname, '..');
        ruta = path.join(ruta, '/utiles/reclamos.csv'); 

        // configuro un escrito csv
        const csvWriter = createObjectCsvWriter({
            path: ruta, 
            header: [
                {id: 'reclamo', title: 'RECLAMO'},
                {id: 'tipo', title: 'TIPO'},
                {id: 'estado', title: 'ESTADO'},
                {id: 'fechaCreado', title: 'FECHA CREADO'},
                {id: 'cliente', title: 'CLIENTE'},
            ],
            encoding:'utf-8' 
        });

        // genero csv
        await csvWriter.writeRecords(datosReporte);

        //
        return ruta;
    }

    informeReclamosPdf = async (datosReporte) => {
        try{
            const filePath = path.join(__dirname, '../utiles/handlebars/plantilla-informe.html');
            const htmlTemplate = fs.readFileSync(filePath, 'utf8');

            const template = handlebars.compile(htmlTemplate);
            const htmlFinal = template(datosReporte);

            // lanzo puppeteer, 
            const browser = await puppeteer.launch();

            // abrir un pagina
            const page = await browser.newPage();

            // cargo la plantilla 
            await page.setContent(htmlFinal, {waitUntil: 'load'});

            // genero pdf
            const pdfBuffer = await page.pdf({
                format:'A4',
                printBackground: true,
                margin: {top: '10px', bottom: '10px' }
            });

            // 
            await browser.close();

            return pdfBuffer;

        }catch(error){
            console.error('Error generando el PDF:', error);
            throw error;
        }
    }

}


