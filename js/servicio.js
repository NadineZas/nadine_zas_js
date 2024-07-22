class Servicio{
    constructor (nombre,precio){
        this.nombre=nombre
        this.precio=precio
    }
}


function getServiciosFromLocalStorage() {
    let serviciosLocal = localStorage.getItem("servicios");
    if (serviciosLocal) {
        return JSON.parse(serviciosLocal);
    } else {
        return []; // Si no hay datos, devuelve un array vacío
    }
}


function agregarServicio(nombre, precio) {
    let servicios = getServiciosFromLocalStorage(); // Recupera la lista de servicios
    let servicio = new Servicio(nombre, precio);
    servicios.push(servicio); // Agrega el nuevo servicio a la lista
    localStorage.setItem("servicios", JSON.stringify(servicios)); // Guarda la lista actualizada en localStorage
}


function buscar_Servicio_Por_ID(servicioId) {
    return servicios.find(servicio => servicio.id === servicioId);
}


document.getElementById('crearServicio').addEventListener('click', function() {
    const nombreServicio = document.getElementById('nombreServicio').value;
    const precioServicio = document.getElementById('precioServicio').value;

    const mensajeContainer = document.getElementById('mensajeContainer');
    mensajeContainer.innerHTML = ''; 

    const mensaje = document.createElement("h3");
    mensaje.className = 'mensaje';
    
    if (nombreServicio && precioServicio) {
        agregarServicio(nombreServicio, precioServicio);
        mensaje.innerHTML = `Se agregó el Servicio ${nombreServicio} correctamente`;
        document.getElementById('nombreServicio').value = '';
        document.getElementById('precioServicio').value = ''; 
    } else {
        mensaje.innerHTML = `Por favor, complete ambos campos.`;
    }

    mensajeContainer.appendChild(mensaje);
});
