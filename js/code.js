//
// FUNCIONES
//

// setTema
// Esta función se usa para asignar el tema que va a usarse.
// Crea un elemento en el navegador llamadao "tema" que va a guardar el tema de la página. Es similar a una cookie.
function setTema(themeName) {
    localStorage.setItem('tema', themeName);
    document.documentElement.className = themeName;
}

// cambiaTema
// Esta función permite intercambiar entre el tema diurno y el nocturno.
function cambiaTema() {
    if (localStorage.getItem('tema') === 'theme-dark') {
        setTema('theme-light');
    } else {
        setTema('theme-dark');
    }
}

// abrirAcordeon
// recibe el hashtag que vino en la url sin el "#" para poder buscarlo en el html y sumarle la clase "show" para visualizar el articulo seleccionado en el index.
function abrirAcordeon(elemento) {

    var elemID = document.getElementById(elemento);
    elemID.classList.add("show");

    //construye el nombre de la cabecera del acordeón para que se vea como cuando se hace el clic. 
    var fullname = elemento;
    var subfix = fullname.split("-").pop();


    var heading = "head-bt-" + subfix;

    var elemID = document.getElementById(heading);
    elemID.classList.remove("collapsed");
}

// cargaArticulo
// toma el hashtag de la url, luego evalua si tiene valor o no y en base a eso determina que enviar a la función "abrirAcordeon"
function cargaArticulo() {

    if (window.location.hash) {

        var hashtag = window.location.hash;
        var elemento = hashtag.substring(1, hashtag.length);

        abrirAcordeon(elemento);
    } else {
        abrirAcordeon('collapse-last');
    }
}

// cargaTema
// esta función revisa que tema está cargado y en base a eso define el estado del slider del tema, más allá de definir el tema para la página.
function cargaTema() {
    if (localStorage.getItem('tema') === 'theme-dark') {
        setTema('theme-dark');
        document.getElementById('slider').checked = false;
    } else {
        setTema('theme-light');
        document.getElementById('slider').checked = true;
    }
}

// cerrarAcordeonAbierto
// Esta funcion cierra todos los items del acordeon.
function cerrarAcordeonAbierto() {

    //Arma una lista con todos los elementos que tenga la clase show
    let x = document.getElementsByClassName("show");
    // Si hay algún elemento con esta clase se la quita.
    if (x.length > 0) {
        x[0].classList.remove("show");
    }
    //Este código obtiene todos los button que son los headers de los acordeones y les agrega la clase collapsed
    var headings = document.querySelectorAll('[id ^= "head-bt-"]');
    // Con el código anterior se obtiene una lista de elementos que cumplen con la condición de que su ID empieza con 'head-bt-'
    // Por cada uno de estos llama a la función 'setColapsar'.
    for (var i = 0; i < headings.length; i++) {
        setColapsar(headings[i].id);
    }
}

// setColapsar
// Esta función le suma la clase 'collapsed' al elemento que se pase como parámetro
function setColapsar(elemento) {
    var elemID = document.getElementById(elemento);
    elemID.classList.add("collapsed");
}

// scrollArticulo
// Esta función permite que la guía de posteos abra el item del acordeon que corresponde y se mueva hacía el mismo 
// para dar dinamismo a la página.
function scrollArticulo(hashtag) {
    var elemento = hashtag.substring(1, hashtag.length);
    cerrarAcordeonAbierto();
    abrirAcordeon(elemento);
}

function updateHashTag() {

    var lista = document.getElementsByClassName("ancla");

    for (let i = 0; i < lista.length; i++) {
        if (isInViewport(lista[i])) {
            alert(lista[i].id);
            // alert(messageText);
        }
    }
}

function isInViewport(element) {

    const rect = element.getBoundingClientRect();

    if (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)) {
        alert(element.id)
    }

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight - document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth - document.documentElement.clientWidth)
    );
}

//
// PROGRAMA PRINCIPAL
//

//Obtiene nombre html
var path = window.location.pathname;
var page = path.split("/").pop();

//Este código previene que se ejecute este código en las páginas donde no es necesario.
if (page == "perspectivas.html" || page == "landingpage.html") {
    window.addEventListener('DOMContentLoaded', cargaArticulo);
}

//Dispara la función para cargar el tema
window.addEventListener('DOMContentLoaded', cargaTema);

if (page == "landingpage.html") {
    window.addEventListener('scroll', updateHashTag);

}
