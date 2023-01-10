const chalk= require('chalk');
const { instructions } = require('./instructions.js');
const mdLink = require('./md-links.js');


instructions();
const options = {
    stats : false,
    validate : false,
}
const pathFile = process.argv[2];

if(process.argv[3] === '--validate'){
    options.validate =true
}
mdLink.mdLinks(pathFile , options)
.then((data)=>{

    console.log(chalk.rgb(255, 102, 153)(`Links:`), data)        
      })



