import { conexion } from "./conexion.js";

export default class Usuarios{

    buscar = async (correoElectronico, contrasenia) => {
        const sql = `SELECT u.idUsuario, CONCAT(u.nombre, ' ', u.apellido) as usuario, u.idUsuarioTipo
            FROM usuarios  AS u
            WHERE u.correoElectronico = ? 
                AND u.contrasenia = SHA2(?, 256) 
                AND u.activo = 1;`
        const [result] = await conexion.query(sql, [correoElectronico, contrasenia]);
        return result[0];
    }

    buscarPorId = async (idUsuario) => {
        const sql = `SELECT CONCAT(u.nombre, ' ', u.apellido) as usuario, u.idUsuarioTipo, u.idUsuario
            FROM usuarios  AS u
            WHERE u.idUsuario = ?
                AND u.activo = 1;`
        const [result] = await conexion.query(sql, [idUsuario]);
        return result[0];
    }
}