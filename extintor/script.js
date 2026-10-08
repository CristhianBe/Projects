// Elementos del DOM
const barra = document.querySelector(".barra");
const letrero = document.querySelector(".letrero");
const aviso = document.querySelector(".aviso");

// Sonido de alerta (archivo dentro de la carpeta extintor)
const sonido = new Audio("miedo.mp3");

function iniciarAlarma() {
  sonido.currentTime = 0;   // reinicia el sonido cada vez que entra el mouse
  sonido.play();
  barra.classList.add("alerta");
  letrero.classList.add("alerta");
}

function detenerAlarma() {
  barra.classList.remove("alerta");
  letrero.classList.remove("alerta");
}

// Eventos del ratón sobre la barra de abajo
barra.addEventListener("mouseenter", iniciarAlarma);
barra.addEventListener("mouseleave", detenerAlarma);

// El navegador bloquea el audio hasta el primer clic en la página
document.addEventListener("pointerdown", () => {
  aviso.classList.add("oculto");
}, { once: true });