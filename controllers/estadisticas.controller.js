const funcion = require('../functions/helper');
const Producto = require('../models/producto.model');
const Proveedor = require('../models/proveedor.model');

const stringifyObject = require('stringify-object');

exports.index = function (req, res) {
    var mensaje_exito = req.session.mensaje_exito;
    var mensaje_error = req.session.mensaje_error;
    req.session.mensaje_exito = null;
    req.session.mensaje_error = null;
    
    var array_textos_grafico1 = [];
    var array_series_grafico1 = [];
    var array_textos_grafico2 = [];
    var array_series_grafico2 = [];

    Producto.find(function (err, productos){

        for (i = 0; i < productos.length; i++) {
            var serie = {};
            serie['name'] = productos[i].nombre;
            serie['y'] = productos[i].precio;
            array_textos_grafico1.push(productos[i].nombre);
            array_series_grafico1.push(serie);
        }

        var cantidad_productos = productos.length;

        var textos_grafico1 = stringifyObject(array_textos_grafico1, {
            indent: '  ',
            singleQuotes: false
        });
        var series_grafico1 = stringifyObject(array_series_grafico1, {
            indent: '  ',
            singleQuotes: false
        });

        db.collection('productos').aggregate([
            {$group : { _id : '$proveedor', count : {$sum : 1}}}
        ]).toArray(function(err, resultados) {

            for (i = 0; i < resultados.length; i++) {
                var serie = {};
                serie['name'] = resultados[i]._id;
                serie['y'] = resultados[i].count;    
                array_textos_grafico2.push(resultados[i]._id);
                array_series_grafico2.push(serie);            
            }

            var textos_grafico2 = stringifyObject(array_textos_grafico2, {
                indent: '  ',
                singleQuotes: false
            });
            var series_grafico2 = stringifyObject(array_series_grafico2, {
                indent: '  ',
                singleQuotes: false
            });

            //console.log(textos_grafico1);
            //console.log(series_grafico1);
            //console.log(textos_grafico2);
            //console.log(series_grafico2);

            res.render('estadisticas/index', {
                titulo: 'Estadísticas',
                usuario_logeado: funcion.recibirUsuario(req),
                productos: productos,
                cantidad_productos: cantidad_productos,
                textos_grafico1: textos_grafico1,
                series_grafico1: series_grafico1,
                textos_grafico2: textos_grafico2,
                series_grafico2: series_grafico2
            });

        });

    });
};