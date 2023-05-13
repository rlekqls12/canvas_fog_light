/**
 * set canvas size
 * @param { string } selectors
 * @param { number } width
 * @param { number } height
 */
function setCanvasSize(selectors, width, height) {
  /** @type { HTMLCanvasElement } */
  const canvas = document.querySelector(selectors);
  canvas.width = width;
  canvas.height = height;
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
}

/**
 * get canvas context
 * @param { string } selectors
 * @returns { CanvasRenderingContext2D }
 */
function getCanvasContext(selectors) {
  /** @type { HTMLCanvasElement } */
  const canvas = document.querySelector(selectors);
  const canvasContext = canvas.getContext("2d");
  return canvasContext;
}

/**
 * clear canvas
 * @param { string } selectors
 * @param { object? } rect
 * @param { number } rect.dx
 * @param { number } rect.dy
 * @param { number } rect.dw
 * @param { number } rect.dh
 */
function clearCanvas(selectors, rect) {
  const canvasContext = getCanvasContext(selectors);

  if (Boolean(rect) === false) {
    /** @type { HTMLCanvasElement } */
    const canvas = document.querySelector(selectors);
    canvasContext.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
  } else {
    const { dx, dy, dw, dh } = rect;
    canvasContext.clearRect(dx, dy, dw, dh);
  }
}

/**
 * draw tile
 * @param { string } selectors
 * @param { number } x
 * @param { number } y
 * @param { number } width
 * @param { number } height
 * @param { number } tileWidth
 * @param { number } tileHeight
 */
function drawTile(selectors, x, y, width, height, tileWidth, tileHeight) {
  const canvasContext = getCanvasContext(selectors);

  const xCount = Math.floor((width - x) / tileWidth);
  const yCount = Math.floor((height - y) / tileHeight);

  let matrixX, matrixY;
  for (matrixX = 0; matrixX < xCount; matrixX++) {
    for (matrixY = 0; matrixY < yCount; matrixY++) {
      const tileX = x + tileWidth * matrixX;
      const tileY = y + tileHeight * matrixY;

      canvasContext.fillRect(tileX, tileY, tileWidth, tileHeight);
      canvasContext.strokeRect(tileX, tileY, tileWidth, tileHeight);
    }
  }
}

/**
 * draw fog
 * @param { string } selectors
 * @param { number } x
 * @param { number } y
 * @param { number } width
 * @param { number } height
 * @param { float } densityPercent
 */
function drawFog(selectors, x, y, width, height, densityPercent) {
  const canvasContext = getCanvasContext(selectors);

  const tempGlobalAlpha = canvasContext.globalAlpha;

  canvasContext.globalAlpha = densityPercent;
  canvasContext.fillRect(x, y, width, height);

  canvasContext.globalAlpha = tempGlobalAlpha;
}

/**
 * draw frame per second
 * @param { string } selectors
 * @param { number } x
 * @param { number } y
 */
function drawFramePerSeconds(selectors, x, y) {
  const frame = getFramePerSecond();

  const canvasContext = getCanvasContext(selectors);
  canvasContext.fillText(frame + "hz", x, y);
}
