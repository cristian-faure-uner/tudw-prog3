import { conexion } from "./conexion.js";

export default class Reclamos{

    buscarTodos = async (limit = 0, offset = 0) => {
        let sql = `SELECT r.idReclamo, r.asunto, r.descripcion, r.fechaCreado, r.fechaFinalizado, r.fechaCancelado, 
                        r.idReclamoEstado, re.descripcion AS "Descripción Estado", 
                        r.idReclamoTipo, rt.descripcion AS "Descripción Tipo", 
                        u.nombre AS "Creado por"
                        FROM reclamos AS r
                        INNER JOIN reclamos_tipo AS rt ON rt.idReclamoTipo = r.idReclamoTipo
                        INNER JOIN reclamos_estado AS re ON re.idReclamoEstado = r.idReclamoEstado
                        INNER JOIN usuarios AS u ON u.idUsuario = r.idUsuarioCreador `

        if (limit) {
            sql += 'LIMIT ? OFFSET ? ';
        }

        const [result] = await conexion.query(sql, [limit, offset]);
        return result;
    }

    buscarPorId = async (idReclamo) => {
        const sql = `SELECT * FROM reclamos WHERE idReclamo = ?`;
        const [result] = await conexion.query(sql, [idReclamo]);
        return (result.length > 0) ? result[0] : null;
    }
    
    // los reclamos siempre tipo 1 = CREADO
    // la fecha y hora de creación la agrega la bd
    crear = async ({asunto, idReclamoTipo, idUsuarioCreador}) => {

        const sql = `INSERT INTO reclamos (asunto, fechaCreado, idReclamoTipo, idReclamoEstado, idUsuarioCreador)
                    VALUES (?, NOW(), ?, 1, ?)`;
        const [result] = await conexion.query(sql, [asunto, idReclamoTipo, idUsuarioCreador]);

        if (result.affectedRows === 0) {
            return false;
        }
        
        return this.buscarPorId(result.insertId);
    }

    modificar = async (idReclamo, datos) => {
        const sql = 'UPDATE reclamos SET ? WHERE idReclamo = ?';
        const [result] = await conexion.query(sql, [datos, idReclamo]);
        
        if (result.affectedRows === 0) {
            return false;
        }
        
        return true;
    }

    buscarInformacionClientePorReclamo = async (idReclamo) => {
        const sql = `SELECT CONCAT(u.apellido, ', ', u.nombre) AS cliente, u.correoElectronico, rt.descripcion AS estado 
                        FROM reclamos AS r 
                        INNER JOIN usuarios AS u ON u.idUsuario = r.idUsuarioCreador 
                        INNER JOIN reclamos_estado AS rt ON rt.idReclamoEstado = r.idReclamoEstado
                        WHERE r.idReclamo = ?;`;
        const [result] = await conexion.query(sql, [idReclamo]);

        return result;
    }

    buscarDatosReportePdf = async () => {
        // const sql = `SELECT r.idReclamo as 'reclamo', rt.descripcion as 'tipo', re.descripcion AS 'estado', r.fechaCreado AS 'fechaCreado', CONCAT(u.nombre, ' ', u.apellido) AS 'cliente'
        //             FROM reclamos AS r 
        //             INNER JOIN reclamos_tipo AS rt ON rt.idReclamoTipo = r.idReclamoTipo 
        //             INNER JOIN reclamos_estado AS re ON re.idReclamoEstado = r.idReclamoEstado 
        //             INNER JOIN usuarios AS u ON u.idUsuario = r.idUsuarioCreador 
        //                 WHERE r.idReclamoEstado <> 4;`;
        const sql = 'CALL `estadistica`(@p0, @p1, @p2, @p3, @p4);';

        const [result] = await conexion.query(sql);

        console.log(result);
        const datosReporte = {
            reclamosTotales : result[0][0].reclamosTotales,
            reclamosNoFinalizados : result[1][0].reclamosNoFinalizados,
            reclamosFinalizados : result[2][0].reclamosFinalizados,
            descripcionTipoRreclamoFrecuente : result[3][0].descripcionTipoRreclamoFrecuente,
            cantidadTipoRreclamoFrecuente : result[3][0].cantidadTipoRreclamoFrecuente
        }

        return datosReporte;
    }

    buscarDatosReporteCsv = async () => {
        const sql = `SELECT r.idReclamo as 'reclamo', rt.descripcion as 'tipo', re.descripcion AS 'estado', r.fechaCreado AS 'fechaCreado', CONCAT(u.nombre, ' ', u.apellido) AS 'cliente'
                    FROM reclamos AS r 
                    INNER JOIN reclamos_tipo AS rt ON rt.idReclamoTipo = r.idReclamoTipo 
                    INNER JOIN reclamos_estado AS re ON re.idReclamoEstado = r.idReclamoEstado 
                    INNER JOIN usuarios AS u ON u.idUsuario = r.idUsuarioCreador 
                        WHERE r.idReclamoEstado <> 4;`;

        const [result] = await conexion.query(sql);
        return result;
    }
}