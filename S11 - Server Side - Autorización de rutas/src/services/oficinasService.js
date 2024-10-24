import Oficinas from "../database/oficinas.js";

export default class OficinasService {

    constructor(){
        this.oficinas = new Oficinas();
    }

    // buscarTodos = () => {}

    // buscarPorId = (idOficina) => {}
    
    // crear = (oficina) => {}

    // modificar = (idOficina, datos) => {}

    agregarEmpleados = async (oficinaEmpleados) => {
        // podria controlar 
        // si los empleados existen
        // si los empleados ya no estan en la relacion con la oficina (activo 1)
        
        return await this.oficinas.agregarEmpleados(oficinaEmpleados);
    }
}