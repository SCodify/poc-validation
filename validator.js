const formulario = document.querySelector("form")
const mensajes = document.querySelector(".mensajes")

export function validarFormulario() {
  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault()
    const data = Object.fromEntries(new FormData(formulario))
    const camposConValidación = [
      {
        campo: "Nombre",
        valido: (/^[a-zA-Z\s]{1,40}$/).test(data.nombre),
        error: 'El campo "Nombre" solo debe contener letras y de 1 a 40 caracteres',
        vacio: (data.nombre.trim() === "")
      },
      {
        campo: "Apellido",
        valido: (/^[a-zA-Z\s]{1,40}$/).test(data.apellido),
        error: 'El campo "Apellido" solo debe contener letras y de 1 a 40 caracteres',
        vacio: (data.apellido.trim() === "")
      },
      {
        campo: "E-mail",
        valido: (/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(data.email),
        error: "Por favor, introduce un correo electrónico válido",
        vacio: (data.email.trim() === "")
      },
    ]

    let listaErrores = "";
    let valido = true;

    camposConValidación.forEach(itemCampo => {
      if(itemCampo.vacio){
        listaErrores += `<li class="red">El campo "${itemCampo.campo}" es requerido</li>`;
        valido = false
      } else {
        if(!itemCampo.valido) {
          listaErrores += `<li class="red">${itemCampo.error}</li>`;
          valido = false
        }
      }

    });
    
    mensajes.innerHTML = ""

    if(!valido) {
      mensajes.innerHTML = listaErrores
    } else {
      mensajes.innerHTML = `<li class="green">El fomulario es valido</li>`
      formulario.reset()
    }
  })
}
