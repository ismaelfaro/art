let inputString = parent.location.href;
let tagDiv;


function preload() {
 
}



function setup() {

  cnv=createCanvas(windowWidth, windowHeight)
  textAlign(CENTER, CENTER); textFont('monospace', 50); textStyle(BOLD)
  stroke(200,200,200,10);
  strokeWeight(2)
  fill(255)

  tagDiv = createDiv();
  // position it:
  tagDiv.position(30, 30);
  console.log(inputString);
  frameRate(13)
}


function draw() {

 text("Poesia + AI = ART",windowWidth/2, windowHeight/2)
 let qr = qrcode(0, 'L');
  qr.addData(inputString);
  qr.make();
  // create an image from it:
  // paaramtetrs are cell size, margin size, and alt tag
  // cell size default: 2
  // margin zize defaault: 4 * cell size
  let qrImg = qr.createImgTag(5, 20, "qr code");
  // put the image into the HTML div:
  tagDiv.html(qrImg);

}


function mousePressed() {
  if (mouseX > 0 && mouseX < windowWidth && mouseY > 0 && mouseY < windowHeight) {
    // let fs = fullscreen();
    fullscreen(true)
    background(0,0,0)
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}