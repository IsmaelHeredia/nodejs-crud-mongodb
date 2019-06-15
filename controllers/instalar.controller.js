const Producto = require('../models/producto.model');
const Proveedor = require('../models/proveedor.model');
const Usuario = require('../models/usuario.model');

exports.index = function (req, res) {

  /*
  let producto1 = new Producto(
  {
    nombre: 'producto 1',
    descripcion: 'descripcion 1',
    precio: '123',
    proveedor: 'empresa 1',
    fecha_registro: '2019-01-02'
  });

  let producto2 = new Producto(
  {
    nombre: 'producto 2',
    descripcion: 'descripcion 2',
    precio: '123',
    proveedor: 'empresa 2',
    fecha_registro: '2019-01-02'
  });

  let producto3 = new Producto(
  {
    nombre: 'producto 3',
    descripcion: 'descripcion 3',
    precio: '123',
    proveedor: 'empresa 3',
    fecha_registro: '2019-01-02'
  });

  let producto4 = new Producto(
  {
    nombre: 'producto 4',
    descripcion: 'descripcion 4',
    precio: '123',
    proveedor: 'empresa 1',
    fecha_registro: '2019-01-02'
  });

  let producto5 = new Producto(
  {
    nombre: 'producto 5',
    descripcion: 'descripcion 5',
    precio: '123',
    proveedor: 'empresa 2',
    fecha_registro: '2019-01-02'
  });

  producto1.save();
  producto2.save();
  producto3.save();
  producto4.save();
  producto5.save();

  let proveedor1 = new Proveedor(
  {
    nombre: 'empresa 1',
    direccion: 'calle 1',
    telefono: '4975034',
    fecha_registro: '2019-01-02'
  });

  let proveedor2 = new Proveedor(
  {
    nombre: 'empresa 2',
    direccion: 'calle 2',
    telefono: '4646891',
    fecha_registro: '2019-01-02'
  });

  let proveedor3 = new Proveedor(
  {
    nombre: 'empresa 3',
    direccion: 'calle 3',
    telefono: '4646891',
    fecha_registro: '2019-01-02'
  });

  proveedor1.save();
  proveedor2.save();
  proveedor3.save();

  */

  /*
  let usuario1 = new Usuario(
  {
    nombre: 'supervisor',
    clave: '09348c20a019be0318387c08df7a783d',
    tipo: '1',
    fecha_registro: '2019-01-02'
  });

  usuario1.save();
  */

  res.render('administracion/bienvenida', {
    title: 'Administración'
  });
};