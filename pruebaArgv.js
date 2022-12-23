console.log(process.argv);

// en consola escribo node pruebaArgv --nombre = 'Natalia Otero' y genero un argumento

//Desestructuro process.argv
const [,,argumento] = process.argv;
console.log(argumento);

//Desestructuro Argumento
const[,nombre]=argumento.split('=');
console.log(`Hola me llamo ${nombre}`);
// Para acceder a todos los argumenos y mostrarlos en consola.
 for (let i= 2; i < process.argv.length; i++){
    console.log(process.argv[i]);
 }