const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");

const TAMANIO_CELDA = 35;



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

function pintarParte(lineax, lineay, colorRelleno = "red") {
 
  const xReal = lineax * TAMANIO_CELDA; 
  const yReal = lineay * TAMANIO_CELDA;

 
  ctx.fillStyle = colorRelleno;
  ctx.fillRect(xReal, yReal, TAMANIO_CELDA, TAMANIO_CELDA);

  ctx.strokeStyle = "green"; 
  ctx.strokeRect(xReal, yReal, TAMANIO_CELDA, TAMANIO_CELDA);
}

function dibujarTodo() {
  limpiarCanvas();
  dibujarTablero();
  
  pintarParte(5,5);
  pintarParte(10,2);
  pintarParte(8,16);
  pintarParte(16,8);
  pintarParte(0,8);
  pintarParte(16,16);
}

dibujarTodo();