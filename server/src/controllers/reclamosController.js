import ReclamosService from "../services/reclamosService.js";

const formatosPermitidos = ['pdf', 'csv'];

export default class ReclamosController{

    constructor(){
        this.reclamosService = new ReclamosService();
    }

    buscarTodos = async (req, res) => {
        // console.log(req.user)
        
        //Paginación
        const limit = req.query.limit;
        const offset = req.query.offset;

        try{
            //Si no están definidos limit y offset no hago paginación
            let pLimit = limit ? Number(limit) : 0;
            let pOffset = offset ? Number(offset) : 0;

            const reclamos = await this.reclamosService.buscarTodos(pLimit, pOffset, req.user);
            res.status(200).send(
                {estado: 'OK' , data: reclamos}
            );

        }catch (error){
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
            res.status(500).send({
                estado:"Falla", mensaje: "Error interno en servidor."
            });
        }
    }
    
    // no recibo el idReclamoEstado, al crear un nuevo reclamo siempre sera de tipo 1 "creado"
    // fechaCreado lo hago con NOW() de mysql
    crear = async (req, res) => {
        // console.log(req.user)
        const idUsuarioCreador = req.user.idUsuario;
        const { asunto, idReclamoTipo } = req.body;
        
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
            res.status(500).send({
                estado:"Falla", mensaje: "Error interno en servidor."
            });
        }
    }

    cancelacionReclamo = async (req, res) => {
        try{
            const idReclamo = req.params.idReclamo;

            // verificar que se reciba el idReclamo 

            const dato = {
                idReclamoEstado: 3,
                fechaCancelado: new Date().toISOString().slice(0, 19).replace('T', ' ')  // yyyy-mm-dd hh:mm:ss
            };

            const reclamoCancelado = await this.reclamosService.cancelacionReclamo(idReclamo, dato);

            if (reclamoCancelado.estado){
                res.status(200).send({estado:"OK", mensaje: reclamoCancelado.mensaje});
            }else{
                res.status(404).send({estado:"Falla", mensaje: reclamoCancelado.mensaje});
            }
        }catch (error){
            res.status(500).send({
                estado:"Falla", mensaje: "Error interno en servidor."
            });
        }
    }

    informe = async (req, res) => {

        try{
            const formato = req.query.formato;
            if(!formato || !formatosPermitidos.includes(formato)){
                return res.status(400).send({
                    estado:"Falla",
                    mensaje: "Formato inválido para el informe."    
                })
            }
            
            // generar informe
            const {buffer, path, headers} = await this.reclamosService.generarInforme(formato);

            // setear la cabecera de respuesta 
            res.set(headers)

            if (formato === 'pdf') {
                // respuesta al cliente  
                res.status(200).end(buffer);
            } else if (formato === 'csv') {
                // respuesta al cliente
                res.status(200).download(path, (err) => {
                    if (err) {
                        return res.status(500).send({
                            estado:"Falla",
                            mensaje: " No se pudo generar el informe."    
                        })
                    }
                })
            }
        }catch(error){
            console.log(error)
            res.status(500).send({
                estado:"Falla", mensaje: "Error interno en servidor."
            });
        } 
    }
}   