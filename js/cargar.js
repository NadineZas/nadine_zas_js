class Servicio {
    constructor(id, nombre, precio) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    }
}
class Veterinario {
    constructor(id, nombre, apellido,edad, servicio) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad=edad;
        this.servicio = servicio;
    }
}



function cargar(){
    // Definición de servicios
const servicios = [
    new Servicio(1, "Consulta General", 50),
    new Servicio(2, "Vacunación", 30),
    new Servicio(3, "Cirugía", 200),
    new Servicio(4, "Peluquería", 40)
];

// Definición de veterinarios
const veterinarios = [
    new Veterinario(1, "Carlos", "Pérez",30, servicios[0]), // Consulta General
    new Veterinario(2, "Laura", "García",40, servicios[1]), // Vacunación
    new Veterinario(3, "Ana", "Rodríguez",25, servicios[2]), // Cirugía
    new Veterinario(4, "Juan", "López",29, servicios[3]), // Peluquería
    new Veterinario(5, "María", "Martínez",50, servicios[0]), // Consulta General
    new Veterinario(6, "Jorge", "González",32, servicios[1]), // Vacunación
    new Veterinario(7, "Lucía", "Fernández",40, servicios[2]), // Cirugía
    new Veterinario(8, "Pedro", "Sánchez",55, servicios[3]), // Peluquería
    new Veterinario(9, "Sofía", "Díaz",21, servicios[0]), // Consulta General
    new Veterinario(10, "José", "Ramírez",32, servicios[1]) // Vacunación
];

// Actualiza el contador del ID en localStorage
function actualizarContadorId(nuevoValor) {
    localStorage.setItem("contadorServicioId", nuevoValor);
}

function guardarServiciosEnLocalStorage(servicios) {
    localStorage.setItem("servicios", JSON.stringify(servicios));
}


function actualizarContadorServicioId(nuevoValor) {
    localStorage.setItem("contadorServicioId", nuevoValor);
}

function actualizarContadorVeterinarioId(nuevoValor) {
    localStorage.setItem("contadorVetId", nuevoValor);
}

function guardarVeterinariosEnLocalStorage(veterinarios) {
    localStorage.setItem("veterinarios", JSON.stringify(veterinarios));
}



// Guardar servicios en localStorage
guardarServiciosEnLocalStorage(servicios);
actualizarContadorServicioId(servicios.length + 1);


// Guardar veterinarios en localStorage
guardarVeterinariosEnLocalStorage(veterinarios);
actualizarContadorVeterinarioId(veterinarios.length + 1);

}



document.getElementById('cargar').addEventListener('click',function() {
    cargar();
    Swal.fire({
        title: "Correcto",
        text: "Se cargaron los datos", 
        icon: "success"
    })
});