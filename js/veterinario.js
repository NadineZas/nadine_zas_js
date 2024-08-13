class Veterinario {
    constructor(id, nombre, apellido,edad, servicio) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad=edad;
        this.servicio = servicio;
    }
}


function actualizarContadorId(nuevoValor) {
    localStorage.setItem("contadorVetId", nuevoValor);
}

function obtenerContadorId() {
    let contador = localStorage.getItem("contadorVetId");
    if (contador === null) {
        contador = 1;
    } else {
        contador = parseInt(contador, 10);
    }
    return contador;
}

function getVeterinariosFromLocalStorage() {
    let veterinariosLocal = localStorage.getItem("veterinarios");
    if (veterinariosLocal) {
        return JSON.parse(veterinariosLocal);
    } else {
        return [];
    }
}

function guardarVeterinariosEnLocalStorage(veterinarios) {
    localStorage.setItem("veterinarios", JSON.stringify(veterinarios));
}

function getServiciosFromLocalStorage() {
    let serviciosLocal = localStorage.getItem("servicios");
    if (serviciosLocal) {
        return JSON.parse(serviciosLocal);
    } else {
        return [];
    }
}

function cargarServiciosEnComboBox() {
    const servicios = getServiciosFromLocalStorage();
    const comboBox = document.getElementById("servicio");

    servicios.forEach(servicio => {
        const option = document.createElement("option");
        option.value = servicio.id;  
        option.text = servicio.nombre;
        comboBox.appendChild(option);
    });
}

function agregarVeterinario(nombre, apellido,edad, servicioId) {
    const servicios = getServiciosFromLocalStorage();
    const servicioSeleccionado = servicios.find(servicio => servicio.id == servicioId);
    
    if (!servicioSeleccionado) {
        Swal.fire({
            title: "ERROR",
            text: "Servicio no encontrado",
            icon: "error"
          });
          return;
    }
    const veterinarios = getVeterinariosFromLocalStorage();
    const nuevoId = obtenerContadorId();
    const nuevoVeterinario = new Veterinario(nuevoId, nombre, apellido,edad, servicioSeleccionado);
    veterinarios.push(nuevoVeterinario);
    guardarVeterinariosEnLocalStorage(veterinarios);
    actualizarContadorId(nuevoId + 1);
}

function eliminarVeterinario(id) {
    Swal.fire({
        title: "Quiere eliminar el Veterinario?",
        showDenyButton: true,
        confirmButtonText: "Continuar",
        denyButtonText: `Cancelar`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            let veterinarios = getVeterinariosFromLocalStorage();
            veterinarios = veterinarios.filter(veterinario => veterinario.id != id);
            guardarVeterinariosEnLocalStorage(veterinarios);
            listarVeterinarios()
          Swal.fire("Eliminado!", "se elimino el veterinario correctamente", "success");
        } else if (result.isDenied) {
          Swal.fire("Cancelo la eliminacion");
        }
      });
    
}

