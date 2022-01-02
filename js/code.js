//
// FUNCIONES
//

//
// FUNCIONES ASOCIADAS AL TEMA DEL SITIO
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

//
// FUNCIONES ASOCIADAS AL COMPORTAMIENTO DEL SITIO / ARMADO DE LINKS 
//

//setHashtag
//Esta función se ocupa de armar el link de destino para los posteos dentro de la sección "Perspectivas"
function setHashtag(hashtag, origen) {
    var destino = "";
    var pagina = "";
    if (origen == "l") {
        destino = "./perspectivas.html#" + hashtag;
        pagina = "clasico";
    } else {
        destino = "./landingpage.html#" + hashtag;
        pagina = "onepage";
    }
    document.getElementById(pagina).setAttribute('href', destino);
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

    var hashtag = 'collapse-last';

    if (window.location.hash) {
        hashtag = window.location.hash;
        hashtag = hashtag.substring(1, hashtag.length);
        abrirAcordeon(hashtag);
    } else {
        abrirAcordeon('collapse-last');
    }

    if (page == "perspectivas.html") {
        setHashtag(hashtag, 'c');
    } else {
        setHashtag(hashtag, 'l');
    }

}

// setColapsar
// Esta función le suma la clase 'collapsed' al elemento que se pase como parámetro
function setColapsar(elemento) {
    var elemID = document.getElementById(elemento);
    elemID.classList.add("collapsed");
}

// cerrarAcordeonAbierto
// Esta funcion cierra todos los items del acordeon.
function cerrarAcordeonAbierto() {

    //Arma una lista con todos los elementos que tenga la clase show
    let x = document.getElementsByClassName("show");
    // Si hay algún elemento con esta clase se la quita.
    if (x.length > 0 && x.id != "") {
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


// scrollArticulo
// Esta función permite que la guía de posteos abra el item del acordeon que corresponde y se mueva hacía el mismo 
// para dar dinamismo a la página.
function scrollArticulo(hashtag) {
    var elemento = hashtag.substring(1, hashtag.length);
    var destino = "./landingpage.html" + hashtag;

    cerrarAcordeonAbierto();
    abrirAcordeon(elemento);
    document.getElementById('onepage').setAttribute('href', destino);
}

// enVista
// Esta función evalua si el elemento que se pasa como parámetro está dentro de la visual del usuario
function enVista(element) {

    const rect = element.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) &&
        rect.bottom != 0 &&
        rect.right != 0
    );
}


// armaURLDestino
// Esta función se ocupa de armar la url que se ocupa de hacer el cambio al modo clásico
// y que lleve al usuario a la página correspondiente, dependiendo donde esté parado en la landing page.
function armaURLDestino(hashtag, origen) {
    var destino = " ";

    switch (hashtag) {
        case "N1":
        case "#":
        case "top":
        case "novedad":
            if (origen == 'l') {
                destino = "../index.html";
            } else {
                destino = "./pages/landingpage.html";
            }
            break;
        case "N2":
        case "preview":
            if (origen == 'l') {
                destino = "../index.html#preview";
            } else {
                destino = "./pages/landingpage.html#preview";
            }
            break;
        case "N3":
        case "galeria":
            if (origen == 'l') {
                destino = "../index.html#galeria";
            } else {
                destino = "./pages/landingpage.html#galeria";
            }
            break;
        case "N4":
        case "podcast":
            if (origen == 'l') {
                destino = "../index.html#podcast";
            } else {
                destino = "./pages/landingpage.html#podcast";
            }
            break;
        case "N5":
        case "perspectivas":
            // Obtengo la lista de elementos que tienen la clase 'show' que esten contenido bajo el elemento con el id = 'perspectivas'
            var articulo = document.getElementById('perspectivas').getElementsByClassName("show");
            if (articulo.length > 0) {
                destino = "./perspectivas.html#" + articulo[0].id;
            } else {
                destino = "./perspectivas.html#collapse-last";
            }
            break;
        case "N6":
        case "quien":
            destino = "./quien.html";
            break;
        case "N7":
        case "contacto-lp":
            destino = "./contacto.html";
            break;
        default:
            if (hashtag == " ") {
                if (origen == 'l') {
                    destino = "../index.html";
                } else {
                    destino = "./pages/landingpage.html";
                }
            }
            break;
    }
    if (destino != " ") {
        if (origen == 'l') {
            document.getElementById('clasico').setAttribute('href', destino);
        } else {
            document.getElementById('onepage').setAttribute('href', destino);
        }
    }
}

// posicionScroll
// esta función toma todos los elementos que tengan la clase "ancla" y luego recorre la lista
// para armar la url del cambio de estilo de la web y dirija al usuario a la página correspondiente. 
function posicionScroll() {
    var hashtag = "";
    var lista = document.getElementsByClassName("ancla");
    var encontrado = false;

    for (let i = 0; i < lista.length; i++) {
        if (!(encontrado)) {
            if (enVista(lista[i])) {
                if (page == "landingpage.html") {
                    armaURLDestino(lista[i].id, 'l');
                }
                else {
                    armaURLDestino(lista[i].id, 'c');
                }
                encontrado = true;
            }
        }
    }

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
if (page == "landingpage.html" || page == "index.html") {
    window.addEventListener('scroll', posicionScroll);
}
