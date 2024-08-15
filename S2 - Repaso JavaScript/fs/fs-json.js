const fs = require('fs');

// leo el archivo de personajes.
const datos = fs.readFileSync('./personajes.json', 'utf-8');
console.log(datos);

// convierto la cadena de text (en formato JSON) en un objeto JavaScript.
const personajes = JSON.parse(datos);
console.log(personajes);

// nuevo personaje
const personajeNuevo = {
    "id": 8,
    "nombre": "Robert Baratheon"
}

// agrego a mi array de personajes
personajes.push(personajeNuevo);

// muestro en pantalla
console.log(personajes);

// convierto el objeto JavaScritp en una cadena de txto en formato JSON
const personajeCadena = JSON.stringify(personajes);
// guardo el personaje en mi archivo
fs.writeFileSync('./personajes.json', personajeCadena);
