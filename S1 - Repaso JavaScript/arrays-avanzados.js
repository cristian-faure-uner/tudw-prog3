// array de objetos
let alumnos = [
    {nombre: 'Daenerys', edad: 30},
    {nombre: 'Jon Snow', edad: 30},
    {nombre: 'Arya Stark', edad: 12},
    {nombre: 'Samwell Tarly', edad: 25},
    {nombre: 'Robert Baratheon', edad: 40},
]

let alumnosMayores = alumnos.filter(alumno => alumno.edad > 20);
console.log(alumnosMayores);

let nombreAlumnosMayores = alumnos
    .filter(alumno => alumno.edad > 20)
    .map( alumno => alumno.nombre);

console.log(nombreAlumnosMayores);


// find() retorna el primer elemento en pasar la prueba
let primero = alumnos.find(alumno => alumno.edad > 20);
console.log(primero);

// findIndex() retorna el indice del elemento en pasar la prueba
let pasaPrueba2 = alumnos.findIndex(alumno =>  alumno.edad >= 30);
console.log(pasaPrueba2);