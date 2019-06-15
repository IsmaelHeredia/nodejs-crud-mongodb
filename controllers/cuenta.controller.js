const funcion = require('../functions/helper');
const Usuario = require('../models/usuario.model');

const md5 = require('md5');

const { base64encode, base64decode } = require('nodejs-base64');

exports.form_cambiar_usuario = function (req, res) {
    var mensaje_exito = req.session.mensaje_exito;
    var mensaje_error = req.session.mensaje_error;
    req.session.mensaje_exito = null;
    req.session.mensaje_error = null;
    var contenido = base64decode(req.session.ingreso);
    var partes = contenido.split("@");
    var nombre = partes[0];
    Usuario.findOne({nombre : nombre}, function (err, us) {
        Usuario.findById(us.id, function (err, usuario) {
            res.render('cuenta/cambiar_usuario', {
                titulo: 'Cambiar usuario',
                usuario: usuario,
                mensaje_exito: mensaje_exito,
                mensaje_error: mensaje_error,
                usuario_logeado: funcion.recibirUsuario(req)
            });
        });
    });
};

exports.cambiar_usuario = function (req, res) {
    Usuario.countDocuments({nombre: req.body.nombre}, function (err, cantidad){
        if(cantidad > 0) {
            req.session.mensaje_error = 'Ya existe un usuario con ese mismo nombre';
            res.redirect("/administracion/cuenta/cambiarusuario");
        } else {
            Usuario.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, usuario) {
                if (err) {
                    req.session.mensaje_error = 'Ha ocurrido un error cambiando el nombre de usuario';
                    return next(err);
                }
                req.session.mensaje_exito = 'El nombre de usuario ha sido cambiando correctamente';
                res.redirect("/administracion/salir");
            });
        }
    });
};

exports.form_cambiar_clave = function (req, res) {
    var contenido = base64decode(req.session.ingreso);
    var partes = contenido.split("@");
    var nombre = partes[0];
    Usuario.findOne({nombre : nombre}, function (err, us) {
        Usuario.findById(us.id, function (err, usuario) {
            res.render('cuenta/cambiar_clave', {
                titulo: 'Cambiar clave',
                usuario: usuario,
                usuario_logeado: funcion.recibirUsuario(req)
            });
        });
    });
};

exports.cambiar_clave = function (req, res) {
    req.body.clave = md5(req.body.clave);
    Usuario.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, usuario) {
        if (err) {
            req.session.mensaje_error = 'Ha ocurrido un error cambiando la clave';
            return next(err);
        }
        req.session.mensaje_exito = 'La clave ha sido cambiada correctamente';
        res.redirect("/administracion/salir");
    });
};