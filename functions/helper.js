const Usuario = require('../models/usuario.model');

const { base64encode, base64decode } = require('nodejs-base64');

module.exports = {
	validar_ingreso: function(req, res, next) {
		var respuesta = false;
		var contenido = base64decode(req.session.ingreso);
		var partes = contenido.split("@");
		var nombre = partes[0];
		var clave = partes[1];
		data = {
			nombre : nombre,
			clave : clave
		};
		Usuario.findOne(data, function(err, usuario) {
			if(usuario) {
				next();
			} else {
				res.redirect('/ingreso');
			}
		});
	},
	validar_ingreso_admin: function(req, res, next) {
		var respuesta = false;
		var contenido = base64decode(req.session.ingreso);
		var partes = contenido.split("@");
		var nombre = partes[0];
		var clave = partes[1];
		data = {
			nombre : nombre,
			clave : clave
		};
		Usuario.findOne(data, function(err, usuario) {
			if(usuario) {
				if(usuario.tipo != 1) {
					req.session.mensaje_error = 'Necesitas ser administrador para entrar en esa sección';
					res.redirect('/administracion');
				} else {
					next();
				}
			} else {
				req.session.mensaje_error = 'Necesitas ser administrador para entrar en esa sección';
				res.redirect('/administracion');
			}
		});
	},
	validar_home: function(req, res, next) {
		var respuesta = false;
		var contenido = base64decode(req.session.ingreso);
		var partes = contenido.split("@");
		var nombre = partes[0];
		var clave = partes[1];
		data = {
			nombre : nombre,
			clave : clave
		};
		Usuario.findOne(data, function(err, usuario) {
			if(usuario) {
				res.redirect('/administracion');
			} else {
				next();
			}
		});
	},
	recibirFecha: function() {

	    var date = new Date();

	    var year = date.getFullYear();

	    var month = date.getMonth() + 1;
	    month = (month < 10 ? "0" : "") + month;

	    var day  = date.getDate();
	    day = (day < 10 ? "0" : "") + day;

	    return year + "-" + month + "-" + day;

	},
	recibirUsuario: function(req) {
		var contenido = base64decode(req.session.ingreso);
		var partes = contenido.split("@");
		var usuario = partes[0];
		return usuario;
	},
};