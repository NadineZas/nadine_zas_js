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

function obtenerContadorId() {
    let contador = localStorage.getItem("contadorId");
    if (contador === null) {
        contador = 1; // Inicializa en 1 si es la primera vez
    } else {
        contador = parseInt(contador, 10);
    }
    return contador;
}
function servicioExistente(nombre){
    const servicios = getServiciosFromLocalStorage();
     return servicios.some(servicio => servicio.nombre === nombre);
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
        servicios[servicioIndex].nombre = nombre;
        servicios[servicioIndex].precio = precio;
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

    const mensajeContainer = document.getElementById('mensajeContainer');
    mensajeContainer.innerHTML = '';

    const mensaje = document.createElement("h3");
    mensaje.className = 'mensaje';
    
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

    mensajeContainer.appendChild(mensaje);
});

document.getElementById('actualizarServicio').addEventListener('click', function () {
    const nombreServicio = document.getElementById('nombreServicio').value;
    const precioServicio = document.getElementById('precioServicio').value;
    const servicioId = document.getElementById('servicioId').value;

    const mensajeContainer = document.getElementById('mensajeContainer');
    mensajeContainer.innerHTML = '';

    const mensaje = document.createElement("h3");
    mensaje.className = 'mensaje';

    if (nombreServicio && precioServicio && servicioId) {

        Swal.fire({
            title: "Quiere actualizar el Servicio?",
            showDenyButton: true,
            confirmButtonText: "Continuar",
            denyButtonText: `Cancelar`
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                if(servicioExistente(nombreServicio)){
                    Swal.fire({
                        title: "ERROR",
                        text: "Ya existe un Servicio con ese nombre",
                        icon: "error"
                      });  
                }else{
                actualizarServicio(servicioId, nombreServicio, precioServicio);
                mensaje.innerHTML = `Se actualizó el Servicio ${nombreServicio} correctamente`;
                document.getElementById('nombreServicio').value = '';
                document.getElementById('precioServicio').value = '';
                document.getElementById('servicioId').value = '';
                document.getElementById('crearServicio').style.display = 'inline';
                document.getElementById('actualizarServicio').style.display = 'none';
                Swal.fire("Actualizado!", "se actualizo el servicio correctamente", "success");
                }
            } else if (result.isDenied) {
              Swal.fire("Cancelo la actualizacion");
            }
          });
    } else {
        Swal.fire({
            title: "ERROR",
            text: "Llene ambos campos",
            icon: "error"
          });
    }

    mensajeContainer.appendChild(mensaje);
});


function inicializarFormulario() {
    mostrarServicios();
    document.getElementById('actualizarServicio').style.display = 'none';
}

window.onload = inicializarFormulario;
