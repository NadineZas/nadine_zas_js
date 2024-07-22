
class Veterinario {
    constructor(nombre, apellido) {
        this.nombre = nombre;
        this.apellido = apellido;
    }
}

function getVeterinariosFromLocalStorage() {
    let veterinariosLocal = localStorage.getItem("veterinarios");
    if (veterinariosLocal) {
        return JSON.parse(veterinariosLocal);
    } else {
        return []; // Si no hay datos, devuelve un array vacío
    }
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
