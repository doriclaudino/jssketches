const boxSize = 20;
let angle = 0.0;
let offset = 0.0;
let maxD;
let spacer = 4;
let velocidaFoward = 0.05;
let maxDist = 500;

function setup() {
  createCanvas(405, 405);
  maxD = dist(0, 0, maxDist, maxDist);
}

function draw() {
  background(1);
  const step = boxSize + spacer;
  let flag = false;
  for (let x = 0; x < width; x += step) {
    for (let y = 0; y < height; y += step) {
      push();
      let d = dist(x, y, width / 2, height / 2);
      let offset = map(d, 0, maxD, -PI * 2, PI / 2);
      let a = angle + offset;
      let h = map(sin(a), -1, 1, 0, 50);
      rect(flag ? x + step : x, y, boxSize, boxSize, h);
      flag = !flag;
      pop();
    }
  }
  angle -= velocidaFoward;
}
