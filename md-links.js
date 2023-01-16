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
// Leer Directorios
const readDir = (pathFile) =>{
  console.log(pathFile)
  // eslint-disable-next-line no-undef
          // Leo directorios []
          let files =[];
          let directorio = fs.readdirSync(pathFile); 
          console.log(directorio)  
          let route = directorio.map(fileMd => {
            const absoluta = absolute(pathFile);
            const archivo = path.join(`${absoluta}/${fileMd}`)
            return archivo
            })
            route.forEach(e => {
              if(statDirectory(e)){
                files.push(readDir(e))
              }else{ 
                files.push(e)}
            })        
          // Filtro los archivos que son Marck Down
           const arrayMd =files.flat().filter(e => fileMd(e) === '.md'); 
             return arrayMd
   };
  
const filePath = (pathFile) => { 
  const file =paths(pathFile) === false ? absolute(pathFile) : paths(pathFile)
  if(statDirectory(file)){
      let arrayMd = readDir(file);
      const route = arrayMd.map(fileMd => {
     if(paths(fileMd)){      
      return fileMd 
     }else{
      const absoluta = absolute(fileMd);
       const archivo = path.join(`${absoluta}/${fileMd}`)
       console.log()
      return archivo
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
 }
const status = (links)=> { 
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


  module.exports = {
    statDirectory,
    paths,
    absolute,
    fileMd,
    readMd,
    getLinks,
    readDir,
    filePath,
    status,
    mdLinks
};
