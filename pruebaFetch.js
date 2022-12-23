// Se coloca una URL que tiene datos Falsos.
fetch('https://jsonplaceholder.typicode.com/posts')
// Se transforma la respuesta en archivo json.
.then(res => res.json())
//Se muestra la respuesta por consola.
.then(data => console.log(data));

//---------------------------------- Versión Asincrona -----------------------------------//
async function pruebaFetch() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    const data = await res.json()
    console.log(data)
}
pruebaFetch();