// eslint-disable-next-line no-unused-vars
const dirMarckDown = () => {
 const fs = require('fs');
 const path = require('path');
    
const readDir = (directorio)=>fs.readdirSync(directorio);
// eslint-disable-next-line no-undef
const directorio = process.argv[2];
const arrayArchivos = readDir(directorio);
 const arrayMd = [];
// Filtro los archivos que son Marck Down
arrayArchivos.forEach(archivo => {
    const filePath = path.extname(archivo);
    if (filePath === '.md') {
        arrayMd.push(archivo)
    }
})
// // Completo la ruta de los archivos md filtrados, para poder leerlos
arrayMd.forEach(file => {
    const rutaAbsoluta = path.resolve(directorio)
    const archivo = path.join(`${rutaAbsoluta}/${file}`);
    fs.readFile(archivo, (error, data) => {
        if (error) {
            console.log(error)
        } else {
            let texto = data.toString();
            console.log(texto)
        }
    })
});
return dirMarckDown
 };
