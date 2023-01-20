#!/usr/bin/env node

const chalk= require('chalk');
const { instructions } = require('./instructions.js');
const mdLink = require('./md-links.js');


instructions();
const options = {
    stats : false,
    validate : false,
}
const pathFile = process.argv[2];
process.argv.forEach(argument =>{
  if( argument === '--stats' ||  argument ==='--s'){
    options.stats = true
  }
 if(argument === '--validate' ||  argument === '--v' ){
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
        const prueba = res.filter(link => link.length > 0).flat()
        
        let validateLinks = prueba.map(link => `${chalk.rgb(0, 128, 128)('File:' + link.file)}
        ${chalk.rgb(168, 187, 77, 1)('href:'+ ' ' + link.href.slice(0,80))}
        ${chalk.rgb(255, 182, 193, 1)('Text:' + ' ' + link.text)}
        ${chalk.rgb(248, 110, 135, 1)('Status:'+ ' ' + link.status)}
        ${chalk.rgb(255, 102, 153)('ok:' + link.ok)}`
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
    const prueba = res.filter(link => link.length > 0).flat()
        let links = prueba.map(link => `${chalk.rgb(0, 128, 128)('File:' + ' '  + link.file)}
        ${chalk.rgb(168, 187, 77, 1)('href:' + ' ' + link.href.slice(0,80))}
        ${chalk.rgb(255, 182, 193, 1)('Text:'+' ' + link.text.substr(0, 40))}`
        );
        console.log(links.join('\n'));

      return}
    }))



