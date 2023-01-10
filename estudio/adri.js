const path = require("path");
const {
  convertirruta,
  rutaabsoluta,
  existeruta, 
  rutadirectorio,
  leerdirectorio,
  filtrarmd,
  getLinks,
} = require('./funciones.js')

const paths  = process.argv[2];
const mdLinks = (paths, Option) => {
  return new Promise((resolve, reject)=> {
    let arregloresult = [];
    const directorio = rutadirectorio(paths);
    console.log(directorio)
    if(directorio) {  //en caso de ser directorio se busca un archivo dentro
    const arreglodirectorio = leerdirectorio (paths); //lee el contenido de un directorio
    arregloresult = arreglodirectorio.filter(e => filtrarmd(e) === '.md')
    arregloresult.forEach(File => {
    const resolverabsoluta = path.resolve(paths) 
    const rutafile = path.join(`${resolverabsoluta}/${File}`
    ) 
 getLinks(rutafile)
.then((data)=> {
  resolve(data)
})
  })
  

  }
 else{
    getLinks(paths)
    .then((data)=> {
      resolve(data)
    })
 }
 return arregloresult;
 })
  }
  mdLinks(paths) 
  .then(resp =>{
    console.log(resp)
  })