function listarVeterinarios() {
    const veterinarios = getVeterinariosFromLocalStorage();
    const tbody = document.querySelector("#listaVeterinarios tbody");

    tbody.innerHTML = "";

    veterinarios.forEach(veterinario => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${veterinario.id}</td>
            <td>${veterinario.nombre}</td>
            <td>${veterinario.apellido}</td>
            <td>${veterinario.edad}</td>
            <td>${veterinario.servicio.nombre}</td>
            <button class="editar" onclick="window.location.href='editarVeterinario.html?id=${veterinario.id}'">Editar</button>
            <button class="eliminar" onclick="eliminarVeterinario(${veterinario.id})">Eliminar</button>
        `;

        tbody.appendChild(row);
    });
}

// Función para obtener el ID del veterinario desde la URL
function obtenerIdVeterinarioDeURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

// Función para cargar los datos del veterinario en el formulario de edición
function cargarDatosVeterinarioEnFormulario(id) {
    const veterinarios = getVeterinariosFromLocalStorage();
    const veterinario = veterinarios.find(vet => vet.id == id);

    if (veterinario) {
        document.getElementById("id").value = veterinario.id;
        document.getElementById("nombre").value = veterinario.nombre;
        document.getElementById("apellido").value = veterinario.apellido;
        document.getElementById("edad").value = veterinario.edad;

        cargarServiciosEnComboBox();

        // Seleccionar el servicio correspondiente
        const comboBox = document.getElementById("servicio");
        comboBox.value = veterinario.servicio.id;
    } else {
        Swal.fire({
            title: "ERROR",
            text: "Veterinario no encontrado",
            icon: "error"
        });
    }
}

// Función para inicializar el formulario de edición
function inicializarFormularioEdicion() {
    const idVeterinario = obtenerIdVeterinarioDeURL();
    if (idVeterinario) {
        cargarDatosVeterinarioEnFormulario(idVeterinario);
    }
}

// Ejecutar la función cuando se cargue la página de edición
if (document.getElementById("formVeterinarioEdit")) {
    inicializarFormularioEdicion();
    document.getElementById("formVeterinarioEdit").addEventListener("submit", function(event) {
        event.preventDefault();
        Swal.fire({
            title: "¿Deseas guardar los cambios?",
            showDenyButton: true,
            confirmButtonText: "Continuar",
            denyButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                const id = document.getElementById("id").value;
                const nombre = document.getElementById("nombre").value;
                const apellido = document.getElementById("apellido").value;
                const edad = document.getElementById("edad").value;
                const servicioId = document.getElementById("servicio").value;

                const servicios = getServiciosFromLocalStorage();
                const servicioSeleccionado = servicios.find(servicio => servicio.id == servicioId);
                if(edad<18){
                    Swal.fire({
                        title: "ERROR",
                        text: "La edad no puede ser menor a 18", 
                        icon: "error"
                    })
                    return
                }
                if (!servicioSeleccionado) {
                    Swal.fire({
                        title: "ERROR",
                        text: "Servicio no encontrado",
                        icon: "error"
                    });
                    return;
                }

                // Actualizar el veterinario en localStorage
                const veterinarios = getVeterinariosFromLocalStorage();
                const index = veterinarios.findIndex(vet => vet.id == id);
                if (index !== -1) {
                    veterinarios[index] = new Veterinario(id, nombre, apellido, edad, servicioSeleccionado);
                    guardarVeterinariosEnLocalStorage(veterinarios);
                    Swal.fire({
                        title: "Guardado",
                        text: "Se actualizó correctamente el Veterinario",
                        icon: "success"
                    }).then(() => {
                        window.location.href = "veterinario.html";
                    });
                }
            } else if (result.isDenied) {
                Swal.fire("Los cambios no fueron guardados", "No se actualizó el Veterinario", "info");
            }
        });
    });
}

// En la página de creación, cargar los servicios en el combo box
if (document.getElementById("formVeterinario")) {
    cargarServiciosEnComboBox();
    document.getElementById("formVeterinario").addEventListener("submit", function(event) {
        event.preventDefault();
        const nombre = document.getElementById("nombre").value;
        const apellido = document.getElementById("apellido").value;
        const edad = document.getElementById("edad").value;
        const servicio = document.getElementById("servicio").value;
        try{
            if(nombre && apellido && edad && servicio){
                if(edad<18){
                    Swal.fire({
                        title: "ERROR",
                        text: "La edad no puede ser menor a 18", 
                        icon: "error"
                    })
                    return
                }
                agregarVeterinario(nombre, apellido,edad, servicio);
                document.getElementById('nombre').value = '';
                document.getElementById('apellido').value = '';
                Swal.fire({
                    title: "Correcto",
                    text: "Se agrego correctamente el nuevo Veterinario", 
                    icon: "success"
                })
            }else{
                throw new Error("Llene todos los campos")
            }
        }catch(error){
            Swal.fire({
                title: "ERROR",
                text: error,
                icon: "error"
              });
        }
    });
}

// En la página principal, listar los veterinarios
if (document.getElementById("listaVeterinarios")) {
    listarVeterinarios();
}
