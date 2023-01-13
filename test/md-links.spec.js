/* eslint-disable no-undef */
const mdLinks = require('../md-links.js');
 const fs = require('fs');
 const path = require('path')
 jest.mock('fs')
//  const path = require('path');
//  jest.mock('path')

const prueba = 'C:\\Users\\Memé\\Desktop\\Laboratoria\\DEV001-md-links';
const directorioTest = ['chau.md','hola.txt', 'hola.md', 'chau.txt'];
const archivoTest = ['chau.md', 'hola.md'];

describe('statDirectory', () => {
  it('debería ser una función', () => {
    expect(typeof mdLinks.statDirectory).toBe('function');
  });
  it('Deberia retornar true si es un directorio', () => {
    fs.statSync.mockImplementationOnce(() => ({ isDirectory: () => true }));
    expect(mdLinks.statDirectory('./test')).toBe(true);
  });

});
describe('paths', () => {
  it('debería ser una función', () => {
    expect(typeof mdLinks.paths).toBe('function');
  });
  it('espera que la ruta sea absoluta', () =>{
    expect(mdLinks.paths('test.md')).toBe(false)
});
});
describe('absolute', () => {
  it('debería ser una función', () => {
    expect(typeof mdLinks.absolute).toBe('function');
  });
  it('Completa una ruta relativa a absoluta', () =>{    
    expect(mdLinks.absolute('test.md')).toBe(`${prueba}\\test.md`)
});
});
describe('fileMd', () => {
  it('debería ser una función', () => {
    expect(typeof mdLinks.fileMd).toBe('function');
  });
  it('Método para tener la extensión de un archivo.', () =>{
    expect(mdLinks.fileMd('test.md')).toEqual('.md')
});
});

describe('readMd', () => {
  it('debería er una función', () => {
    expect(typeof mdLinks.readMd).toBe('function');
  });
  it('Debería llamar a fs.readFile', () =>{
    mdLinks.readMd()
    expect(fs.readFile).toHaveBeenCalled()
   });
   it('Debería retornar una promesa', () => {
    expect(mdLinks.readMd()).toBeInstanceOf(Promise)
   })
    it('Debería retornar una promesa resuelta si el path existe', async () => {
    fs.readFile.mockImplementationOnce((path,callback) => callback (null, 'Hola'));
    await expect(mdLinks.readMd('test.md')).resolves.toEqual('Hola');
    });
    it('Deberia retornar una promesa rechaza si el path no existe', async () => {
      fs.readFile.mockImplementationOnce((path,callback) => callback('Error'));
      await expect(mdLinks.readMd('test.md')).rejects.toEqual('Error');
    })
  });
  // ------------------------------Test readFile------------------------------
//   describe ('readFile', () =>{
//   it('Debería ser una función', () =>{
//     expect(typeof mdLinks.readFile).toBe('function')
//   });
//   it('Debería llamar a path.extname', () =>{
//     mdLinks.readFile()
//     expect(path.extname).toHaveBeenCalled();
// });
//  it('Deberia llamar a path.extname', () =>{
//   mdLinks.readFile()
//   expect(path.extname).toHaveBeenCalled()
//  });

// it('Deberia llamar a path.extname', () =>{
//   mdLinks.readFile()
//   expect(path.extname).toHaveBeenCalled()
//  });
//  it('Deberia llamar a getLinks si path.extname devuelve .md', () => {
//   path.extname.mockImplementationOnce(() => '.md')
//   expect(mdLinks.readFile('test.md')).toBe('.md')
// });
// it('Deberia devolder un objecto', () => {
//     expect(mdLinks.getLinks()).then.toBe(typeof Object)
// });
// });
  // ------------------------------Test readDir------------------------------
 describe('readDir', () => {
  it('Debería ser una función', () => {
    expect(typeof mdLinks.readDir).toBe('function')
  });
  it('Deberia llamar a readDir', ()=>{
    mdLinks.readDir()
    expect(mdLinks.readDir).toHaveBeenCalled()
  });
 it('Debería retornar un array', () =>{
   fs.readdirSync.mockImplementationOnce(()=>  directorioTest)  
   const test = directorioTest.map((file)=> {
     const absoluta = path.resolve('directorioTest')
      const archivo = path.join(`${absoluta}\\${file}`)
      return archivo   
  })
    expect(mdLinks.readDir('directorioTest')).toBe(test)
 })
  // it('Deberia filtrar archivos con extname.md', () => {
  //   fs.readdirSync.mockImplementationOnce(()=> directorioTest)
  //   directorioTest.filter(e => mdLinks.fileMd(e) === '.md')
  //    expect(mdLinks.readDir(directorioTest)).toEqual(archivoTest)
  // });
  // it('Devuelve un  array ', () =>{
  //   fs.readdirSync.mockImplementationOnce(()=> directorioTest)
  //   expect(mdLinks.readDir('directorioTest')).toBeInstanceOf(Array)
  //   });
});
  // ------------------------------Test getLinks------------------------------
 describe('getLinks', () => {
  it('debería er una función', () => {
    expect(typeof mdLinks.getLinks).toBe('function');
  });
  it('Debería retornar una promesa', () => {
    expect(mdLinks.getLinks()).toBeInstanceOf(Promise)
   });
   it('Debería llamar a fs.readFile', () =>{
    mdLinks.getLinks()
    expect(fs.readFile).toHaveBeenCalled()
   });
   it('Deberia retornar un array de objetos con los links', async () => {
    const links = [
      {
        href: 'https://nodejs.org/es/',
        text: 'Node.js',
        file: prueba,
      },
    ];
    fs.readFile.mockImplementationOnce((path, callback) => callback(null, '[Node.js](https://nodejs.org/es/)'));
    await expect(mdLinks.getLinks(prueba)).resolves.toEqual(links);
  });

  it('Deberia retornar una promesa rechaza si el path no existe', async () => {
    fs.readFile.mockImplementationOnce((path,callback) => callback('Error'));
    await expect(mdLinks.getLinks(prueba)).rejects.toEqual('Error');
  })
});
  // ------------------------------Test filePath------------------------------
  describe('filePath', () => {
    it('debería er una función', () => {
      expect(typeof mdLinks.filePath).toBe('function');
    });
    it('Devuelve un  array ', () =>{
    fs.readdirSync.mockImplementationOnce(()=> directorioTest)
    expect(mdLinks.filePath()).toBe(Array)
    });
  })