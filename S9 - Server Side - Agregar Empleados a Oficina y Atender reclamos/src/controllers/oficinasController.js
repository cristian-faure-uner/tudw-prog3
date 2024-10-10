import OficinasService from "../services/oficinasService.js";

export default class OficinasController{

    constructor(){
        this.service = new OficinasService
    }

    // buscarTodos = async (req, res) => {}

    // buscarPorId = async (req, res) => {}
    
    // crear = async (req, res) => {}

    // modificar = async (req, res) => {}

    agregarEmpleados = async (req, res) => {
        const { idOficina, empleados } = req.body;
        
        if (!idOficina) {
            return res.status(400).send({
                estado:"Falla",
                mensaje: "Faltan datos para crear la relación."    
            })
        }

        if (empleados.length === 0) {
            return res.status(400).send({
                estado:"Falla",
                mensaje: "Faltan datos para crear la relación."    
            })
        }

        try{
            const oficinaEmpleados = {
                idOficina, 
                empleados
            }

            const nuevoOficinaEmpleados = await this.service.agregarEmpleados(oficinaEmpleados);
            
            if (nuevoOficinaEmpleados.estado){
                res.status(200).send({estado:"OK", mensaje: nuevoOficinaEmpleados.mensaje});
            }else{
                res.status(404).send({estado:"Falla", mensaje: nuevoOficinaEmpleados.mensaje});
            }
        }catch (error){
            console.log(error);
            res.status(500).send({
                estado:"Falla", mensaje: "Error interno en servidor."
            });
        }
    }

}