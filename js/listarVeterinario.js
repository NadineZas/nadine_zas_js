let veterinarioContainer = document.getElementById("veterinario-container")
let veterinariosLocal= localStorage.getItem("veterinarios")

veterinariosLocal = JSON.parse(veterinariosLocal)

function renderVeterinarios(veterinarioArray) {
    veterinarioArray.forEach (Veterinario => {
        const card = document.createElement("div")
        card.innerHTML = `<h3>${Veterinario.nombre}</h3>
                          <p>${Veterinario.apellido}</p>
                          `
        veterinarioContainer.appendChild(card)
    })
}

renderVeterinarios((veterinariosLocal));