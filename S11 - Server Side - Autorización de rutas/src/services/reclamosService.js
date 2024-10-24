import Reclamos from "../database/reclamos.js";
import NotificacionesService from "./notificacionesService.js";

export default class ReclamosService {

    constructor(){
        this.reclamos = new Reclamos();
        this.notificaciones = new NotificacionesService();
    }

    buscarTodos = (limit, offset, usuario) => {
        return this.reclamos.buscarTodos(limit, offset, usuario.idUsuario);
    }

    buscarPorId = (idReclamo) => {
        return this.reclamos.buscarPorId(idReclamo);
    }
    
    crear = async (reclamo) => {
        const reclamoCreado = await  this.reclamos.crear(reclamo);
        if (!reclamoCreado){
            return {estado: false, mensaje: 'Reclamo no creado'};
        }
        return {estado: true, mensaje: 'Reclamo creado', data: reclamoCreado};
    }

    modificar = async (idReclamo, datos) => {
        const existe = await this.reclamos.buscarPorId(idReclamo);
        if (existe === null) {
            return {estado: false, mensaje: 'idReclamo no existe'};
        }    

        await this.reclamos.modificar(idReclamo, datos);
        return {estado: true, mensaje: 'Reclamo modificado'};
    }


    atencionReclamo = async (idReclamo, datosReclamo) => {
        // verificar si existe el reclamo
        const existe = await this.reclamos.buscarPorId(idReclamo);
        if (existe === null) {
            return {estado: false, mensaje: 'idReclamo no existe'};
        }    

        // modificar el reclamo
        const modificado = await this.reclamos.modificar(idReclamo, datosReclamo);
        if (!modificado){
            return {estado: false, mensaje: 'Reclamo no modificado'};
        }

        // buscar los datos del cliente
        const cliente = await this.reclamos.buscarInformacionClientePorReclamo(idReclamo);
        if (!cliente){
            return {estado: false, mensaje: 'Faltan datos de cliente'};
        }

        const datosCorreo = {
            nombre: cliente[0].cliente,
            correoElectronico: cliente[0].correoElectronico,
            reclamo: idReclamo,
            estado: cliente[0].estado,
        }
        // enviar la notificacion
        return await this.notificaciones.enviarCorreo(datosCorreo);
    }

    cancelacionReclamo = async (idReclamo, datosReclamo) => {
        // verificar si existe el reclamo y se puede modificar
        const existe = await this.reclamos.sePuedeCancelar(idReclamo);
        if (existe === null) {
            return {estado: false, mensaje: 'idReclamo no existe / Ya no se puede cancelar.'};
        }    

        const modificado = await this.reclamos.modificar(idReclamo, datosReclamo);
        if (!modificado){
            return {estado: false, mensaje: 'Reclamo no cancelado'};
        }

        // buscar los datos del cliente
        const cliente = await this.reclamos.buscarInformacionClientePorReclamo(idReclamo);
        if (!cliente){
            return {estado: false, mensaje: 'Faltan datos de cliente'};
        }

        const datosCorreo = {
            nombre: cliente[0].cliente,
            correoElectronico: cliente[0].correoElectronico,
            reclamo: idReclamo,
            estado: cliente[0].estado,
        }
        // enviar la notificacion
        return await this.notificaciones.enviarCorreo(datosCorreo);        
    }
}