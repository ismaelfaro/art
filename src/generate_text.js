let poemGenerate=[]
let wordCounter=0
let speed = 100
let poemWords = []
let originalPoems=''
let startTime = Math.ceil((Date.now() / speed))
let word =""
let map = {}


function preload() {
  poemGenerate = loadStrings('poems/picasso_in_botswana.en.AI.txt');
}

function setup() {
  originalPoems=poemGenerate[poemGenerate.length-1]
  poemWords = originalPoems.split(" ")
  cnv=createCanvas(windowWidth, windowHeight)
  textAlign(CENTER, CENTER); textFont('monospace', 16); textStyle(BOLD)
  strokeWeight(2); fill(100)
  frameRate(30)
}

function draw() {
    wordCounter = (Math.ceil((Date.now() / speed)) - startTime) % poemGenerate.length

    background(0)
    printPoems(wordCounter)
    // printwords()
    
}

function printPoems(lastOne){
  textFont('monospace', 24); textStyle(BOLD)
  poemsToPrint = poemGenerate.slice(0, lastOne)
 
  let opacitysteps =  poemWords.length / wordCounter
  let opacity = opacitysteps
  // console.log(opacity)
  stroke(4)
  strokeWeight(4);
  poemsToPrint.forEach(element => {
    fill(255, opacity )
    text(element,0,32,windowWidth)
    opacity +=  opacitysteps
  });
}



function printwords(){

  textFont('monospace', 64);
  fill(255, 255, 255)
  text(poemWords[wordCounter],0,windowHeight,windowWidth)
  return poemWords[wordCounter]
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