import ReclamosService from "../services/reclamosService.js";

export default class ReclamosController{

    constructor(){
        this.reclamosService = new ReclamosService();
    }

    buscarTodos = async (req, res) => {
        //Paginación
        const limit = req.query.limit;
        const offset = req.query.offset;

        try{
            //Si no están definidos limit y offset no hago paginación
            let pLimit = limit ? Number(limit) : 0;
            let pOffset = offset ? Number(offset) : 0;

            const reclamos = await this.reclamosService.buscarTodos(pLimit, pOffset);
            res.status(200).send(
                {estado: 'OK' , data: reclamos}
            );

        }catch (error){
            console.log(error);
            res.status(500).send({
                estado:"Falla", mensaje: "Error interno en servidor."
            });
        }
    }

    buscarPorId = async (req, res) => {
        const idReclamo = req.params.idReclamo;

        if (idReclamo === undefined) {
            return res.status(400).send({
                estado:"Falla",
                mensaje: "Faltan datos obligatorios."    
            })
        }

        try{
            const reclamo = await this.reclamosService.buscarPorId(idReclamo);
            res.status(200).send({estado: 'OK' , data: reclamo})

        }catch (error){
            console.log(error);
            res.status(500).send({
                estado:"Falla", mensaje: "Error interno en servidor."
            });
        }
    }
    
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

            const nuevoReclamo = await this.reclamosService.crear(reclamo);

            if (nuevoReclamo.estado){
                res.status(201).send({estado:"OK", data: nuevoReclamo.data});
            }else{
                res.status(404).send({estado:"Falla", mensaje: nuevoReclamo.mensaje});
            }

        }catch (error){
            console.log(error);
            res.status(500).send({
                estado:"Falla", mensaje: "Error interno en servidor."
            });
        }
    }

    modificar = async (req, res) => {
        try{
            const idReclamo = req.params.idReclamo;
            if(idReclamo === undefined ){
                return res.status(400).send({
                    estado:"Falla",
                    mensaje: "Faltan datos obligatorios."    
                })
            }

            // puede recibir uno o varios datos
            // puedo reutilizar el método para la "atención" o "cancelación" de reclamos
            const datos = req.body;

            if (Object.keys(datos).length === 0) {
                return res.status(400).send({
                    estado:"Falla",
                    mensaje: "No se enviaron datos para ser modificados."    
                });
            }

            const reclamoModificado = await this.reclamosService.modificar(idReclamo, datos);

            if (reclamoModificado.estado){
                res.status(200).send({estado:"OK", mensaje: reclamoModificado.mensaje});
            }else{
                res.status(404).send({estado:"Falla", mensaje: reclamoModificado.mensaje});
            }

        }catch (error){
            console.log(error)
            res.status(500).send({
                estado:"Falla", mensaje: "Error interno en servidor."
            });
        }
    }

    atencionReclamo = async (req, res) => {
        try{
            const idReclamo = req.params.idReclamo;
            const idReclamoEstado = req.body.idReclamoEstado;

            if(idReclamoEstado === undefined){
                return res.status(400).send({
                    estado:"Falla",
                    mensaje: "Faltan datos obligatorios."    
                })
            }
            
            const dato = {
                idReclamoEstado
            } 

            const reclamoModificado = await this.reclamosService.atencionReclamo(idReclamo, dato);

            if (reclamoModificado.estado){
                res.status(200).send({estado:"OK", mensaje: reclamoModificado.mensaje});
            }else{
                res.status(404).send({estado:"Falla", mensaje: reclamoModificado.mensaje});
            }

        }catch (error){
            console.log(error)
            res.status(500).send({
                estado:"Falla", mensaje: "Error interno en servidor."
            });
        }
    }
}   