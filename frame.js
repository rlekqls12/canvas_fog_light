let frames = [];
function getFramePerSecond() {
  frames = frames.filter((frame) => performance.now() - frame < 1000);
  return frames.length;
}

function increaseFrame() {
  frames.push(performance.now());
}
