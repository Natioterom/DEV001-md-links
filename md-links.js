const fs = require('fs');
const path = require('path')

//Comprobar que sea un directorio
const statDirectory =(pathFile) =>fs.statSync(pathFile).isDirectory();
//Comprobar que la ruta sea absoluta
const paths = (pathFile) =>path.isAbsolute(pathFile);
//Pasar la ruta a absoluta si es relativa
const absolute = (pathFile) => path.resolve(pathFile);
//Normalizar la ruta
const normalize = (pathFile) => path.normalize(pathFile)
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
// Leer Directorios
const readDir = (pathFile) =>{
  // eslint-disable-next-line no-undef
          // Leo directorios []
          let files =[];
          let filesDirectory = fs.readdirSync(pathFile); 
          let filesRoutes = filesDirectory.map(fileMd => {
            const absoluta = absolute(pathFile);
            const archivo = path.join(`${absoluta}/${fileMd}`)
            return archivo
            })
            filesRoutes.forEach(file => {
              if(statDirectory(file)){
                files.push(readDir(file))
              }else{ 
                files.push(file)}
            })        
          // Filtro los archivos que son Marck Down
           const arrayMd =files.flat().filter(file => fileMd(file) === '.md'); 
             return arrayMd
   };
  
const filePath = (pathFile) => { 
  const ruta =paths(pathFile) === false ? absolute(pathFile) : paths(pathFile)
  const file = normalize(ruta);
  if(statDirectory(file)){
      let arrayMd = readDir(file);
      const route = arrayMd.map(fileMd => {
     if(paths(fileMd)){     
      return fileMd 
     }
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
    
     
 //Validar links con fetch y peticiones http
const validateLinks = (links) => {
  return Promise.all(links.map((arrLinks) => {    
    return fetch(arrLinks.href)
      .then((res) => {
        const arrayStatus = {
          ...arrLinks,
          status: res.status,
          ok: res.ok? "ok" : "fail"
        }      
        return arrayStatus;
        
      })
      .catch(() => {
        return {
          ...arrLinks,
          status:'no found',
          ok: "fail"
        }
      })
  })
  )
 }

const status = (link)=> { 
   const links = link.flat();
    const total = links.length;

    const url = links.map((e)=>e.href)
    const unique = new Set(url).size
    const  status = links.filter((e)=>e.ok !== 'ok')    
    const broken = new Set(status).size
    return  [ total , unique, broken]
} 

const mdLinks = (pathFile ,options) => { return new Promise ((resolve)=> {
  const rutas = filePath(pathFile);
  const links = () =>{ return Promise.all(rutas.map(e =>{return getLinks(e)}))}
  const promise = () => {return Promise.all(rutas.map(e => getLinks(e).then((data)=> {return validateLinks(data)})))};
switch (true) {
  case options.validate && options.stats:
    promise().then((res)=>{
    resolve(status(res))
   })             
 break;
case options.validate :
   promise().then((res)=>resolve(res))    
 break;
case options.stats:
  promise().then((res)=>{
       resolve(status(res))
  })      
 break;
 case options.validate === false && options.stats === false:
  links().then((data)=> {
    resolve(data)
  })   
 break;
 default:
  (console.log('Error')) 
  }
}
)}
console.log(normalize('.\\test'))

  module.exports = {
    normalize,
    statDirectory,
    paths,
    absolute,
    fileMd,
    readMd,
    getLinks,
    readDir,
    filePath,
    validateLinks,
    status,
    mdLinks
};
