const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");
const TAMANIO_CELDA = 35;

// Variables Globales
let serpiente = [{x: 2, y: 0}, {x: 1, y: 0}, {x: 0, y: 0}];
let direccionActual = "derecha";
let intervaloSerpiente;
let comida = { x: 5, y: 5 };
let puntaje = 0;
let velocidad = 300; 
let juegoTerminado = false;
let nivel = 1;

const sonidoComer = new Audio("snake-game-food.mp3");
const sonidoChoque = new Audio("choque.mp3");


function limpiarCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujarTablero() {
  ctx.strokeStyle = "#444"; 
  for (let x = 0; x <= canvas.width; x += TAMANIO_CELDA) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
  }
  for (let y = 0; y <= canvas.height; y += TAMANIO_CELDA) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
  }
}

function pintarParte(lineax, lineay, colorRelleno) {
  const xReal = lineax * TAMANIO_CELDA;
  const yReal = lineay * TAMANIO_CELDA;
  ctx.fillStyle = colorRelleno;
  ctx.fillRect(xReal, yReal, TAMANIO_CELDA, TAMANIO_CELDA);
  ctx.strokeStyle = "#ffffff";
  ctx.strokeRect(xReal, yReal, TAMANIO_CELDA, TAMANIO_CELDA);
}

function pintarSerpiente() {
  for (let i = 0; i < serpiente.length; i++) {
    if (i === 0) {
      pintarParte(serpiente[i].x, serpiente[i].y, "#00ffff"); // Cabeza
    } else {
      pintarParte(serpiente[i].x, serpiente[i].y, "#ff00ff"); // Cuerpo
    }
  }
}

function generarComida() {
  const maxLineasX = Math.floor(canvas.width / TAMANIO_CELDA) - 1;
  const maxLineasY = Math.floor(canvas.height / TAMANIO_CELDA) - 1;
  comida.x = Math.floor(Math.random() * maxLineasX);
  comida.y = Math.floor(Math.random() * maxLineasY);
}

function pintarComida() {
  pintarParte(comida.x, comida.y, "#39ff14");
}

function atrapaComida() {
  const cabeza = serpiente[0];
  return (cabeza.x === comida.x && cabeza.y === comida.y);
}

// Lógica principal con Game Over (Parte 4)
function procesarMovimiento(nuevaCabeza) {
  // Si el juego ya terminó, no hacemos nada
  if (juegoTerminado) return; 

  const maxLineasX = Math.floor(canvas.width / TAMANIO_CELDA);
  const maxLineasY = Math.floor(canvas.height / TAMANIO_CELDA);

  // 1. Verificar colisión con bordes (GAME OVER y Sonido de Choque)
  if (nuevaCabeza.x < 0 || nuevaCabeza.x >= maxLineasX || 
      nuevaCabeza.y < 0 || nuevaCabeza.y >= maxLineasY) {
    
    juegoTerminado = true;
    clearInterval(intervaloSerpiente);
    document.getElementById("estado").innerText = "GAME OVER";
    document.getElementById("mensaje").innerText = "¡Oh no! Chocaste con el borde.";
    
    // Reproducir sonido de choque
    sonidoChoque.currentTime = 0;
    sonidoChoque.play();
    
    return; // Detiene la ejecución aquí
  }

  // 2. Mover la serpiente agregando la nueva cabeza
  serpiente.unshift(nuevaCabeza); 
  
  // 3. Verificar si la cabeza toca la comida
  if (atrapaComida()) {
    puntaje += 10;
    document.getElementById("puntaje").innerText = puntaje;
    generarComida(); 
    
    // Reproducir sonido de comer
    sonidoComer.currentTime = 0; 
    sonidoComer.play();
    
    // 4. Lógica de Niveles (Sube de nivel cada 50 puntos)
    if (puntaje % 50 === 0) {
      nivel++;
      document.getElementById("estado").innerText = "Nivel " + nivel;
      document.getElementById("mensaje").innerText = "¡Nivel " + nivel + "! Más rápido 🔥";
      
      // Aumentar la velocidad si aún no es demasiado rápida
      if (velocidad > 60) {
         velocidad -= 40; 
         clearInterval(intervaloSerpiente);
         intervaloSerpiente = setInterval(moverSerpiente, velocidad);
      }
    }
    // NOTA: No usamos pop() aquí, de esta forma la serpiente crece

  } else {
    // Si no comió, borramos la última parte de la cola para que avance
    serpiente.pop(); 
  }
}
// Funciones de Movimiento
function moverDerecha() { procesarMovimiento({ x: serpiente[0].x + 1, y: serpiente[0].y }); }
function moverIzquierda() { procesarMovimiento({ x: serpiente[0].x - 1, y: serpiente[0].y }); }
function moverArriba() { procesarMovimiento({ x: serpiente[0].x, y: serpiente[0].y - 1 }); }
function moverAbajo() { procesarMovimiento({ x: serpiente[0].x, y: serpiente[0].y + 1 }); }

// Funcionalidad Extra: Evitar movimiento en reversa (Parte 4)
function cambiarDireccion(nuevaDireccion) {
  if (juegoTerminado) return;
  if (nuevaDireccion === "arriba" && direccionActual === "abajo") return;
  if (nuevaDireccion === "abajo" && direccionActual === "arriba") return;
  if (nuevaDireccion === "izquierda" && direccionActual === "derecha") return;
  if (nuevaDireccion === "derecha" && direccionActual === "izquierda") return;

  direccionActual = nuevaDireccion;
}

function moverSerpiente() {
  if (direccionActual === "derecha") moverDerecha();
  if (direccionActual === "izquierda") moverIzquierda();
  if (direccionActual === "arriba") moverArriba();
  if (direccionActual === "abajo") moverAbajo();
  
  dibujarTodo();
}

function iniciarJuego() {
  if (juegoTerminado) return; // Si perdió, debe dar en Reiniciar
  document.getElementById("estado").innerText = "Jugando";
  document.getElementById("mensaje").innerText = "¡Buena suerte!";
  clearInterval(intervaloSerpiente); 
  intervaloSerpiente = setInterval(moverSerpiente, velocidad); 
}

function pausarJuego() {
  if (juegoTerminado) return;
  document.getElementById("estado").innerText = "Pausado";
  clearInterval(intervaloSerpiente);
}

// Reinicio completo (Parte 4)
function reiniciarJuego() {
  clearInterval(intervaloSerpiente);
  
  serpiente = [{x: 2, y: 0}, {x: 1, y: 0}, {x: 0, y: 0}];
  direccionActual = "derecha";
  puntaje = 0;
  velocidad = 300;
  juegoTerminado = false;
  nivel = 1; // 👇 Reiniciar el nivel
  
  generarComida();
  
  document.getElementById("puntaje").innerText = puntaje;
  document.getElementById("estado").innerText = "Listo"; // Vuelve a decir Listo
  document.getElementById("mensaje").innerText = "Juego reiniciado. Presiona Iniciar.";
  
  dibujarTodo();
}

function dibujarTodo() {
  limpiarCanvas();
  dibujarTablero(); 
  pintarComida();
  pintarSerpiente(); 
}

generarComida();
dibujarTodo();