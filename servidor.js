const express = require('express');
const fs = require('node:fs');
const app = express();
const PUERTO = 3000;
const rutasDeLibros = require('./rutas/libros.rutas');
const megafono = require('./utilidades/busDeEventos');

const libreta = fs.createWriteStream('./registro_actividad.txt', { flags: 'a'});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Bienvenido a la Biblioteca');
});

app.use('/libros', rutasDeLibros);

megafono.on('libroDonado', (libro) => {
    console.log(`📢 [DIRECTO] ¡Genial! Ha llegado un nuevo libro: ${libro.titulo}`);
    libreta.write(`[NUEVA DONACIÓN] - Título: ${libro.titulo} | Autor: ${libro.autor}\n`);
});

app.use((req, res, next) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

app.use((err, req, res, next) => {
    console.error('🚨 [ERROR INTERNO]:', err.message);
    res.status(500).json({ error: 'Error interno del servidor' });
});    

app.listen(PUERTO, () => {
    console.log(`📚 Servidor de la biblioteca abierto en el puerto ${PUERTO}`);
});
