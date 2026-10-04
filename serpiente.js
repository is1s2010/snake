const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");

const TAMANIO_CELDA = 35;


let serpiente = [
  {x: 9, y: 7},
  {x: 9, y: 6},
  {x: 9, y: 5}
];
let intervaloSerpiente;
let direccionActual = "derecha"; 

let comida = { x: 5, y: 5 }; 
let puntaje = 0;


function limpiarCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function iniciarJuego() {
  clearInterval(intervaloSerpiente);
  intervaloSerpiente = setInterval(moverSerpiente, 300);
}

function pausarJuego() {
  clearInterval(intervaloSerpiente);
}


function dibujarTablero() {
  ctx.strokeStyle = "#444"; 

  for (let x = 0; x <= canvas.width; x += TAMANIO_CELDA) {
    ctx.beginPath();
    ctx.moveTo(x, 0); 
    ctx.lineTo(x, canvas.height); 
    ctx.stroke();
  }

  for (let y = 0; y <= canvas.height; y += TAMANIO_CELDA) {
    ctx.beginPath();
    ctx.moveTo(0, y); 
    ctx.lineTo(canvas.width, y); 
    ctx.stroke();
  }
}

function pintarSerpiente() {
  for (let i = 0; i < serpiente.length; i++) {
    if (i === 0) {
      // Cabeza
      pintarParte(serpiente[i].x, serpiente[i].y, "#00ffff"); 
    } else {
      // Cuerpo
      pintarParte(serpiente[i].x, serpiente[i].y, "#ff00ff"); 
    }
  }
}

function moverSerpiente() {
  if (direccionActual === "derecha") {
    moverDerecha();
  } else if (direccionActual === "izquierda") {
    moverIzquierda();
  } else if (direccionActual === "arriba") {
    moverArriba();
  } else if (direccionActual === "abajo") {
    moverAbajo();
  }
  
  atrapaComida();
  
  dibujarTodo();
}

function pintarParte(lineax, lineay, colorRelleno = "red") {
 
  const xReal = lineax * TAMANIO_CELDA; 
  const yReal = lineay * TAMANIO_CELDA;

 
  ctx.fillStyle = colorRelleno;
  ctx.fillRect(xReal, yReal, TAMANIO_CELDA, TAMANIO_CELDA);

  ctx.strokeStyle = "#00ff88";
  ctx.strokeRect(xReal, yReal, TAMANIO_CELDA, TAMANIO_CELDA);
}

function cambiarDireccion(direccion) {
  direccionActual = direccion;
}

function moverDerecha() {
  let cabezaActual = serpiente[0];
  
  let nuevaCabeza = { x: cabezaActual.x + 1, y: cabezaActual.y };
  
  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}


function moverIzquierda() {
  let cabezaActual = serpiente[0];
  let nuevaCabeza = { x: cabezaActual.x - 1, y: cabezaActual.y };
  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}

function moverArriba() {
  let cabezaActual = serpiente[0];
  let nuevaCabeza = { x: cabezaActual.x, y: cabezaActual.y - 1 };
  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}

function moverAbajo() {
  let cabezaActual = serpiente[0];
  let nuevaCabeza = { x: cabezaActual.x, y: cabezaActual.y + 1 };
  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}

//Comida

function generarComida() {
  let celdasX = canvas.width / TAMANIO_CELDA;
  let celdasY = canvas.height / TAMANIO_CELDA;

  comida.x = Math.floor(Math.random() * celdasX);
  comida.y = Math.floor(Math.random() * celdasY);
}

function pintarComida() {
  pintarParte(comida.x, comida.y, "#00ff00"); 
}

//Para la colision 

function atrapaComida() {
  let cabeza = serpiente[0];

  if (cabeza.x === comida.x && cabeza.y === comida.y) {
    puntaje++;
    document.getElementById("puntaje").innerText = puntaje; 

    let cola = serpiente[serpiente.length - 1];
    
    serpiente.push({ x: cola.x, y: cola.y });
    generarComida();
  }
}

function dibujarTodo() {
  limpiarCanvas();
  dibujarTablero();
  pintarComida();
  pintarSerpiente();
  
  
}

dibujarTodo();