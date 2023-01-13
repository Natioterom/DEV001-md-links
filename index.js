const chalk= require('chalk');
const { instructions } = require('./instructions.js');
const mdLink = require('./md-links.js');


instructions();
const options = {
    stats : false,
    validate : false,
}
const pathFile = process.argv[2];
process.argv.forEach(e =>{
  if( e == "--stats" ){
    options.stats = true
  }
 if(e == "--validate" ){
   options.validate = true
 }
 })

mdLink.mdLinks(pathFile , options)
.then((res =>{
  if (options.stats && options.validate) {
    console.log(
    `${chalk.rgb(0, 128, 128).bold('Total:' + res[0])}
${chalk.rgb(168, 187, 77, 1).bold('Unique:' + res[1])}
${chalk.rgb(255, 102, 153).bold('Broken:' + res[2])}`  
    )
return }    
if (options.validate) {
        if (res.length === 0) {
         console.log(chalk.red("No se encontraron links"));
        }
        
          if(res.length !== 0){
        const prueba = res.filter(e => e.length > 0).flat()
        
        let validateLinks = prueba.map(e => `${chalk.rgb(0, 128, 128)('File:' + e.file)}
        ${chalk.rgb(168, 187, 77, 1)('Href:' + e.href)}
        ${chalk.rgb(255, 182, 193, 1)('Text:'  + e.text)}
        ${chalk.rgb(248, 110, 135, 1)('Status:' + e.status)}
        ${chalk.rgb(255, 102, 153)('ok:' + e.ok)}`
        );
  
        console.log(validateLinks.join('\n'));
          }
     return }if (options.stats) {
        console.log(
        `${chalk.rgb(0, 128, 128).bold('Total:' + res[0])}
${chalk.rgb(168, 187, 77, 1).bold('Unique:' + res[1])}` 
        );
      return }
  else{
        let links = res.map(e => `${chalk.rgb(0, 128, 128)('File:' + e.file)}
        ${chalk.rgb(168, 187, 77, 1)('Href:' + e.href)}
        ${chalk.rgb(255, 182, 193, 1)('Text:'  + e.text.substr(0, 40))}`
        );
        console.log(links.join('\n'));

      return}
    }))



