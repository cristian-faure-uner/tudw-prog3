import ReclamosEstados from "../database/reclamosEstados.js";

export default class ReclamosEstadosService {

    constructor(){
        this.reclamosEstados = new ReclamosEstados();
    }

    buscarTodos = () => {
        return this.reclamosEstados.buscarTodos();
    }

    // buscarPorId = () => {
    // }
    
    crear = (reclamoEstado) => {
        return this.reclamosEstados.crear(reclamoEstado);
    }

    // modificar = () => {
    // }
}