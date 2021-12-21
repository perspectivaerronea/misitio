//
// FUNCIONES
//

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

//
// PROGRAMA PRINCIPAL
//
window.addEventListener('DOMContentLoaded', load);