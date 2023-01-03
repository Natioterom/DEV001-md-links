const fs = require('fs');
const path = require('path');
const mdLink = require('./md-links.js');

const pathFile = process.argv[2];
 const file =mdLink.paths(pathFile) === false ? mdLink.absolute(pathFile) : mdLink.paths(pathFile)
console.log(mdLink.stats(file) === false ? mdLink.readFile(file) : mdLink.readDir(file))
console.log(mdLink.readDir(mdLink.getLinks(file)))
