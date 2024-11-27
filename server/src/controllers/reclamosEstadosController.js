import ReclamosEstadosService from "../services/reclamosEstadosService.js";

export default class ReclamosEstadosController{

    constructor(){
        this.service = new ReclamosEstadosService();
    }

    buscarTodos = async (req, res) => {
        try{
            const reclamosEstados = await this.service.buscarTodos();
            res.status(200).send(
                {estado: 'OK' , data: reclamosEstados}
            );
        }catch (error){
            console.log(error);
            res.status(500).send({
                estado:"Falla", mensaje: "Error interno en servidor."
            });
        }
    }

    // buscarPorId = async (req, res) => {
    // }
    
    crear = async (req, res) => {
        const { descripcion, activo } = req.body;
        
        if (!descripcion) {
            return res.status(400).send({
                estado:"Falla",
                mensaje: "Se requiere el campo descripción."    
            })
        }
        
        if (activo === undefined || activo === null){
            return res.status(400).send({
                estado:"Falla",
                mensaje: "Se requiere el campo activo."    
            })
        }

        try{
            const reclamoEstado = {
                descripcion, 
                activo
            }

            const nuevoReclamoEstado = await this.service.crear(reclamoEstado);
            res.status(201).send({
                estado:"OK", data: nuevoReclamoEstado
            });

        }catch (error){
            console.log(error);
            res.status(500).send({
                estado:"Falla", mensaje: "Error interno en servidor."
            });
        }
    }
    
    // modificar = async (req, res) => {
    // }

}