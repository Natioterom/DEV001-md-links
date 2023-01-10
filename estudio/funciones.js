const fs = require ("fs");
const path = require("path");

const existeruta =(ruta) => fs.existsSync(ruta);

const rutaabsoluta =(ruta) => path.isAbsolute(ruta);

const convertirruta =(ruta) => path.resolve(ruta);

const rutadirectorio =(ruta) => fs.statSync(ruta).isDirectory(); //recien me devuele un booleano

const leerdirectorio = (ruta) => fs.readdirSync(ruta);

const leerarchivo = (ruta) => { return new Promise((resolve, reject) => {
    fs.readFile(ruta, "utf-8", function (error, archivo) {
   if(error){
     reject(error)
   }
   resolve(archivo)
 })
})
}

const filtrarmd = (ruta) => path.extname(ruta)

const getLinks = (route) => { return new Promise((resolve, reject) => {
   const links = [];
   leerarchivo(route)
     .then((data) => {
       const regex = /\[(.+?)\]\((https?:\/\/[^\s)]+)\)/g;
       let match = regex.exec(data);
       while (match !== null) {
         links.push({
           href: match[2],
           text: match[1],
           file: route,
         });
         match = regex.exec(data);
       }
       resolve(links);
     })
     .catch((error) => reject(error));
   
 });
}

module.exports = {
   rutadirectorio, 
   convertirruta,
   rutaabsoluta,
   existeruta,
   leerdirectorio,
   filtrarmd,
   getLinks,
}
