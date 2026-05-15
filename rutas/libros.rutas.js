// rutas/libros.rutas.js
const express = require('express');
const router = express.Router();

const librosControlador = require('../controladores/libros.controlador');

router.get('/', librosControlador.obtenerCatalogo); 
router.get('/:id', librosControlador.obtenerLibroPorId);

router.post('/', librosControlador.crearLibro);

module.exports = router;