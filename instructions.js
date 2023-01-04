const chalk= require('chalk');
const figlet = require('figlet');
const {log} = console;

const instructions = () => {
    log(chalk.rgb(255, 255, 153)(
     figlet.textSync('Md-Links' , { font: 'Ghost',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 90,
    whitespaceBreak: true})

    ))
    
   return instructions
};
 module.exports = {
    instructions,
 }
