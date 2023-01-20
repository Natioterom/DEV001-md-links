/* eslint-disable no-undef */

const mdLinks = require('../md-links.js');
const path = require('path')
 const fs = require('fs');
 jest.mock('fs', () => ({
  statSync: jest.fn(() => ({
    isDirectory : jest.fn(() => false)
  })),
  readFile: jest.fn(() =>{}),
  readdirSync: jest.fn(() => {
   return ['chau.md','hola.txt', 'hola.md', 'chau.txt']
    })
  }));



const directorioTest = ['chau.md','hola.txt', 'hola.md', 'chau.txt'];
const linksTest = [{href:'https://developer.mozilla.org/es/',}];


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
describe('normalize', () => {
  it('debería ser una función', () => {
    expect(typeof mdLinks.normalize).toBe('function');
  });
  it('espera que la ruta sea absoluta', () =>{
    expect(mdLinks.normalize('.\\test')).toBe('test')
});
});
describe('absolute', () => {
  it('debería ser una función', () => {
    expect(typeof mdLinks.absolute).toBe('function');
  });
  it('Completa una ruta relativa a absoluta', () =>{
    const absoluta= path.resolve('test.md')
    expect(mdLinks.absolute('test.md')).toBe(absoluta)
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
    it('Debería retornar una promesa resuelta si el path existe',  () => {
    fs.readFile.mockImplementationOnce((path,callback) => callback (null, 'Hola'));
    expect(mdLinks.readMd('test.md')).resolves.toEqual('Hola');
    });
    it('Deberia retornar una promesa rechaza si el path no existe',  () => {
      fs.readFile.mockImplementationOnce((path,callback) => callback('Error'));
      expect(mdLinks.readMd('test.md')).rejects.toEqual('Error');
    })
  });
  // ------------------------------Test readDir------------------------------
 describe('readDir', () => {
  it('Debería ser una función', () => {
    expect(typeof mdLinks.readDir).toBe('function')
  });
  it('Deberia filtrar archivos con extname.md', () => {
    const mdFile =directorioTest.filter(e => mdLinks.fileMd(e) === '.md')
    const arrArchivosMd = mdFile.map(file =>{ 
     const abs = path.resolve('directorioTest')
     const join = path.join(`${abs}/${file}`)
     return join})
    
     expect(mdLinks.readDir('directorioTest')).toEqual(arrArchivosMd)
  });
  it('Devuelve un  array con la ruta completa de los archivos', () =>{
    expect(mdLinks.readDir('directorioTest')).toBeInstanceOf(Array)
    });
  
    it('Deberia llamar a readDir', () =>{
      fs.statSync.mockImplementationOnce(() => ({ isDirectory: () => true }));
      expect(mdLinks.readDir('directorioTest')).toBeInstanceOf(Array)
      });
   });
     
// ------------------------------Test filePath------------------------------
describe('filePath', () => {
  it('debería er una función', () => {
    expect(typeof mdLinks.filePath).toBe('function');
  });
  it('Devuelve un  array con la ruta completa  de los archivos si el path es un directorio ', () =>{
    fs.statSync.mockImplementationOnce(() => ({ isDirectory: () => true }));
     const arrArchivosMd =['chau.md', 'hola.md']
     const rutas = arrArchivosMd.map(file =>{ 
      const abs = path.resolve('arrArchivosMd')
      const join = path.join(`${abs}/${file}`)
      return join})
       expect(mdLinks.filePath('arrArchivosMd')).toEqual(rutas)
    });  
  it('Devuelve un  array', () =>{    
    expect(mdLinks.filePath('archivoTest')).toBeInstanceOf(Array)
    });
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
   it('Deberia retornar un array de objetos con los links', () => {
    const links = [
      {
        href: 'https://nodejs.org/es/',
        text: 'Node.js',
        file: 'test',
      },
    ];
    fs.readFile.mockImplementationOnce((path, callback) => callback(null, '[Node.js](https://nodejs.org/es/)'));
     expect(mdLinks.getLinks('test')).resolves.toEqual(links);
  });

  it('Deberia retornar una promesa rechaza si el path no existe', () => {
    fs.readFile.mockImplementationOnce((path,callback) => callback('Error'));
     expect(mdLinks.getLinks('test')).rejects.toEqual('Error');
  })
});
 // ------------------------------Validate------------------------------
 describe('validateLinks', () => {
  beforeEach(() => {
    global.fetch = (url) => new Promise ((resolve,reject)=> {
      if(url === 'https://developer.mozilla.org/es/'){
      resolve({status:200,
      ok:true})
      }
      if(url === 'https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Functions'){
        resolve({status:404,
          ok:false})
    }
      if(url === 'https://developer.mozilla.es/404'){
        reject({status:'archivo roto',
          ok:false})
    }
    })
});
  it('debería er una función', () => {
    expect(typeof mdLinks.validateLinks).toBe('function');
  });
  it('Debería retornar una promesa resulta ', () =>{
   expect(mdLinks.validateLinks(linksTest)).toBeInstanceOf(Promise)
  }); 
  it('Debería retornar un arreglo con con status 200 ', () =>{
    const statsTest = [{
    href:'https://developer.mozilla.org/es/',
         status:200,        
          ok:'ok'}];
      mdLinks.validateLinks(linksTest).then((res)=>expect(res).toEqual(statsTest))
       }); 
       it('Debería retornar un arreglo con con status 404 ', () =>{
        const enlace = [{"href":'https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Functions'}]
        const statsTest = [{ "href":'https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Functions',
             status:404,        
              ok:'fail'}];
          mdLinks.validateLinks(enlace).then((res)=>expect(res).toEqual(statsTest))
           }); 
  it('Deberia retornar un arreglo con status archivo roto',  () => {
    const enlaceRoto = [{"href": "https://developer.mozilla.es/404"}]
    const statsTest = [{"href": "https://developer.mozilla.es/404", 
    ok: "fail", status: "archivo roto"}]
   mdLinks.validateLinks(enlaceRoto).catch((res)=>expect(res).toEqual(statsTest));
      });      
   }); 


  // ------------------------------Test status------------------------------
  describe('status', () => {
    it('debería er una función', () => {
      expect(typeof mdLinks.status).toBe('function');
    });
    it('Devuelve un  array ', () =>{
     expect(mdLinks.status(linksTest)).toBeInstanceOf(Array)
    });
  });
  // ------------------------------mdLinks------------------------------
  describe('mdLinks', () => {
    it('debería er una función', () => {
      expect(typeof mdLinks.mdLinks).toBe('function');
    });
    it('Debería retornar una promesa resulta ', () =>{
      expect(mdLinks.mdLinks('./test.md' ,{validate: false})).toBeInstanceOf(Promise)
     });
    //  it('Debería retornar una array con status de los links ', () =>{
    //   const arr =  [{Total: '10',
    //     Unique:'3'}]
  
    
    //   mdLinks.mdLinks('./README.md' ,{ stats: true}).then((res)=>expect(res).toEqual(arr))
    // })
     });

 