// Elementos del DOM
const barra = document.querySelector(".barra");
const letrero = document.querySelector(".letrero");
const aviso = document.querySelector(".aviso");

// Sonido de alerta generado con Web Audio API (no necesita archivo de audio)
const audio = new AudioContext();
let sirena = null;

function iniciarAlarma() {
  if (sirena) return;                      // ya está sonando

  const oscilador = audio.createOscillator();
  const volumen = audio.createGain();
  const lfo = audio.createOscillator();    // hace subir y bajar el tono (sirena)
  const lfoGanancia = audio.createGain();

  oscilador.type = "square";
  oscilador.frequency.value = 800;
  lfo.frequency.value = 3;                 // 3 subidas por segundo
  lfoGanancia.gain.value = 300;            // varía entre 500 Hz y 1100 Hz
  volumen.gain.value = 0.15;

  lfo.connect(lfoGanancia);
  lfoGanancia.connect(oscilador.frequency);
  oscilador.connect(volumen);
  volumen.connect(audio.destination);

  oscilador.start();
  lfo.start();
  sirena = { oscilador, lfo };

  barra.classList.add("alerta");
  letrero.classList.add("alerta");
}

function detenerAlarma() {
  if (!sirena) return;
  sirena.oscilador.stop();
  sirena.lfo.stop();
  sirena = null;

  barra.classList.remove("alerta");
  letrero.classList.remove("alerta");
}

// Eventos del ratón sobre la barra de abajo
barra.addEventListener("mouseenter", iniciarAlarma);
barra.addEventListener("mouseleave", detenerAlarma);

// Los navegadores bloquean el audio hasta que el usuario interactúa con la página.
// Con un solo clic (once: true) se desbloquea el sonido.
document.addEventListener("pointerdown", () => {
  audio.resume();
  aviso.classList.add("oculto");
}, { once: true });

if (audio.state === "running") aviso.classList.add("oculto");
