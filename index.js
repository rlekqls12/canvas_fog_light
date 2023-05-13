window.addEventListener("DOMContentLoaded", initCanvas);

const CANVAS_SELECTORS = "#canvas";
const CANVAS_SIZE = { width: 500, height: 500 };
const TILE_SIZE = 50;

function initCanvas() {
  setCanvasSize(CANVAS_SELECTORS, CANVAS_SIZE.width, CANVAS_SIZE.height);

  renderLoop();
}

function renderLoop() {
  // --------------------------------------------------------------------- [ init ]
  clearCanvas(CANVAS_SELECTORS);
  const canvasContext = getCanvasContext(CANVAS_SELECTORS);
  const canvas = document.querySelector(CANVAS_SELECTORS);
  const mouseMatrix = adjustMouseMatrix(canvas.offsetLeft, canvas.offsetTop);

  // --------------------------------------------------------------------- [ draw tile ]
  canvasContext.strokeStyle = "black";
  canvasContext.fillStyle = "gray";
  canvasContext.lineWidth = 0.25;
  drawTile(
    CANVAS_SELECTORS,
    0,
    0,
    CANVAS_SIZE.width,
    CANVAS_SIZE.height,
    TILE_SIZE,
    TILE_SIZE
  );

  // --------------------------------------------------------------------- [ draw circle ]
  canvasContext.fillStyle = "green";
  canvasContext.beginPath();
  canvasContext.arc(250, 250, 30, 0, Math.PI * 2);
  canvasContext.fill();
  canvasContext.closePath();

  // --------------------------------------------------------------------- [ draw fog ]
  canvasContext.globalCompositeOperation = "darken";
  canvasContext.fillStyle = "black";
  drawFog(CANVAS_SELECTORS, 0, 0, CANVAS_SIZE.width, CANVAS_SIZE.height, 0.5);

  // --------------------------------------------------------------------- [ draw light ]
  canvasContext.globalCompositeOperation = "overlay";
  canvasContext.fillStyle = "white";
  canvasContext.beginPath();
  canvasContext.arc(mouseMatrix.x, mouseMatrix.y, 100, 0, Math.PI * 2);
  canvasContext.fill();
  canvasContext.closePath();
  canvasContext.globalCompositeOperation = "source-over";

  // --------------------------------------------------------------------- [ draw circle ]
  canvasContext.fillStyle = "green";
  canvasContext.beginPath();
  canvasContext.arc(200, 250, 30, 0, Math.PI * 2);
  canvasContext.fill();
  canvasContext.closePath();

  // --------------------------------------------------------------------- [ end draw frame ]
  increaseFrame();

  // --------------------------------------------------------------------- [ draw frame per second ]
  canvasContext.fillStyle = "white";
  canvasContext.font = "16px sans-serif";
  drawFramePerSeconds(CANVAS_SELECTORS, 0, 16);

  // --------------------------------------------------------------------- [ request next frame ]
  requestAnimationFrame(renderLoop);
}
