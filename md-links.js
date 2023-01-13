const fs = require('fs');
const { get } = require('https');
const { resolve } = require('path');
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
// Leer Links
const getLinks = (pathFile) => {
  return new Promise((resolve, reject)=>{
    readMd(pathFile)
    .then((file)=>{
      const links = [];
      const regex = /\[(.+?)\]\((https?:\/\/.+?)\)/g;
      let match = regex.exec(file)
      while (match !== null) {
        links.push({
         href:match[2],
        text: match[1],
         file: pathFile,
        });  
        match = regex.exec(file)
        }
        resolve(links)
      })
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


//FUNCION PARA VALIDAR LNK CON PETICIONES HTTP
const validateLinks = (links) => {
  return Promise.all(links.map((arrLinks) => {    
    return fetch(arrLinks.href)
      .then((res) => {
        const arrayStatus = {
          ...arrLinks,
          status: res.status,
          ok: (res.ok === true) ? "ok" : "fail"
        }      
        return arrayStatus;
        
      })
      .catch(() => {
        return {
          ...arrLinks,
          status: "archivo roto",
          ok: "fail"
        }
      })
  })
  )
 };
//  const pathFile = process.argv[2];
//  const file = filePath(pathFile)
//  const prueba = () => {return Promise.all(file.map(e => getLinks(e).then((data)=> {return validateLinks(data)})))}
// prueba().then((res)=>{console.log(res)})
const status = (links)=> { 
    const total = links.length;
    const url = links.map((e)=>e.href)
    const unique = new Set(url).size
    const  status = links.filter((e)=>e.ok !== 'ok')    
    const broken = new Set(status).size
    return  [ total , unique, broken]
} 
const mdLinks = (pathFile ,options) => { return new Promise ((resolve , reject)=> {
  const rutas = filePath(pathFile);
  const promise = () => {return Promise.all(rutas.map(e => getLinks(e).then((data)=> {return validateLinks(data)})))};
 if(options.validate === true && options.stats === true){
  promise().then((res)=>{
    resolve(status(res))
   })
    
  return } 
 if(options.validate === true){
  promise().then((res)=>resolve(res))
   return}
if(options.stats === true){
  promise().then((res)=>{
      resolve(status(res))
     })
        
 return  }
else if (options.validate === false && options.stats === false){
  rutas.forEach((file) =>
   resolve(getLinks(file))
   );        
return }
 else {reject( new Error('Archivo no encontrado'))}
}) 

  }

// const mdLinks = (pathFile ,options) => { return new Promise ((resolve)=> {
//   const rutas = filePath(pathFile);
//   console.log(options)
// switch (options) {
//   case options.validate && options.stats:
//     console.log('uno')
//     rutas.forEach((file) => getLinks(file)
//     .then((data) => {
//        validateLinks(data)
//        .then((res)=>{
//         resolve(status(res))
//        })
//      })
//   );              
//  break;
// case 'validate' :
//   rutas.forEach((file) => getLinks(file)
//      .then((data) => {
//         resolve(validateLinks(data))
//       })
//   );        
//  break;
// case options.stats:
//   rutas.forEach((file) => getLinks(file)
//   .then((data) => {
//      validateLinks(data)
//      .then((res)=>{
//       resolve(status(res))
//      })
//    })
// );        
//  break;
//  case options.validate === false:
//   rutas.forEach((file) =>
//    resolve(getLinks(file))
//    );        
//  break;
//  default:
//   (console.log('Error')) 
//   }
// }
// )}


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
