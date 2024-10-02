import ReclamosService from "../services/reclamosService.js";

export default class ReclamosController{

    constructor(){
        this.service = new ReclamosService();
    }

    buscarTodos = async (req, res) => {
        try{
            const reclamos = await this.service.buscarTodos();
            res.status(200).send(reclamos)

        }catch (error){
            console.log(error);
            res.status(500).send({
                estado:"Falla", mensaje: "Error interno en servidor."
            });
        }
    }

    // buscarPorId = async (req, res) => {
    // }
    
    // no recibo el idReclamoEstado, al crear un nuevo reclamo siempre sera de tipo 1 "creado"
    // fechaCreado lo hago con NOW() de mysql
    crear = async (req, res) => {
        const { asunto, idReclamoTipo, idUsuarioCreador } = req.body;
        
        if (asunto === undefined || idReclamoTipo === undefined || idUsuarioCreador === undefined) {
            return res.status(400).send({
                estado:"Falla",
                mensaje: "Faltan datos obligatorios."    
            })
        }
        
        try{
            const reclamo = {
                asunto, 
                idReclamoTipo, 
                idUsuarioCreador
            }

            const nuevoReclamo = await this.service.crear(reclamo);
            res.status(201).send({
                estado:"OK", data: nuevoReclamo
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