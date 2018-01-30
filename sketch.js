let joe = [];
let counter = 0;
let joeNum = 1;
let newCanv = 500;

function setup() {
  createCanvas(600, 600);
  for (let i = 0; i < joeNum; i++){
    joe[i] = new walker();
  }
  background(255);
}

function draw() {

  for (let i = 0; i < joe.length; i++){
    joe[i].step();
  }



  let coordsX = joe[counter].sendCoordX();
  let coordsY = joe[counter].sendCoordY();

  // push();
  translate(width / 2, height / 2);

  // translate(width / 2 - coordsX, height / 2 - coordsY);

  for (let i = 0; i < joe.length; i++){
    joe[i].render();
  }
  // noStroke();
  // fill(0);
  stroke(0);
  strokeWeight(1);
  noFill();
  rect(-newCanv / 2, -newCanv / 2, newCanv, newCanv);

  // pop();
  // translate(0,0);

}
function mousePressed(){
  joe.push(new walker());
}

class walker {
	constructor() {
    this.tail = 1;
    this.x = [random(newCanv) - newCanv / 2];
    this.y = [random(newCanv) - newCanv / 2];

    for (let i = 0; i < this.tail; i++){
      this.x[i] = this.x[0];
      this.y[i] = this.y[0];
    }

    // let RGBs = [0, 180, 200, 220, 240, 255];
    this.col = [random(0, 255)];
    this.col[1] = random(this.col[0], 255);
    this.col[2] = 500 - this.col[1] - this.col[0];

		this.direction = random(2 * PI);
    this.range = random(PI/4);

    this.rad = [random(5, 20)];
		this.velo = 25 / this.rad[0];

    for (let i = 0; i < this.tail; i++){
      this.rad[i+1] = this.rad[i] - (this.rad[0] / this.tail) ;
    }
	}

	render() {
    // noStroke();


    for (let i = this.x.length - 1; i >= 0; i--){
      stroke(0);
      strokeWeight(1);
      fill(this.col[0] += random(-1,1), this.col[1] += random(-1,1), this.col[2] += random(-1,1)); //, (this.x.length - i) * (255/this.x.length))
      ellipse(this.x[i], this.y[i], this.rad[i], this.rad[i]);
      ellipse(this.x[i] + newCanv, this.y[i], this.rad[i], this.rad[i]);
      ellipse(this.x[i] - newCanv, this.y[i], this.rad[i], this.rad[i]);
      ellipse(this.x[i], this.y[i] + newCanv, this.rad[i], this.rad[i]);
      ellipse(this.x[i], this.y[i] - newCanv, this.rad[i], this.rad[i]);
      // point(this.x[i], this.y[i]);
    }
	}

	step() {
		let rSpeed = random(0.5,2.5);
		this.direction += random(-this.range, this.range);

    this.rad[0] += random(-1, 1);

    for (let i = this.x.length - 1; i > 0; i--){
      this.x[i] = this.x[i-1];
      this.y[i] = this.y[i-1];
    }

		this.x[0] += sin(this.direction) * (this.velo * rSpeed);
		this.y[0] += cos(this.direction) * (this.velo * rSpeed);

    if (this.x[0] >= newCanv / 2) {
      this.x[0] -= newCanv;
    }
    if (this.x[0] < -newCanv / 2) {
      this.x[0] += newCanv;
    }

    if (this.y[0] >= newCanv / 2) {
      this.y[0] -= newCanv;
    }
    if (this.y[0] < -newCanv / 2) {
      this.y[0] += newCanv;
    }
	}

  sendCoordX() {
    return(this.x[0]);
  }

  sendCoordY() {
    return(this.y[0]);
  }

}
