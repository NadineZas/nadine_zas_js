class Servicio {
    constructor(id, nombre, precio) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    }
}

class Veterinario {
    constructor(id, nombre, apellido, edad, servicio) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.servicio = servicio;
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

function getVeterinariosFromLocalStorage() {
    let veterinariosLocal = localStorage.getItem("veterinarios");
    if (veterinariosLocal) {
        return JSON.parse(veterinariosLocal);
    } else {
        return [];
    }
}

const servicioSelect = document.getElementById("servicio");
const veterinarioSelect = document.getElementById("veterinario");
const citaForm = document.getElementById("citaForm");

const servicios = getServiciosFromLocalStorage();
const veterinarios = getVeterinariosFromLocalStorage();

// Llenar el combo box de servicios
servicios.forEach(servicio => {
    const option = document.createElement("option");
    option.value = servicio.id;
    option.textContent = servicio.nombre;
    servicioSelect.appendChild(option);
});

function validarNumero(contacto) {
    const regex = /^[0-9]+$/;
    return regex.test(contacto);
}

// Llenar el combo box de veterinarios según el servicio seleccionado
servicioSelect.addEventListener("change", () => {
    const selectedServicioId = Number(servicioSelect.value);

    // Limpiar las opciones actuales de veterinarios
    veterinarioSelect.innerHTML = '<option value="">Seleccione un veterinario</option>';

    // Filtrar y mostrar los veterinarios que tienen el servicio seleccionado
    veterinarios
        .filter(veterinario => veterinario.servicio.id === selectedServicioId)
        .forEach(veterinario => {
            const option = document.createElement("option");
            option.value = veterinario.id;
            option.textContent = `${veterinario.nombre} ${veterinario.apellido}`;
            veterinarioSelect.appendChild(option);
        });
});

citaForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const nombreUsuario = document.getElementById("nombreUsuario").value;
    const apellidoUsuario = document.getElementById("apellidoUsuario").value;
    const contactoUsuario = document.getElementById("contactoUsuario").value;
    const fechaCita = document.getElementById("fechaCita").value;
    const servicioId = Number(servicioSelect.value);
    const veterinarioId = Number(veterinarioSelect.value);

    const servicioSeleccionado = servicios.find(servicio => servicio.id === servicioId);
    const veterinarioSeleccionado = veterinarios.find(veterinario => veterinario.id === veterinarioId);

    if (!validarNumero(contactoUsuario)) {
        Swal.fire({
            title: "Error",
            text: "El contacto debe ser un número válido.",
            icon: "error",
            confirmButtonText: "Aceptar"
        });
        return;
    }
    
    Swal.fire({
        title: "¡Cita Confirmada!",
        html: `
            <p>Nombre: ${nombreUsuario} ${apellidoUsuario}</p>
            <p>Contacto: ${contactoUsuario}</p>
            <p>Servicio: ${servicioSeleccionado.nombre} - Precio: $${servicioSeleccionado.precio}</p>
            <p>Veterinario: ${veterinarioSeleccionado.nombre} ${veterinarioSeleccionado.apellido}</p>
            <p>Gracias por elegirnos. La esperamos el día ${fechaCita}.</p>
            <p>Cualquier inconveniente la llamaremos al número ${contactoUsuario}.</p>
        `,
        icon: "success",
        confirmButtonText: "Aceptar",
        willClose: () => {
            window.location.href = "index.html";
        }
    });
   
});
