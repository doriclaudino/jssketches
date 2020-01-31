let colors = {
  purple: "#5A18C9",
  orange: "#FC7307",
  green: "#98CA32",
  brown: "#341C09",
  strangeOrange: "#FE2712",
  mustard: "#F3A914",
  niceRed: "#E34C43"
};

let isRecording = false;

function setup() {
  createCanvas(1080, 1080);
  background(colors.mustard);
  //noLoop();
  angleMode(DEGREES);
}

let initialRotations = [0, 60, 120, 180, 240, 300],
  starRotation = 0,
  panelRotation = 0,
  startvel = 0.2;

function draw() {
  if (starRotation === 0 && !isRecording) {
    btn.click();
    isRecording = true;
  }
  if (starRotation >= 180 && isRecording) {
    btn.click();
    noLoop();
  }
  translate(width / 2, height / 2);
  leftPanel(panelRotation, colors.niceRed);
  topPanelLeft(panelRotation, colors.mustard);
  topPanelRight(panelRotation, colors.mustard);
  rightPanel(panelRotation, colors.brown);
  diamond(60, 60, colors.niceRed, initialRotations[0] + starRotation);
  diamond(60, 60, colors.brown, initialRotations[1] + starRotation);
  diamond(60, 60, colors.mustard, initialRotations[2] + starRotation);
  diamond(60, 60, colors.niceRed, initialRotations[3] + starRotation);
  diamond(60, 60, colors.brown, initialRotations[4] + starRotation);
  diamond(60, 60, colors.mustard, initialRotations[5] + starRotation);
  starRotation += startvel;
  //panelRotation -= 0.1;
}

const diamond = (angle, base, color, rotation) => {
  push();
  noStroke();
  fill(color);
  rotate(rotation);
  quad(
    0,
    0,
    0,
    base * 2,
    tangHeight(base, angle),
    base * 3,
    tangHeight(base, angle),
    base
  );
  pop();
};

const rightPanel = (rotation = 0, color = colors.green) => {
  panel(color, rotation, true);
};

const leftPanel = (rotation = 0, color = colors.orange) => {
  panel(color, rotation);
};

const panel = (color, rotation, flip = false) => {
  let altura = tangHeight();
  push();
  rotate(rotation);
  fill(color);
  noStroke();
  quad(
    0,
    0,
    0,
    height / 2,
    flip ? height / 2 : height / -2,
    height / 2,
    flip ? height / 2 : height / -2,
    -altura
  );
  pop();
};

const tangHeight = (base = height / 2, angle = 30) => {
  let rad = radians(angle);
  let tan = Math.tan(rad);
  let altura = tan * base;
  return altura;
};

const topPanelLeft = (rotation = 0, color = colors.purple) => {
  push();
  fill(color);
  rotate(rotation);
  noStroke();
  quad(
    0,
    0,
    height / -2,
    -tangHeight(),
    height / -2,
    height / -2,
    0,
    height / -2
  );
  pop();
};

const topPanelRight = (rotation = 0, color = colors.purple) => {
  push();
  rotate(rotation);
  fill(color);
  noStroke();
  quad(0, 0, 0, height / -2, height, height / -2, height, -tangHeight());
  pop();
};