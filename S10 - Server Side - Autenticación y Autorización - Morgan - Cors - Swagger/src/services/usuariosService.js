import Usuarios from "../database/usuarios.js";

export default class UsuariosService {

    constructor(){
        this.usuarios = new Usuarios();
    }

    buscar = (correoElectronico, contrasenia) => {
        return this.usuarios.buscar(correoElectronico, contrasenia);
    }

    buscarPorId = (idUsuario) => {
        return this.usuarios.buscarPorId(idUsuario);
    }
}