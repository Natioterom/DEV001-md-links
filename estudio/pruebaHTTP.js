const http = require('http');
//Crear programa que permita escuchar las peticiones y responderlas.
http.createServer(function ( request , response){
     console.log(request.url)
     if(request.url ==='/'){
        response.write('Hello World');
        return response.end();
     }
    if(request.url === '/about'){
        response.write('acerca de')
        return response.end()
    }
    response.write(`
    <h1> Not Found </h1>
    <p> Insertando HTML desde node.js </p>`);
    response.end(); // Se termina la ejecución.
}).listen(3000) //no poner un número reservado.
// si pongo localhost 3000 va a salir el hello world.Ctrl c termino la ejecución.
// en el response tambien se puede devolver un HTML
//favicon es el icono que sale en la pestaña del navegador.