// controladores/libros.controlador.js

const megafono = require('../utilidades/busDeEventos');

    // Simulo una pequeña base de datos en memoria
    const baseDeDatosLibros = [
        { id: 1, titulo: 'Don Quijote de la Mancha', autor: 'Miguel de Cervantes', disponible: true },
        { id: 2, titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez', disponible: false } 
    ];

    const obtenerCatalogo = (req, res) => {
    res.json(baseDeDatosLibros);
    };    

    const obtenerLibroPorId = (req, res) => {
        // 1. Extraigo el Id de la URL y lo convierto a número 
        const idBuscado = parseInt(req.params.id);

        // Uso el método .find() de los arrays de JavaScript para buscar en 'baseDeDatosLibros'
        const libro = baseDeDatosLibros.find(libro => libro.id === idBuscado);

        // Creo un bloque if/else.
        if (libro) {
            res.json(libro);
        } else {
            res.status(404).json({ error: 'Libro no encontrado' });
        };
    };

    const crearLibro = (req, res) => {
        const nuevoLibro = req.body;

        // Creo una condición if para comprobar si falta el título o falta el autor.
        if (!nuevoLibro.titulo || !nuevoLibro.autor) {
            return res.status(400).json({ error: 'El título y el autor son obligatorios'});
        };
        
        // Le asigno un ID 
        nuevoLibro.id = baseDeDatosLibros.length + 1;

        // Uso el método .push
        baseDeDatosLibros.push(nuevoLibro);

        megafono.emit('libroDonado', nuevoLibro);
        res.status(201).json(nuevoLibro);
    };

  
  module.exports = { obtenerCatalogo, obtenerLibroPorId, crearLibro };