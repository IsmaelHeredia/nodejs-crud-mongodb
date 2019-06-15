const funcion = require('../functions/helper');
const Usuario = require('../models/usuario.model');

const md5 = require('md5');

exports.listar = function (req, res) {
    var mensaje_exito = req.session.mensaje_exito;
    var mensaje_error = req.session.mensaje_error;
    req.session.mensaje_exito = null;
    req.session.mensaje_error = null;
    Usuario.find(function (err, usuarios){
        if (err) return next(err);
        res.render('usuarios/listar', {
            titulo: 'Usuarios',
            usuarios: usuarios,
            mensaje_exito: mensaje_exito,
            mensaje_error: mensaje_error,
            usuario_logeado: funcion.recibirUsuario(req)
        });
    });
};

exports.form_agregar_usuario = function (req, res) {
    var mensaje_exito = req.session.mensaje_exito;
    var mensaje_error = req.session.mensaje_error;
    req.session.mensaje_exito = null;
    req.session.mensaje_error = null;
    res.render('usuarios/agregar_usuario', {
        titulo: 'Usuarios',
        mensaje_exito: mensaje_exito,
        mensaje_error: mensaje_error,
        usuario_logeado: funcion.recibirUsuario(req)
    });
};

exports.usuario_agregar = function (req, res) {
    Usuario.countDocuments({nombre: req.body.nombre}, function (err, cantidad){
        if(cantidad > 0) {
            req.session.mensaje_error = 'Ya existe un usuario con ese mismo nombre';
            res.redirect("/administracion/usuarios/agregar");
        } else {
            var usuario = new Usuario(
                {
                    nombre: req.body.nombre,
                    clave: md5(req.body.clave),
                    tipo: req.body.tipo,
                    fecha_registro: funcion.recibirFecha()
                }
            );

            usuario.save(function (err) {
                if (err) {
                    req.session.mensaje_error = 'Ha ocurrido un error registrando el usuario';
                } else {
                    req.session.mensaje_exito = 'El usuario ha sido registrado correctamente';
                }
                res.redirect("/administracion/usuarios");
            });

        }
    });    
};

exports.form_editar_usuario = function (req, res) {
    var mensaje_exito = req.session.mensaje_exito;
    var mensaje_error = req.session.mensaje_error;
    req.session.mensaje_exito = null;
    req.session.mensaje_error = null;
    Usuario.find(function (err, usuarios){
        if (err) return next(err);
        Usuario.findById(req.params.id, function (err,usuario) {
            res.render('usuarios/editar_usuario', {
                titulo: 'Usuarios',
                usuario: usuario,
                mensaje_exito: mensaje_exito,
                mensaje_error: mensaje_error,
                usuario_logeado: funcion.recibirUsuario(req)
            });
        });
    });
};

exports.usuario_editar = function (req, res) {
    Usuario.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, usuario) {
        if (err) {
            req.session.mensaje_error = 'Ha ocurrido un error editando el usuario';
        } else {
            req.session.mensaje_exito = 'El usuario ha sido editado correctamente';
        }
        res.redirect("/administracion/usuarios");
    });
};

exports.form_borrar_usuario = function (req, res) {
    Usuario.findById(req.params.id, function (err, usuario) {
        res.render('usuarios/borrar_usuario', {
            titulo: 'Usuarios',
            usuario: usuario,
            usuario_logeado: funcion.recibirUsuario(req)
        });
    });
};

exports.usuario_borrar = function (req, res) {
    Usuario.findByIdAndRemove(req.params.id, function (err) {
        if (err) { 
            req.session.mensaje_error = 'Ha ocurrido un error borrando el usuario';
        } else {
            req.session.mensaje_exito = 'El usuario ha sido borrado correctamente';
        }
        res.redirect("/administracion/usuarios");
    });
};