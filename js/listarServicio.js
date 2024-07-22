let serviceContainer = document.getElementById("service-container")
let serviciosLocal= localStorage.getItem("servicios")

serviciosLocal = JSON.parse(serviciosLocal)
serviciosLocal.sort
function renderServicios(serviceArray) {
    serviceArray.forEach (servicio => {
        const card = document.createElement("div")
        card.innerHTML = `<h3>${servicio.nombre}</h3>
                          <p>${servicio.precio}</p>
                          `
        serviceContainer.appendChild(card)
    })
}

renderServicios((serviciosLocal));
