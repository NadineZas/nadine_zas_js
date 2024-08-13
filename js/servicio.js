class Servicio {
    constructor(id, nombre, precio) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    }
}

// Actualiza el contador del ID en localStorage
function actualizarContadorId(nuevoValor) {
    localStorage.setItem("contadorServicioId", nuevoValor);
}

function getServiciosFromLocalStorage() {
    let serviciosLocal = localStorage.getItem("servicios");
    if (serviciosLocal) {
        return JSON.parse(serviciosLocal);
    } else {
        return []; // Si no hay datos, devuelve un array vacío
    }
}

function guardarServiciosEnLocalStorage(servicios) {
    localStorage.setItem("servicios", JSON.stringify(servicios));
}

function obtenerContadorId() {
    let contador = localStorage.getItem("contadorServicioId");
    if (contador === null) {
        contador = 1; // Inicializa en 1 si es la primera vez
    } else {
        contador = parseInt(contador, 10);
    }
    return contador;
}

function servicioExistente(nombre){
    const servicios = getServiciosFromLocalStorage();
    return servicios.some(servicio => servicio.nombre.toLowerCase() === nombre.toLowerCase());
}

function agregarServicio(nombre, precio) {
    return new Promise((resolve, reject) => {
        const servicios = getServiciosFromLocalStorage();
        const existeServicio = servicioExistente(nombre);

        if (existeServicio) {
            return reject(`Ya existe un servicio con el nombre.`);
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
                result: `Felicitaciones! El servicio "${nombre}" ha sido agregado`
            });
        }, 500);
    });
}

function buscarServicioPorId(servicioId) {
    let servicios = getServiciosFromLocalStorage();
    return servicios.find(servicio => servicio.id == servicioId);
}

function actualizarServicio(id, nombre, precio) {
    let servicios = getServiciosFromLocalStorage();
    let servicioIndex = servicios.findIndex(servicio => servicio.id == id);

    if (servicioIndex !== -1) {
        if (nombre) {
            servicios[servicioIndex].nombre = nombre;
        }
        if (precio) {
            servicios[servicioIndex].precio = precio;
        }
        guardarServiciosEnLocalStorage(servicios);
        mostrarServicios();
    }
}

function eliminarServicio(id) {
    Swal.fire({
        title: "Quiere eliminar el Servicio?",
        showDenyButton: true,
        confirmButtonText: "Continuar",
        denyButtonText: `Cancelar`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            let servicios = getServiciosFromLocalStorage();
            servicios = servicios.filter(servicio => servicio.id != id);
            guardarServiciosEnLocalStorage(servicios);
            mostrarServicios();
          Swal.fire("Eliminado!", "se elimino el servicio correctamente", "success");
        } else if (result.isDenied) {
          Swal.fire("Cancelo la eliminacion");
        }
      });
    
}
function mostrarServicios() {
    let servicios = getServiciosFromLocalStorage();
    const listaServicios = document.getElementById('listaServicios');
    listaServicios.innerHTML = ''; 

    servicios.forEach(servicio => {
        let li = document.createElement('li');
        li.innerHTML = `
            <span class="servicio-info">${servicio.id} ${servicio.nombre} - $${servicio.precio}</span>
            <div class="servicio-actions">
                <button class="editar" onclick="editarServicio(${servicio.id})">Editar</button>
                <button class="eliminar" onclick="eliminarServicio(${servicio.id})">Eliminar</button>
            </div>
        `;
        listaServicios.appendChild(li);
    });
}

function editarServicio(id) {
    let servicio = buscarServicioPorId(id);
    if (servicio) {
        document.getElementById('nombreServicio').value = servicio.nombre;
        document.getElementById('precioServicio').value = servicio.precio;
        document.getElementById('servicioId').value = servicio.id;

        document.getElementById('crearServicio').style.display = 'none';
        document.getElementById('actualizarServicio').style.display = 'inline';
    }
}

document.getElementById('crearServicio').addEventListener('click', async function() {
    const nombreServicio = document.getElementById('nombreServicio').value;
    const precioServicio = document.getElementById('precioServicio').value;
    if(precioServicio<0){
        Swal.fire({
            title: "ERROR",
            text: "El precio no puede ser negativo",
            icon: "error"
        });
        return
    }
    if (nombreServicio && precioServicio) {
        try {
            const resultado = await agregarServicio(nombreServicio, precioServicio);
            Swal.fire({
                title: "Correcto",
                text: resultado.result, 
                icon: "success"
            }).then(() => {
                window.location.reload();
            });
        } catch (error) {
            Swal.fire({
                title: "ERROR",
                text: error,
                icon: "error"
              });

        }

        document.getElementById('nombreServicio').value = '';
        document.getElementById('precioServicio').value = '';
    } else {
        Swal.fire({
            title: "ERROR",
            text: "Llene ambos campos",
            icon: "error"
          });
    }
});

document.getElementById('actualizarServicio').addEventListener('click', function () {
    const nombreServicio = document.getElementById('nombreServicio').value;
    const precioServicio = document.getElementById('precioServicio').value;
    const servicioId = document.getElementById('servicioId').value;

    if(precioServicio<0){
        Swal.fire({
            title: "ERROR",
            text: "El precio no puede ser negativo",
            icon: "error"
        });
        return
    }

    if ((nombreServicio || precioServicio) && servicioId) {
        Swal.fire({
            title: "¿Quiere actualizar el Servicio?",
            showDenyButton: true,
            confirmButtonText: "Continuar",
            denyButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                // Solo verificar si el nombre está siendo actualizado
                if (nombreServicio) {
                    // Verificar si el nombre ya existe en otro servicio
                    const servicios = getServiciosFromLocalStorage();
                    const existeNombre = servicios.some(servicio => 
                        servicio.nombre.toLowerCase() === nombreServicio.toLowerCase() && servicio.id != servicioId
                    );

                    if (existeNombre) {
                        Swal.fire({
                            title: "ERROR",
                            text: "Ya existe un Servicio con ese nombre",
                            icon: "error"
                        });
                    } else {
                        // Si el nombre es único o no se está actualizando el nombre
                        actualizarServicio(servicioId, nombreServicio, precioServicio || undefined);
                        document.getElementById('nombreServicio').value = '';
                        document.getElementById('precioServicio').value = '';
                        document.getElementById('servicioId').value = '';
                        document.getElementById('crearServicio').style.display = 'inline';
                        document.getElementById('actualizarServicio').style.display = 'none';
                        Swal.fire("Actualizado!", "El servicio se actualizó correctamente", "success");
                    }
                } else {
                    // Si el nombre no está siendo actualizado, solo actualiza el precio
                    actualizarServicio(servicioId, undefined, precioServicio || undefined);
                    document.getElementById('nombreServicio').value = '';
                    document.getElementById('precioServicio').value = '';
                    document.getElementById('servicioId').value = '';
                    document.getElementById('crearServicio').style.display = 'inline';
                    document.getElementById('actualizarServicio').style.display = 'none';
                    Swal.fire("Actualizado!", "El servicio se actualizó correctamente", "success");
                }
            } else if (result.isDenied) {
                Swal.fire("Cancelado", "No se actualizó el servicio", "info");
            }
        });
    } else {
        Swal.fire({
            title: "ERROR",
            text: "Llene al menos un campo (nombre o precio)",
            icon: "error"
        });
    }
});

function inicializarFormulario() {
    mostrarServicios();
    document.getElementById('actualizarServicio').style.display = 'none';
}

window.onload = inicializarFormulario;
