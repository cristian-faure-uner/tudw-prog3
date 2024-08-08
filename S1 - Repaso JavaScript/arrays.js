/*CREAR ARRAY */

// con []
let frutas = ['ciruela', 'pera', 'granada', 'naranja'];
console.log(frutas);

// con constructor Array
let temas = new Array(5);
console.log(temas);

// multiples tipos
let varios = ['pera', 55, false, {nombre:'Arya', edad: 13}];
console.log(varios);


/*ACCEDER A LOS ELEMENTO*/
let alumnos = new Array('Daenerys', 'Arya', 'Davos');
console.log(alumnos[alumnos.length - 1])

/* RECORRER ARRAY */
for(let i=0; i < alumnos.length; i++){
    console.log(alumnos[i]);
}

for(let alumno of alumnos){
    console.log(alumno);
}

// utilizo plantilla de literales - templeta literals 
alumnos.forEach(function(alumno, indice){
    console.log(`El ${alumno} ubicado en la posición ${indice}`);
});