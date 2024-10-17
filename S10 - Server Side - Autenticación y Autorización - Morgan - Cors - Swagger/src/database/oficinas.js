import { conexion } from "./conexion.js";


export default class Oficinas{

    // buscarTodos = async () => {}

    // buscarPorId = async (idOficina) => {}

    // crear = async ({nombre, idReclamoTipo}) => {}

    // modificar = async (idOficina, datos) => {}
    
    agregarEmpleados = async ({idOficina, empleados}) => {
        let agregados = 0;
        try{
            // iniciar transacción
            await conexion.beginTransaction();

            // por cada empleado hacer insert, aumentar agregados
            for (const empleado of empleados){
                const sql = `INSERT INTO usuarios_oficinas (idUsuario, idOficina, activo) VALUES (?,?, 1);`;
                const result = conexion.query(sql, [empleado.idUsuario, idOficina]);
                agregados += 1;
            }

            // confirmar transacción
            await conexion.commit();

            // return respuesta
            return {estado: true, mensaje: `se agergaron ${agregados} empleados `};

        }catch (error){
            // revierto la transacción en caso de error.
            await conexion.rollback();
            console.log(error)
            return { estado: false, mensaje: 'Error al agergar empleados a la oficina.' };
        }
    }
}