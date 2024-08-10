class Veterinario {
    constructor(id,nombre, apellido,servicio) {
        this.id=id
        this.nombre = nombre;
        this.apellido = apellido;
        this.servicio=servicio
    }
}

// Actualiza el contador del ID en localStorage
function actualizarContadorId(nuevoValor) {
    localStorage.setItem("contadorVetId", nuevoValor);
}

function getServiciosFromLocalStorage() {
    let serviciosLocal = localStorage.getItem("veterinarios");
    if (serviciosLocal) {
        return JSON.parse(serviciosLocal);
    } else {
        return []; // Si no hay datos, devuelve un array vacío
    }
}

function guardarServiciosEnLocalStorage(servicios) {
    localStorage.setItem("veterinarios", JSON.stringify(servicios));
}

function obtenerContadorId() {
    let contador = localStorage.getItem("contadorVetId");
    if (contador === null) {
        contador = 1; // Inicializa en 1 si es la primera vez
    } else {
        contador = parseInt(contador, 10);
    }
    return contador;
}


function agregarVeterinario(nombre, apellido) {
    let arrayVeterinarios = getVeterinariosFromLocalStorage(); // Recupera la lista de veterinarios
    let veterinario = new Veterinario(nombre, apellido);
    arrayVeterinarios.push(veterinario); // Agrega el nuevo servicio a la lista
    localStorage.setItem("veterinarios", JSON.stringify(arrayVeterinarios)); // Guarda la lista actualizada en localStorage
}


document.getElementById('crearVeterinario').onclick = function() {
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;

    const mensajeContainer = document.getElementById('mensajeContainer');
    mensajeContainer.innerHTML = ''; 

    const mensaje = document.createElement("h3");
    mensaje.className = 'mensaje';
    
    if (nombre && apellido) {
        agregarVeterinario(nombre, apellido);
        mensaje.innerHTML = `Se agregó el Veterinario ${nombre} correctamente`;
        document.getElementById('nombre').value = '';
        document.getElementById('apellido').value = ''; 
    } else {
        mensaje.innerHTML = `Por favor, complete ambos campos.`;
    }

    mensajeContainer.appendChild(mensaje);
};
