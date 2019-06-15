const funcion = require('../functions/helper');
const Producto = require('../models/producto.model');
const Proveedor = require('../models/proveedor.model');

exports.listar = function (req, res) {
    var mensaje_exito = req.session.mensaje_exito;
    var mensaje_error = req.session.mensaje_error;
    req.session.mensaje_exito = null;
    req.session.mensaje_error = null;
    Producto.find(function (err, productos){
        if (err) return next(err);
        res.render('productos/listar', {
            titulo: 'Productos',
            productos: productos,
            mensaje_exito: mensaje_exito,
            mensaje_error: mensaje_error,
            usuario_logeado: funcion.recibirUsuario(req)
        });
    });
};

exports.form_agregar_producto = function (req, res) {
    var mensaje_exito = req.session.mensaje_exito;
    var mensaje_error = req.session.mensaje_error;
    req.session.mensaje_exito = null;
    req.session.mensaje_error = null;
    Proveedor.find(function (err, proveedores){
        if (err) return next(err);
        res.render('productos/agregar_producto', {
            titulo: 'Productos',
            proveedores: proveedores,
            mensaje_exito: mensaje_exito,
            mensaje_error: mensaje_error,
            usuario_logeado: funcion.recibirUsuario(req)
        });
    });
};

exports.producto_agregar = function (req, res) {
    Producto.countDocuments({nombre: req.body.nombre}, function (err, cantidad){
        if(cantidad > 0) {
            req.session.mensaje_error = 'Ya existe un producto con ese mismo nombre';
            res.redirect("/administracion/productos/agregar");
        } else {
            var producto = new Producto(
                {
                    nombre: req.body.nombre,
                    descripcion: req.body.descripcion,
                    precio: req.body.precio,
                    proveedor: req.body.proveedor,
                    fecha_registro: funcion.recibirFecha()
                }
            );

            producto.save(function (err) {
                if (err) {
                    req.session.mensaje_error = 'Ha ocurrido un error registrando el producto';
                } else {
                    req.session.mensaje_exito = 'El producto ha sido registrado correctamente';
                }
                res.redirect("/administracion/productos");
            });
        }
    });
};

exports.form_editar_producto = function (req, res) {
    var mensaje_exito = req.session.mensaje_exito;
    var mensaje_error = req.session.mensaje_error;
    req.session.mensaje_exito = null;
    req.session.mensaje_error = null;
    Proveedor.find(function (err, proveedores){
        if (err) return next(err);
        Producto.findById(req.params.id, function (err, producto) {
            res.render('productos/editar_producto', {
                titulo: 'Productos',
                proveedores: proveedores,
                producto: producto,
                mensaje_exito: mensaje_exito,
                mensaje_error: mensaje_error,
                usuario_logeado: funcion.recibirUsuario(req)
            });
        });
    });
};

exports.producto_editar = function (req, res) {
    Producto.countDocuments({ $and: [ { _id: { $ne: req.body.id } }, {nombre: req.body.nombre} ] }, function (err, cantidad){
        if(cantidad > 0) {
            req.session.mensaje_error = 'Ya existe un producto con ese mismo nombre';
            res.redirect("/administracion/productos/"+req.body.id+"/editar");
        } else {
            Producto.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, producto) {
                if (err) {
                    req.session.mensaje_error = 'Ha ocurrido un error editando el producto';
                } else {
                    req.session.mensaje_exito = 'El producto ha sido editado correctamente';
                }
                res.redirect("/administracion/productos");
            });
        }
    });
};

exports.form_borrar_producto = function (req, res) {
    Producto.findById(req.params.id, function (err, producto) {
        res.render('productos/borrar_producto', {
            titulo: 'Productos',
            producto: producto,
            usuario_logeado: funcion.recibirUsuario(req)
        });
    });
};

exports.producto_borrar = function (req, res) {
    Producto.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            req.session.mensaje_error = 'Ha ocurrido un error borrando producto';
        } else {
            req.session.mensaje_exito = 'El producto ha sido borrado correctamente';
        }
        res.redirect("/administracion/productos");
    });
};