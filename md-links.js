const chalk= require('chalk');
const fs = require('fs');
const path = require('path')
//Comprobar que sea un directorio
const statDirectory =(pathFile) =>fs.statSync(pathFile).isDirectory();
//Comprobar que la ruta sea absoluta
const paths = (pathFile) =>path.isAbsolute(pathFile);
//Pasar la ruta a absoluta si es relativa
const absolute = (pathFile) => path.resolve(pathFile);

// Leer archivo  
const readMd = (pathFile) => {
  return new Promise((resolve , reject)=> {
  fs.readFile(pathFile,(error, data)=>{
    if(error){
       reject (console.log(error.code))
    } resolve(data) 
    })    
  })

};

// Leer Links
const getLinks = (pathFile) => {
  return new Promise((resolve, reject)=>{
    readMd(pathFile)
    .then((file)=>{
      const links = [];
      const regex = /\[(.+?)\]\((https?:\/\/.+?)\)/g;
      let match = regex.exec(file);
      while (match !== null) {
        links.push({
         href:match[2],
        text: match[1],
         file: pathFile,
        });
          match = regex.exec(file);
          resolve(links)
        }})
        .catch((error)=>{
          reject(error)
        })
        })
      };

      //Leer archivos md
  const readFile = (pathFile) => {     
    const filePath = path.extname(pathFile) === '.md';
      if (filePath ) {
        getLinks(pathFile)
        .then((data)=>{
          console.log(chalk.rgb(255, 102, 153)(`Links:`),data)
        })      
      }else {
       console.log(chalk.red('No es un archivo md'))
     }
  };
    
 // Leer Directorios
 const readDir = (pathFile) =>{ 
// eslint-disable-next-line no-undef
        // Leo directorios []
        const directorio = fs.readdirSync(pathFile);
        // Filtro los archivos que son Marck Down
         const arrayMd =directorio.filter(e => path.extname(e) === '.md');      
        // Completo la ruta de los archivos md filtrados, para poder leerlos
        arrayMd.forEach(file => {
        const rutaAbsoluta = path.resolve(pathFile)
         const archivo = path.join(`${rutaAbsoluta}/${file}`);               
        // Leo los arvhivos md y los muestro por consola.  
           getLinks(archivo)
             .then((data)=>{
              if(data.length != 0){
               console.log(chalk.rgb(204, 153, 255)(`Archivo:'${file}'`))
               console.log(chalk.rgb(255, 102, 153)(`Links:`),data)                  
        }
      })    
                
            });
    
};
  module.exports = {
  statDirectory,
    paths,
    absolute,
    readDir,
    readFile,
    getLinks,
    readMd,   
};
