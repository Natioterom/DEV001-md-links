//Permite conocer la direccion de archivos y carpetas
const path = require('path');
// Me muestra todas las funciones y propiedades que puedo inportar
// console.log(path);
//Método join, une directorios o rutas de carpetas, según sistema OP donde este
//windows, linux, mac, etc.
const filePath =path.join('/public', 'dist', '/style', 'main.js');
// console.log(filePath);
//Método basename, me permite extraer una URL.
console.log(path.basename(filePath));
//Método dirname,devuelve la ruta sin el archivo.
console.log(path.dirname(filePath));
//Método parse, devuelve la infromación pero en formato de objeto.
console.log(path.parse(filePath));
//Método resolve, resuelve la ruta que falta del archivo(transforma en una ruta absoluta).
console.log(path.resolve('dist'));
//Método para tener la extensión de un archivo.
console.log(path.extname(filePath));
