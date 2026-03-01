const boton = document.querySelector('#btn-mode'); 
const titulo = document.querySelector('h1'); 

boton.addEventListener('click', () => { 
    if (boton.innerText === 'Encender') { 
        document.body.style.backgroundColor = '#212529'; 
        boton.innerText = 'Apagar'; 
        titulo.innerText = 'Modo Encendido';
        titulo.style.color = 'white'; 
    } else { 
        document.body.style.backgroundColor = 'white'; 
        boton.innerText = 'Encender'; 
        titulo.innerText = 'Modo Apagado'; 
        titulo.style.color = 'black'; 
    } 
});
