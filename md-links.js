const fs = require('fs');
const path = require('path')
//Comprobar que sea un directorio
const statDirectory =(pathFile) =>fs.statSync(pathFile).isDirectory();
//Comprobar que la ruta sea absoluta
const paths = (pathFile) =>path.isAbsolute(pathFile);
//Pasar la ruta a absoluta si es relativa
const absolute = (pathFile) => path.resolve(pathFile);
// Filtrar archivos Md
const fileMd = (pathFile) => path.extname(pathFile);

// Leer archivo
const readMd = (pathFile) => {
  return new Promise((resolve , reject)=> {
  fs.readFile(pathFile,(error, data)=>{
    if(error){
       reject(error)
    } resolve(data)
    });
  });
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

     
 // Leer Directorios
 const readDir = (pathFile) =>{
// eslint-disable-next-line no-undef
        // Leo directorios []
        const directorio = fs.readdirSync(pathFile);
        // Filtro los archivos que son Marck Down
         const arrayMd =directorio.filter(e => fileMd(e) === '.md');   
           return arrayMd
 };
          
  module.exports = {
  statDirectory,
  fileMd,
    paths,
    absolute,
    readDir,
    getLinks,
    readMd,
};
