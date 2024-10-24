// funcion que evalua el perfil que quiero autorizar
export default function autorizarUsuarios ( perfilAutorizados = [] ) {

    return (req, res, next) => {

        const usuario = req.user;

        if(!usuario || !perfilAutorizados.includes(usuario.idUsuarioTipo)) {
            return res.status(403).json({
                estado:"Flla",
                mesaje:"Acceso denegado."
            })
        }


        next(); //continua
    }
}