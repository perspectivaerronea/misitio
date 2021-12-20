function abrirAcordion(elemento){
    elemID = document.getElementById(window.location.hash);
alert("hola mundo");

    elemID.classList.add("show");
}

function load() {
    if (window.location.hash) {
        abrirAcordion("collapseLast");
    } else {
        brirAcordion("collapseOne");
    }
}

window.onload = load;