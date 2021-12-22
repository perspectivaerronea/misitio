//
// FUNCIONES
//
// function to set a given theme/color-scheme
function setTema(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}

// function to toggle between light and dark theme
function cambiaTema() {
    if (localStorage.getItem('theme') === 'theme-dark') {
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

// carga
// toma el hashtag de la url, luego evalua si tiene valor o no y en base a eso determina que enviar a la función "abrirAcordeon"
function carga() {

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
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTema('theme-dark');
        document.getElementById('slider').checked = false;
    } else {
        setTema('theme-light');
        document.getElementById('slider').checked = true;
    }
}

//
// PROGRAMA PRINCIPAL
//

//Obtiene nombre html
var path = window.location.pathname;
var page = path.split("/").pop();


if (page == "perspectivas.html") {
    window.addEventListener('DOMContentLoaded', carga);
}

window.addEventListener('DOMContentLoaded', cargaTema);