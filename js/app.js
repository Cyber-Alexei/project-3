const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];
/////////////////////////////////////////////////////////////
eventListeners();
function eventListeners() {
    formulario.addEventListener('submit', agregarTweet);
    //Cargar el contenido de Local Storage al Array 'Tweets'
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || []; 
        crearHTML();
    });
}
function agregarTweet(e) {
    e.preventDefault();
    
    const textArea = document.querySelector('#tweet').value;
    //Validacion
    if(textArea === "") {
        mostrarError("Una tarea no puede quedar vacia")
        return;
    }
    //Convertir el tweet en objeto y pasarle un id unico
    const tweetObj = {
        id: Date.now(),
        textArea
    }
    //Llevar el objeto tweet al arreglo de tweets
    tweets = [...tweets, tweetObj];
    console.log(tweets);
    //crear el HTML, muetra un listado de los tweets
    crearHTML();
    //Reiniciar el formulario con el metodo .reset()
    formulario.reset();
}
function mostrarError(error) {
    const mensajeDeError = document.createElement('P');
    mensajeDeError.textContent = error;
    mensajeDeError.classList.add('error');
    //Tomar el div donde insertaremos nuetsro parrafo
    const divDelContenido = document.querySelector('#contenido');
    //Agregar nuestro parrafo al div del DOM
    divDelContenido.appendChild(mensajeDeError);
    //Elimina la alerta (parrafo) despues de 3 segundos
    setTimeout(() => {
        mensajeDeError.remove();
    }, 3000)
}
function crearHTML() {
    limpiarHTML();
    if(tweets.length > 0) {
        tweets.forEach((tweetObj) => {
        //Crear el HTML para cada uno
        const li = document.createElement('li');
        li.textContent = tweetObj.textArea;
            //Crear boton de eliminar para cada tweet
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';
            //Agregar la funcion de eliminar tweet al boton
            btnEliminar.onclick = () => {
                borrarTweet(tweetObj.id);
            }
        //Insertar boton en el Li
        li.appendChild(btnEliminar);
        //Insertar Li en el HTML
        listaTweets.appendChild(li);

        });
    }
    //Funcion para guardar los tweets en el storage
    //usando el array tweets
    sincronizarStorage();
}
function limpiarHTML() {
    while(listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild)
    };
}
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}
function borrarTweet(id) {
    tweets = tweets.filter((tweet) => tweet.id !== id);
    crearHTML();
}