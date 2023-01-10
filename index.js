const chalk= require('chalk');
const path = require('path')
const { instructions } = require('./instructions.js');
const mdLink = require('./md-links.js');


instructions();
const pathFile = process.argv[2];
const mdLinks = (pathFile , options) => { return new Promise ((resolve,reject)=>{
    const file =mdLink.paths(pathFile) === false ? mdLink.absolute(pathFile) : mdLink.paths(pathFile)
    console.log(chalk.blue(`Archivo :'${pathFile}'`));
    if(mdLink.statDirectory(file)){
        const arrayMd = mdLink.readDir(file);
        arrayMd.forEach(fileMd => {
        const absoluta = mdLink.absolute(file);
        const archivo = path.join(`${absoluta}/${fileMd}`)
         console.log(archivo)
        mdLink.getLinks(archivo)
        .then((data) => {
                if(data.length != 0){
                console.log(chalk.rgb(204, 153, 255)(`Archivo:'${fileMd}'`))
                console.log(chalk.rgb(255, 102, 153)(`Links:`),data)
        }
        })         
        .catch(()=> {
            reject('Archivo no encontrado')
        })
        })       
    }else {
        mdLink.getLinks(file)
        .then((data)=>{
          console.log(chalk.rgb(255, 102, 153)(`Links:`),data)
    })       
}
});
};
mdLinks(pathFile)





