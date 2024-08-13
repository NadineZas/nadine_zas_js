fetch("./db/usuarios.json")
.then(response => response.json())
.then(data => {
    console.log(data)
    const container = document.getElementById("container");
    data.forEach(user => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `<h2>Nombre: ${user.nombre} ${user.apellido}</h2>
                          <h3>Edad: ${user.edad}</h3>
                          <p><strong>Dirección:</strong> ${user.direccion.calle} esquina ${user.direccion.esquina}, apartamento ${user.direccion.numero_apartamento}</p>`;
        container.appendChild(card);
    });
});
