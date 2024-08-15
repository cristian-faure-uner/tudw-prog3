const fs = require('fs');

// funciones que exporta el modulo
console.log(fs);

// lectura de un archivo de forma sincronica
const programa = fs.readFileSync('./programa.txt', 'utf-8');
console.log(programa);

// agrego una nueva linea al final del archivo
// primer argumetno el archivo, segundo lo que quiero guardar
const nuevaLinea = '\nUnidad 2: Colecciones';
fs.appendFileSync('./programa.txt', nuevaLinea);
console.log(fs.readFileSync('./programa.txt', 'utf-8'));

// con append si el archivo no existe lo crea.
fs.appendFileSync('./programas.txt', nuevaLinea);
console.log(fs.readFileSync('./programaaa.txt', 'utf-8'));

// para crear un archivo utilizamos 
fs.writeFileSync('./nuevoArchivo.txt', 'Hola prog3');
console.log(fs.readFileSync('./nuevoArchivo.txt', 'utf-8'));

// elimino un archivo
fs.unlinkSync('./nuevoArchivo.txt');