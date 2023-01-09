/* eslint-disable no-undef */
const mdLinks = require('../md-links.js');
 const fs = require('fs');
 jest.mock('fs')
 const path = require('path');
const { resolve } = require('path');
 jest.mock('path')

const prueba = 'C:\\Users\\Memé\\Desktop\\Laboratoria\\DEV001-md-links'

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
    path.isAbsolute.mockImplementationOnce(()=>false)   
    expect(mdLinks.paths('test.md')).toBe(false)
});
});

describe('absolute', () => {
  it('debería ser una función', () => {
    expect(typeof mdLinks.absolute).toBe('function');
  });
  it('Completa una ruta relativa a absoluta', () =>{ 
    path.resolve.mockImplementationOnce(()=>`${prueba}\\test.md`)    
    expect(mdLinks.absolute('test.md')).toBe(`${prueba}\\test.md`)
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
  });
 describe ('readFile', () =>{
  it('Debería ser una función', () =>{
    expect(typeof mdLinks.readFile).toBe('function')
  });
  it('Debería llamar a path.extname', () =>{    
    mdLinks.readFile()
    expect(path.extname).toHaveBeenCalled();
});
 });
it('Debería llamar a getLinks', () =>{  
  const extName = path.extname('test.md') === '.md'
  if(extName){
    mdLinks.readFile()     
    expect(mdLinks.getLinks).toHaveBeenCalled()
  }
   });
  
  describe('readDir', () => {
  it('Debería ser una función', () => {
    expect(typeof mdLinks.readDir).toBe('function')
  });
  it('Debería llamar a fs.readdirSync', () =>{  
    const ruta = [ 'test.md', 'texto.md', 'test.txt']
    const directorioTest =[];
    const x = fs.readdirSync(ruta)
  directorioTest.push(x)
    const extName = directorioTest.filter(e => path.extname(e) === '.md')
  if(extName){
    mdLinks.readDir()
    expect(fs.readdirSync).toHaveBeenCalled()
  }
   });
 });
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
  })