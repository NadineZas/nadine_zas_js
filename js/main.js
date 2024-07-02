class Veterinario {
    constructor(nombre, apellido) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.servicio = [];
    }

   
    agregarServicio(servicio) {
        this.servicio.push(servicio);
    }
}


class Servicio{
    constructor (nombre){
        this.nombre=nombre
    }
}

let veterinarios=[]
let servicios = []

function agregarVeterinario (nombre,apellido){
    let veterinario = new Veterinario(nombre,apellido);
    veterinarios.push(veterinario);
}

function agregarServicio(nombre) {
    let servicio = new Servicio(nombre);
    servicios.push(servicio);
    console.log(`Se agregó el servicio ${nombre}.`);
}

function buscar_Veterinario_Por_Nombre(nombre) {
    return veterinarios.find(veterinario => veterinario.nombre === nombre);
}


function buscar_Servicio_Por_Nombre(nombreServicio) {
    return servicios.find(servicio => servicio.nombre === nombreServicio);
}

function agregarServicioVeterinario(nombre_veterinario, nombre_servicio) {
    let veterinario = buscar_Veterinario_Por_Nombre(nombre_veterinario);
    let servicio = buscar_Servicio_Por_Nombre(nombre_servicio);

    if (veterinario && servicio) {
        veterinario.agregarServicio(servicio);
        alert(`Se agregó el servicio ${nombre_servicio} al veterinario ${nombre_veterinario}.`);
    } else {
        if (!veterinario) {
            alert(`Veterinario con nombre ${nombre_veterinario} no encontrado.`);
        }
        if (!servicio) {
            alert(`Servicio con nombre ${nombre_servicio} no encontrado.`);
        }
    }
}

function menu_Agregar_Veterinario() {
    let nombre_veterinario = prompt("Ingrese Nombre del Veterinario: ");
    let apellido_veterinario = prompt("Ingrese Apellido: ");
    agregarVeterinario(nombre_veterinario, apellido_veterinario);
    alert("Se agregó el nuevo Veterinario " + nombre_veterinario);
}

function menu_Agregar_Servicio(){
    let nombre_servicio = prompt("Ingrese Nombre: ");
    agregarServicio(nombre_servicio);
    alert("Se agregó el nuevo Servicio " + nombre_servicio);
}

function menu_Agregar_Servicio_Veterinario() {
    let nombre_veterinario = prompt("Ingrese Nombre del Veterinario: ");
    let nombre_servicio = prompt("Ingrese Nombre del Servicio: ");
    agregarServicioVeterinario(nombre_veterinario, nombre_servicio);
}

function mostrarVeterinariosEnAlert(veterinarios) {
    let mensaje = "Veterinarios\n";
    veterinarios.forEach((veterinario, indice) => {
        mensaje += `${indice + 1}- Nombre: ${veterinario.nombre}\n`;
        mensaje += `   Apellido: ${veterinario.apellido}\n`;
        mensaje += "   Servicios:\n";
        
        if (veterinario.servicio.length > 0) {
            veterinario.servicio.forEach((servicio, index) => {
                mensaje += `     ${index + 1}. ${servicio.nombre}\n`;
            });
        } else {
            mensaje += "     No tiene servicios asignados\n";
        }
        
        mensaje += "\n";
    });
    alert(mensaje);
}

function mostrarServiciosEnAlert(servicios) {
    let mensaje = "Servicios\n";
    servicios.forEach((servicios, indice) => {
        mensaje += `${indice + 1}- Nombre: ${servicios.nombre}\n`;
    });
    alert(mensaje);
}



let continuar = true;
while (continuar) {
    let menu = "Bienvenido a veterinaria Mariandia\n\n" +
               "Menú:\n" +
               "1. Agregar veterinario\n" +
               "2. Agregar servicio\n" +
               "3. Asignar servicio a veterinario\n" +
               "4. Mostrar veterinarios\n" +
               "5. Mostrar Servicios\n\n" +
               "Por favor, ingresa el número de la opción que deseas elegir (1-5):";

    let opcion = prompt(menu);

    opcion = parseInt(opcion);

    switch (opcion) {
        case 1:
            menu_Agregar_Veterinario()    
            break;
        case 2:
            menu_Agregar_Servicio()
            break;
        case 3:
            menu_Agregar_Servicio_Veterinario()
            break;
        case 4:
            mostrarVeterinariosEnAlert(veterinarios);
            break;
        case 5:
            mostrarServiciosEnAlert(servicios)
            break;
        default:
            alert("Opción no válida. Por favor ingresa un número del 1 al 5.");
    }
}
