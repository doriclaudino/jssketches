let colors = {
    purple: "#5A18C9",
    orange: "#FC7307",
    green: "#98CA32",
    brown: "#341C09",
    strangeOrange: "#FE2712",
    mustard: "#F3A914",
    niceRed: "#E34C43"
  },
  rotationSpeedSlider,
  rotationSpeedP,
  containerId = 'flex-container',
  container,
  rotationSpeedSliderPanel = 0,
  rotationSpeedPPanel = 0,
  initialRotations = [0, 60, 120, 180, 240, 300],
  starRotation = 0,
  panelRotation = 0,
  size = 0,
  color1 = colors.mustard,
  color2 = colors.brown,
  color3 = colors.niceRed,
  colorPicker1,
  colorPicker2,
  colorPicker3,
  speed1,
  speed2;

function setup() {
  createCanvas(720, 720);

  frameRate(60)
  angleMode(DEGREES);

  container = createDiv();
  container.attribute('id', containerId);
  container.class('flex-container');

  colorPicker2 = createColorPicker(color2);
  colorPicker1 = createColorPicker(color1);
  colorPicker3 = createColorPicker(color3);

  /** should be relative from frameRate?*/
  rotationSpeedSlider = createSlider(-1, 1, 0.5, 0.0001);
  rotationSpeedSlider.class('fourtyPercent');
  rotationSpeedP = createP(`${rotationSpeedSlider.value()} rotation speed`)
  rotationSpeedSlider.parent(container);
  rotationSpeedP.parent(container);


  rotationSpeedSliderPanel = createSlider(-1, 1, 0, 0.0001);
  rotationSpeedSliderPanel.class('fourtyPercent');
  rotationSpeedPPanel = createP(`${rotationSpeedSliderPanel.value()} rotation speed`)
  rotationSpeedSliderPanel.parent(container);
  rotationSpeedPPanel.parent(container);


}

const getSpeedStats = (value) => `${value}speed ${toFrameRate(value,2)}°/frame  ${toSeconds(value,2)}°/s`
const toSeconds = (value, decimals) => decimals ? (toFrameRate(value) * 60).toFixed(decimals) : toFrameRate(value) * 60
const toFrameRate = (value, decimals) => decimals ? (value / getFrameRate()).toFixed(decimals) : value / getFrameRate()


function draw() {

  /** update colors */
  color1 = colorPicker1.value()
  color2 = colorPicker2.value()
  color3 = colorPicker3.value()

  speed1 = rotationSpeedSlider.value()
  speed2 = rotationSpeedSliderPanel.value()

  /** resize panels on background twices bigger than canvas */
  size = height * 2

  /** update texts */
  rotationSpeedP.elt.innerText = getSpeedStats(speed1)
  rotationSpeedPPanel.elt.innerText = getSpeedStats(speed2)

  /** move everything on center of our canva */
  translate(width / 2, height / 2);

  /** create a square to keep rotate kinda background */
  backgroundSquare(size, panelRotation, color1);

  /** add our left/right panels*/
  leftPanel(size, panelRotation, color3);
  rightPanel(size, panelRotation, color2);


  /** diamonds on center */
  diamond(60, 60, color3, initialRotations[0] + starRotation);
  diamond(60, 60, color2, initialRotations[1] + starRotation);
  diamond(60, 60, color1, initialRotations[2] + starRotation);
  diamond(60, 60, color3, initialRotations[3] + starRotation);
  diamond(60, 60, color2, initialRotations[4] + starRotation);
  diamond(60, 60, color1, initialRotations[5] + starRotation);

  /** update speed every frame */
  starRotation += speed1;
  panelRotation += speed2;
}

const backgroundSquare = (size, rotation, color = colors.purple) => {
  push();
  rectMode(CENTER);
  rotate(rotation);
  fill(color);
  noStroke();
  rect(0, 0, size, size);
  pop();
};

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

const rightPanel = (size, rotation = 0, color = colors.green) => {
  panel(size, color, rotation, true);
};

const leftPanel = (size, rotation = 0, color = colors.orange) => {
  panel(size, color, rotation);
};

const panel = (size, color, rotation, flip = false) => {
  let altura = tangHeight(size / 2);
  push();
  rotate(rotation);
  fill(color);
  noStroke();
  quad(
    0,
    0,

    0,
    size / 2,

    flip ? size / 2 : size / -2,
    size / 2,

    flip ? size / 2 : size / -2,
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