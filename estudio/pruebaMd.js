const fs = require('fs');
const path = require('path');
// Archivos Marck Down, vienen con buffer, hay que pasarlos a String para poder leerlos.
//-------------------------Filtrar archivos md por la extension del Path --------------------------//
// function readMd(filePath){
//     fs.readFile(filePath, (error,data)=>{
//         if(error){
//             console.log(error)
//         }
//         if(data){
//             console.log(data)
//         }
//         })
//     if(path.extname(filePath) === '.md'){
//      console.log('Es un archivo md')
//     }else {
//         console.log('no es un archivo md')
//     }    
// }
// readMd('README.md');

//--------------------- Leo directorio que tiene archivos js y md--------------------------------//
const prueba = fs.readdirSync('./directoriosPrueba');
const arrMd = [];
// Filtro los archivos que son Marck Down
prueba.forEach(archivo => {
    const filePath = path.extname(archivo);
    if (filePath === '.md') {
        arrMd.push(archivo)
    }
})
// Completo la ruta de los archivos md filtrados, para poder leerlos
arrMd.forEach(file => {
    const archivo = path.join(`./directoriosPrueba/${file}`);
    fs.readFile(archivo, (error, data) => {
        if (error) {
            console.log(error)
        } else {
            let texto = data.toString();
            console.log(texto)
        }
    })
});


// console.log(prueba2);
// fs.readFile('README.md', (error, data) => {
//     if (error) {
//         console.log(error)
//     } else {
//         let texto = data.toString()
//         console.log(texto)
//     }
// })