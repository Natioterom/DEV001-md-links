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
 const filePath = (pathFile) => { 
 const file =paths(pathFile) === false ? absolute(pathFile) : paths(pathFile)
 if(statDirectory(file)){
     const arrayMd = readDir(file);
     const route = arrayMd.map(fileMd => {
     const absoluta = absolute(file);
     const archivo = path.join(`${absoluta}/${fileMd}`)
     return archivo
     })
      return route   
 }else {
  return [pathFile]
 }  
};

//FUNCION PARA VALIDAR LNK CON PETICIONES HTTP
const validateLinks = (urls) => {
  return Promise.all(urls.map((arrayLinks) => {
    return fetch(arrayLinks.href)
      .then((resolve) => {
        const objResolve = {
          ...arrayLinks,
          status: resolve.status,
          ok: (resolve.status >= 200) && (resolve.status <= 399) ? "ok" : "fail"
        }
        return objResolve;
      })
      .catch(() => {
        return {
          ...arrayLinks,
          status: "archivo roto",
          ok: "fail"
        }
      })
  })
  )
};

const mdLinks = (pathFile ,options) =>  new Promise ((resolve, reject )=> {
if( options.validate === true){
    const rutas = filePath(pathFile);
    const links = Promise.all(rutas.map((file) => getLinks(file)))
   const validate = links.then((data) => validateLinks(data.flat()));
      resolve(validate);

  }if(options.validate === false){
    const rutas = filePath(pathFile);
    const links = Promise.all(rutas.map((file => getLinks(file))))
   resolve(links)
   
     }else {
      reject( new Error ('El archivo no existe'))
    }
  });
 
  
  module.exports = {
    statDirectory,
    paths,
    absolute,
    fileMd,
    readMd,
    getLinks,
    readDir,
    filePath,
    mdLinks
};
