class Servicio {
    constructor(id, nombre, precio) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    }
}

function obtenerContadorId() {
    let contador = localStorage.getItem("contadorId");
    if (contador === null) {
        contador = 1; // Inicializa en 1 si es la primera vez
    } else {
        contador = parseInt(contador, 10);
    }
    return contador;
}

// Actualiza el contador del ID en localStorage
function actualizarContadorId(nuevoValor) {
    localStorage.setItem("contadorId", nuevoValor);
}



function getServiciosFromLocalStorage() {
    let serviciosLocal = localStorage.getItem("servicios");
    if (serviciosLocal) {
        return JSON.parse(serviciosLocal);
    } else {
        return []; // Si no hay datos, devuelve un array vacío
    }
}

function guardarServiciosEnLocalStorage(servicios,idServicios) {
    localStorage.setItem("servicios", JSON.stringify(servicios));
    localStorage.setItem("idservicios",idServicios++)
}

function agregarServicio(nombre, precio) {
    return new Promise((resolve, reject) => {
        // Obtener los servicios actuales del almacenamiento local
        const servicios = getServiciosFromLocalStorage();

        // Verificar si ya existe un servicio con el nombre proporcionado
        const servicioExistente = servicios.some(servicio => servicio.nombre === nombre);

        if (servicioExistente) {
            return reject(`Ya existe un servicio con el nombre "${nombre}".`);
        }

        // Si el servicio no existe, proceder a agregarlo
        setTimeout(() => {
            let idServicio = obtenerContadorId(); 
            let servicio = { id: idServicio, nombre, precio };
            servicios.push(servicio);
            actualizarContadorId(idServicio + 1); 
            guardarServiciosEnLocalStorage(servicios); 
            resolve({
                posicion: servicios.length,
                result: "Felicitaciones! El servicio ha sido agregado"
            });
        }, 1000);
    });
}

/*function agregarServicio(nombre, precio) {
    
    let idServicio = obtenerContadorId(); // Obtiene el ID actual
    let servicios = getServiciosFromLocalStorage();
    let servicio = new Servicio(idServicio, nombre, precio);
    servicios.push(servicio);
    actualizarContadorId(idServicio + 1);
    guardarServiciosEnLocalStorage(servicios,idServicio);
    mostrarServicios();
}*/

function buscarServicioPorId(servicioId) {
    let servicios = getServiciosFromLocalStorage();
    return servicios.find(servicio => servicio.id == servicioId);
}

function actualizarServicio(id, nombre, precio) {
    let servicios = getServiciosFromLocalStorage();
    let servicioIndex = servicios.findIndex(servicio => servicio.id == id);

    if (servicioIndex !== -1) {
        servicios[servicioIndex].nombre = nombre;
        servicios[servicioIndex].precio = precio;
        guardarServiciosEnLocalStorage(servicios);
        mostrarServicios();
    }
}

function eliminarServicio(id) {
    let servicios = getServiciosFromLocalStorage();
    servicios = servicios.filter(servicio => servicio.id != id);
    guardarServiciosEnLocalStorage(servicios);
    mostrarServicios();
}