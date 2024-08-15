const fs = require('fs');

// readfile asíncrono
// lee el archivo y luego llama a una fución de devolución de llamada con el contenido del archivo
// el segundo argumento indica la codificación de caracteres utilizada para decodificar el archivo en una cadena
fs.readFile('./programa.txt', 'utf-8', (error, texto) => {
    if (error){
        throw error;
    }
    console.log(texto);
})


// escribo un archivo
// no es necesario expecificar la codificación, la función asumirá que caundo se le da una cadena 
// en lugar de un objeto Buffer, debe escribirla como texto utilizando su codificación de caracteres 
// predeterminada (utf-8)
fs.writeFile('./test.txt', 'texto test', error =>{
    if (error){
        console.log('error al crear el archivo');
    }
    console.log('archivo creado');
})