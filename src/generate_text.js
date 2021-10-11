let poemGenerate=[]
let wordCounter=0
let speed = 100
let poemWords = []
let originalPoems=''
let startTime = Math.ceil((Date.now() / speed))
let word =""
let map = {}

let faceapi;
let video;
let detections;
let lastDetections;

const detection_options = {
    withLandmarks: true,
    withDescriptors: false,
  MODEL_URLS: {
    Mobilenetv1Model: 'https://raw.githubusercontent.com/ml5js/ml5-data-and-models/main/models/faceapi/ssd_mobilenetv1_model-weights_manifest.json',
  },
}

function preload() {
  poemGenerate = loadStrings('poems/picasso_in_botswana.en.AI.txt');
}

function setup() {
  originalPoems=poemGenerate[poemGenerate.length-1]
  poemWords = originalPoems.split(" ")
  cnv=createCanvas(windowWidth, windowHeight)
  textAlign(CENTER, CENTER); textFont('monospace', 16); textStyle(BOLD)
  strokeWeight(2); fill(100)

  video = createCapture(VIDEO);
  video.size(width, height);
  faceapi = ml5.faceApi(video, detection_options, modelReady)

  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide(); // Hide the video element, and just show the canvas

  frameRate(9)
}

function draw() {
    wordCounter = (Math.ceil((Date.now() / speed)) - startTime) % poemGenerate.length

    background(0)
    printPoems(wordCounter)
    // printwords()
    faceapi.detect(gotResults)
}

function modelReady() {
    // console.log('ready!')
    // console.log(faceapi)
    faceapi.detect(gotResults)

}

function gotResults(err, result) {
    if (err) {
        console.log(err)
        return
    }
    // console.log(result)
    detections = result;
    if (detections) {
        if (detections.length > 0) {
            // console.log(detections)
            drawLandmarks(detections)
            lastDetections = detections
        }else{
          drawLandmarks(lastDetections)
        }

    }else{
      drawLandmarks(lastDetections)
    }
    
}

function drawLandmarks(detections){
    noFill();
    stroke(161, 95, 251)
    strokeWeight(2)

    for(let i = 0; i < detections.length; i++){
        const mouth = detections[i].parts.mouth; 
        const nose = detections[i].parts.nose;
        const leftEye = detections[i].parts.leftEye;
        const rightEye = detections[i].parts.rightEye;
        const rightEyeBrow = detections[i].parts.rightEyeBrow;
        const leftEyeBrow = detections[i].parts.leftEyeBrow;

        drawPart(mouth, true);
        drawPart(nose, false);
        drawPart(leftEye, true);
        drawPart(leftEyeBrow, false);
        drawPart(rightEye, true);
        drawPart(rightEyeBrow, false);

    }

}

function drawPart(feature, closed){
    stroke(100)
    strokeWeight(4)
    beginShape();
    for(let i = 0; i < feature.length; i++){
        const x = feature[i]._x
        const y = feature[i]._y
        vertex(x, y)
    }
    
    if(closed === true){
        endShape(CLOSE);
    } else {
        endShape();
    }
    
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