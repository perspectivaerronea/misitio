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

// enVista
// Esta función evalua si el elemento que se pasa como parámetro está dentro de la visual del usuario
function enVista(element) {

    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (document.documentElement.clientHeight) &&
        rect.right <= (document.documentElement.clientWidth)
    );
}

// posicionScroll
// esta función toma todos los elementos que tengan la clase "ancla" y luego recorre la lista
// para armar la url del cambio de estilo de la web y dirija al usuario a la página correspondiente. 
function posicionScroll() {
    var hashtag = "";
    var lista = document.getElementsByClassName("ancla");

    for (let i = 0; i < lista.length; i++) {
        if (enVista(lista[i])) {
            armaURLDestino(lista[i].id);
        }
    }
}

// armaURLDestino
// Esta función se ocupa de armar la url que se ocupa de hacer el cambio al modo clásico
// y que lleve al usuario a la página correspondiente, dependiendo donde esté parado en la landing page.
function armaURLDestino(hashtag) {
    var destino = "";
    // alert(hashtag);
    // window.location.hash = hashtag;
    switch (hashtag) {
        case "N1":
        case "#":
        case "top":
            destino = "../index.html";
            break;
        case "N2":
        case "preview":
            destino = "../index.html#perspectivas";
            break;
        case "N3":
        case "galeria":
            destino = "../index.html#galeria";
            break;
        case "N4":
        case "podcast":
            destino = "../index.html#podcast";
            break;
        case "N5":
        case "perspectivas":
            destino = "./perspectivas.html#collapse-last";
            break;
        case "N6":
        case "queEsPerspectivaErronea":
            destino = "./queEsPerspectivaErronea.html";
            break;
        case "N7":
        case "contacto-lp":
            destino = "./contacto.html";
            break;
        default:
            destino = "../index.html";
            break;
    }
    document.getElementById('clasico').setAttribute('href', destino);
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

//Evalua la posición del scroll para determinar en que sección se está parado.
if (page == "landingpage.html") {
    window.addEventListener('scroll', posicionScroll);
}
