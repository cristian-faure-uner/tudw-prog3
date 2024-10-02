import Reclamos from "../database/reclamos.js";

export default class ReclamosService {

    constructor(){
        this.reclamos = new Reclamos();
    }

    buscarTodos = () => {
        return this.reclamos.buscarTodos();
    }

    // buscarPorId = () => {
    // }
    
    crear = (reclamo) => {
        return this.reclamos.crear(reclamo);
    }

    // modificar = () => {
    // }

    // atender = () => {
    // }
}