//objeto 

let alumno = {
    matricula:  123,
    nombre: 'Ignacio',
    apellido: 'Novello',
    conocimiento: 70,

    estudiar: function(){
        this.conocimiento = this.conocimiento + 5;
    }
}

// acceder a las propiedades del objeto
console.log(alumno.conocimiento);
alumno.estudiar();
console.log(alumno.conocimiento);


// segunda forma de acceder a la propiedad del objeto
console.log(alumno['apellido'])
