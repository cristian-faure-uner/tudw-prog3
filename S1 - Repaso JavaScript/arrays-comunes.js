let alumnos = new Array('Daenerys', 'Arya', 'Davos');
console.log(alumnos);

//push: agregar 1 o mas elemntos al array
alumnos.push('Ramsey');
alumnos.push('Khal', 'Olenna');
console.log(alumnos);

//pop: elimina y retora el ultimo elemento
const eliminado = alumnos.pop();
console.log(`Alumno eliminado ${eliminado}`);

//shift: elimina y retora el primer elemento
const eliminado2 = alumnos.shift();
console.log(`Alumno eliminado ${eliminado2}`);

//length: longitud del array
console.log(`Tenemos ${alumnos.length} alumnos`);

//unshift agrega 1 o mas elementos al inicio del array
alumnos.unshift('Sansa');
console.log(alumnos);

alumnos.unshift('Viserys', 'Rickon');
console.log(alumnos);