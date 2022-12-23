 'Hola como estas?'

 const presentacion = (datos) => `Hola me llamo ${datos.name}, tengo ${datos.edad}, actualmente vivo en ${datos.pais}`;
 const datos = {
    name:'Nati',
    edad:'32',
    pais:'Chile',
 };
  console.log(presentacion(datos));