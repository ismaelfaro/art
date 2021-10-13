let inputString = parent.location.href;
let tagDiv;


function preload() {
    background = loadImage('images/p1.jpg');
  
}



function setup() {

  cnv=createCanvas(windowWidth, windowHeight)
 
  background.resize(windowWidth,windowHeight)
  
  image(background, 0, 0);
}


function draw() {

  image(background,windowWidth, windowHeight);

}

