const fs = require('fs');

fs.readFile('C:/Users/Memé/Desktop/archivoPrueba.txt', 'utf-8', (error, data) => {    
         if(error) {
        console.log(error);
      } else {
        console.log(data);
      }  
});
  console.log('esto se ejecuta antes que esté el archivo');
  
  //Bloque de leida de archivos sincrono
  let archivo = fs.readFileSync('texto.js', 'utf-8');
  console.log(archivo);
  
  
  console.log('Esto se muestra después de haber leído el achivo2.txt (por el readFileSync)');
  //-------------------------------------- LEER DIRECTORIOS------------------------------------//
const dirSync = fs.readdirSync('./directoriosPrueba');
console.log(dirSync);

const dirAsync = fs.readdir('./directoriosPrueba', (error, data) =>{
  if(error) {
    console.log(error);
  }else {
    console.log(data)
  }
});
console.log('Esto se muestra antes de leer el Directorio por que es async');