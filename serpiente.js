const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");

const TAMANIO_CELDA = 35;


let serpiente = [
  {x: 9, y: 7},
  {x: 9, y: 6},
  {x: 9, y: 5}
];


function limpiarCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
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

function pintarParte(lineax, lineay, colorRelleno = "red") {
 
  const xReal = lineax * TAMANIO_CELDA; 
  const yReal = lineay * TAMANIO_CELDA;

 
  ctx.fillStyle = colorRelleno;
  ctx.fillRect(xReal, yReal, TAMANIO_CELDA, TAMANIO_CELDA);

  ctx.strokeStyle = "#00ff88";
  ctx.strokeRect(xReal, yReal, TAMANIO_CELDA, TAMANIO_CELDA);
}

function dibujarTodo() {
  limpiarCanvas();
  dibujarTablero();
  pintarSerpiente();
  
  
}

dibujarTodo();