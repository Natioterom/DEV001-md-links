const fs = require('fs');
const path = require('path');

function readMd(filePath){
    fs.readFile(filePath, (error,data)=>{
        if(error){
            console.log(error)
        }
        if(data){
            console.log(data)
        }
    })
    if(path.extname(filePath) === '.md'){
     console.log('Es un archivo md')
    }else {
        console.log('no es un archivo md')
    }    
}
readMd('README.md');