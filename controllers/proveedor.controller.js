const funcion = require('../functions/helper');
const Proveedor = require('../models/proveedor.model');

exports.listar = function (req, res) {
    var mensaje_exito = req.session.mensaje_exito;
    var mensaje_error = req.session.mensaje_error;
    req.session.mensaje_exito = null;
    req.session.mensaje_error = null;
    Proveedor.find(function (err, proveedores){
        if (err) return next(err);
        res.render('proveedores/listar', {
            titulo: 'Proveedores',
            proveedores: proveedores,
            mensaje_exito: mensaje_exito,
            mensaje_error: mensaje_error,
            usuario_logeado: funcion.recibirUsuario(req)
        });
    });
};

exports.form_agregar_proveedor = function (req, res) {
    var mensaje_exito = req.session.mensaje_exito;
    var mensaje_error = req.session.mensaje_error;
    req.session.mensaje_exito = null;
    req.session.mensaje_error = null;
    res.render('proveedores/agregar_proveedor', {
        titulo: 'Proveedores',
        mensaje_exito: mensaje_exito,
        mensaje_error: mensaje_error,
        usuario_logeado: funcion.recibirUsuario(req)
    });
};

exports.proveedor_agregar = function (req, res) {
    Proveedor.countDocuments({nombre: req.body.nombre}, function (err, cantidad){
        if(cantidad > 0) {
            req.session.mensaje_error = 'Ya existe un proveedor con ese mismo nombre';
            res.redirect("/administracion/proveedores/agregar");
        } else {
            var proveedor = new Proveedor(
                {
                    nombre: req.body.nombre,
                    direccion: req.body.direccion,
                    telefono: req.body.telefono,
                    fecha_registro: funcion.recibirFecha()
                }
            );

            proveedor.save(function (err) {
                if (err) {
                    req.session.mensaje_error = 'Ha ocurrido un error registrando al proveedor';
                } else {
                    req.session.mensaje_exito = 'El proveedor ha sido registrado correctamente';
                }
                res.redirect("/administracion/proveedores");
            });
        }
    });
};

exports.form_editar_proveedor = function (req, res) {
    var mensaje_exito = req.session.mensaje_exito;
    var mensaje_error = req.session.mensaje_error;
    req.session.mensaje_exito = null;
    req.session.mensaje_error = null;
    Proveedor.findById(req.params.id, function (err, proveedor) {
        res.render('proveedores/editar_proveedor', {
            titulo: 'Proveedores',
            proveedor: proveedor,
            mensaje_exito: mensaje_exito,
            mensaje_error: mensaje_error,
            usuario_logeado: funcion.recibirUsuario(req)
        });
    });
};

exports.proveedor_editar = function (req, res) {
    Proveedor.countDocuments({ $and: [ { _id: { $ne: req.body.id } }, {nombre: req.body.nombre} ] }, function (err, cantidad){
        if(cantidad > 0) {
            req.session.mensaje_error = 'Ya existe un proveedor con ese mismo nombre';
            res.redirect("/administracion/proveedores/"+req.body.id+"/editar");
        } else {
            Proveedor.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, proveedor) {
                if (err) {
                    req.session.mensaje_error = 'Ha ocurrido un error editando al proveedor';
                } else {
                    req.session.mensaje_exito = 'El proveedor ha sido editado correctamente';
                }
                res.redirect("/administracion/proveedores");
            });
        }
    });
};

exports.form_borrar_proveedor = function (req, res) {
    Proveedor.findById(req.params.id, function (err, proveedor) {
        res.render('proveedores/borrar_proveedor', {
            titulo: 'Proveedores',
            proveedor: proveedor,
            usuario_logeado: funcion.recibirUsuario(req)
        });
    });
};

exports.proveedor_borrar = function (req, res) {
    Proveedor.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            req.session.mensaje_error = 'Ha ocurrido un error borrando al proveedor';
        } else {
            req.session.mensaje_exito = 'El producto ha sido borrado correctamente';
        }
        res.redirect("/administracion/proveedores");
    });
};