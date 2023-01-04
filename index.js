const chalk= require('chalk');
const { instructions } = require('./instructions.js');
const mdLink = require('./md-links.js');


instructions();
const pathFile = process.argv[2];
const file =mdLink.paths(pathFile) === false ? mdLink.absolute(pathFile) : mdLink.paths(pathFile)
 console.log(chalk.blue(`Archivo :'${pathFile}'`));
 mdLink.isDirectory(file) === false ? mdLink.readFile(file) : mdLink.readDir(file);


