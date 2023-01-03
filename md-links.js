const chalk= require('chalk');
const fs = require('fs');
const path = require('path')
//Comprobar que sea un directorio
const stats =(pathFile) =>fs.statSync(pathFile).isDirectory();
//Comprobar que la ruta sea absoluta
const paths = (pathFile) =>path.isAbsolute(pathFile);
//Pasar la ruta a absoluta si es relativa
const absolute = (pathFile) => path.resolve(pathFile);
//leer archivos 
const readMd = (pathFile) => fs.readFileSync(pathFile, 'utf-8');

// Leer archivo  
const readFile = (pathFile) => {
    const filePath = path.extname(pathFile);
                if (filePath === '.md') {
    return new Promise((resolve, reject)=>{
            fs.readFile(pathFile,(error, data)=>{
            if(error){
            reject (console.log(chalk.blue(`El archivo ${pathFile}, no se encuentra`)));
             }
             resolve(data)             
             console.log(chalk.magenta(data))
         });
    })

}else {
    console.log(chalk.red('No es un archivo md'))
}
};
 
 // ---------------------------------------Leer Directorios-------------------------------//
 const readDir = (pathFile) =>{ 
    // eslint-disable-next-line no-undef
        // Leo directorios
       const directorio = fs.readdirSync(pathFile);
        //Coloco el directorio en un array para poder filtrar los archivos.      
         const arrayArchivos = directorio;
        // Filtro los archivos que son Marck Down
         const arrayMd =arrayArchivos.filter(e => path.extname(e) === '.md');  
    
        // Completo la ruta de los archivos md filtrados, para poder leerlos
            arrayMd.forEach(file => {
                const rutaAbsoluta = path.resolve(pathFile)
                const archivo = path.join(`${rutaAbsoluta}/${file}`);               // Leo los arvhivos md y los muestro por consola.
                readFile(archivo)                             
        })
    };  
  
// Leer Links
const getLinks = (pathFile) => {
    const links = [];
    const regex = /\[(.+?)\]\((https?:\/\/.+?)\)/g;
    const file = readMd(pathFile);
    console.log(file)
    let match = regex.exec(file);
    while (match !== null) {
      links.push({
        href: match[2],
        text: match[1],
        file: pathFile,
      });
      match = regex.exec(file);
    }
  };
  

module.exports = {
    stats,
    paths,
    absolute,
    readDir,
    readFile,
    getLinks,    
}

