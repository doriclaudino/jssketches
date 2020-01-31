const colors = {
  purple: "#5A18C9",
  orange: "#FC7307",
  green: "#98CA32",
  brown: "#341C09",
  strangeOrange: "#FE2712",
  mustard: "#F3A914",
  niceRed: "#E34C43"
};

let isRecording = false;
let slider;

function setup() {
  createCanvas(1080, 1080);
  background(colors.mustard);
  angleMode(DEGREES);
  slider = createSlider(-360 / 50, 360 / 50, 360 / 100, 360 / 100);
}

let initialRotations = [0, 60, 120, 180, 240, 300],
  starRotation = 0,
  panelRotation = 0,
  startvel = 0.2;

function draw() {
  let val = slider.value();
  translate(width / 2, height / 2);
  diamond(60, 60, colors.niceRed, initialRotations[0] + starRotation);
  diamond(60, 60, colors.brown, initialRotations[1] + starRotation);
  diamond(60, 60, colors.mustard, initialRotations[2] + starRotation);
  diamond(60, 60, colors.niceRed, initialRotations[3] + starRotation);
  diamond(60, 60, colors.brown, initialRotations[4] + starRotation);
  diamond(60, 60, colors.mustard, initialRotations[5] + starRotation);
  starRotation += val;
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
const tangHeight = (base = height / 2, angle = 30) => {
  let rad = radians(angle);
  let tan = Math.tan(rad);
  let altura = tan * base;
  return altura;
};