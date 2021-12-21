//
// FUNCIONES
//
 // function to set a given theme/color-scheme
 function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}

// function to toggle between light and dark theme
function toggleTheme() {
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-light');
    } else {
        setTheme('theme-dark');
    }
}

// abrirAcordEon
// recibe el hashtag que vino en la url sin el "#" para poder buscarlo en el html y sumarle la clase "show" para visualizar el articulo seleccionado en el index.
function abrirAcordeon(elemento) {
    var elemID = document.getElementById(elemento);
    elemID.classList.add("show");
}

// load
// toma el hashtag de la url, luego evalua si tiene valor o no y en base a eso determina que enviar a la función "abrirAcordeon"
function load() {

    if (window.location.hash) {

        var hashtag = window.location.hash;
        var elemento = hashtag.substring(1, hashtag.length);

        abrirAcordeon(elemento);
    } else {
        abrirAcordeon('collapseLast');
    }
}

function cargaTema(){
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-dark');
        document.getElementById('slider').checked = false;
    } else {
        setTheme('theme-light');
      document.getElementById('slider').checked = true;
    }
}

//
// PROGRAMA PRINCIPAL
//
window.addEventListener('DOMContentLoaded', load);
window.addEventListener('DOMContentLoaded', cargaTema);
// window.addEventListener('DOMContentLoaded', cargaTema);