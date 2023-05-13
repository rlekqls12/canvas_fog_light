const MOUSE = { x: 0, y: 0 };

window.addEventListener("mousemove", function (event) {
  MOUSE.x = event.clientX;
  MOUSE.y = event.clientY;
});

function adjustMouseMatrix(adjustX, adjustY) {
  const adjustMouse = { ...MOUSE };
  adjustMouse.x -= adjustX;
  adjustMouse.y -= adjustY;

  return adjustMouse;
}
