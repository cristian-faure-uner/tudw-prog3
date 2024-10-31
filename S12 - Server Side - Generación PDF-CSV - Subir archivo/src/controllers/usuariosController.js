import UsuariosService from "../services/usuariosService.js";

export default class UsuariosController{

    constructor(){
        this.service = new UsuariosService();
    }

    
    modificar = async (req, res) => {
        try{
            const idUsuario = req.params.idUsuario;

            if(idUsuario === undefined ){
                return res.status(400).send({
                    estado:"Falla",
                    mensaje: "Faltan datos obligatorios."    
                })
            }
            const imagen  = req.file ? req.file.filename : null;            
            const datos = { ...req.body, imagen}; 

            // const datos = req.body;

            if (Object.keys(datos).length === 0) {
                return res.status(400).send({
                    estado:"Falla",
                    mensaje: "No se enviaron datos para ser modificados."    
                });
            }

            const usuarioModificado = await this.service.modificar(idUsuario, datos);
            
            if (usuarioModificado.estado){
                res.status(200).send({estado:"OK", mensaje: usuarioModificado.mensaje});
            }else{
                res.status(404).send({estado:"Falla", mensaje: usuarioModificado.mensaje});
            }

        }catch (error){
            console.log(error)
            res.status(500).send({
                estado:"Falla", mensaje: "Error interno en servidor."
            });
        }
    }
}