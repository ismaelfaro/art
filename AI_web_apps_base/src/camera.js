var myAsciiArt;
var asciiart_width = 120; var asciiart_height = 60;
var myCapture
var gfx;
var showOryginalImageFlag = false;
var ascii_arr;
var poemGenerate=[];
var wordCounter=0;
var next = true;
function initCaptureDevice() {
  try {
    myCapture = createCapture(VIDEO);
    myCapture.size(320, 240);
    myCapture.elt.setAttribute('playsinline', '');
    myCapture.hide();
    console.log(
      '[initCaptureDevice] capture ready. Resolution: ' +
      myCapture.width + ' ' + myCapture.height
    );
  } catch(_err) {
    console.log('[initCaptureDevice] capture error: ' + _err);
  }
}

function preload() {
  poemGenerate = loadStrings('poems/picasso_in_botswana.en.AI.txt');
  // poem = poemGenerate
  
}

function setup() {
  poemGenerate=poemGenerate[poemGenerate.length-1]
  createCanvas(windowWidth, windowHeight);
  initCaptureDevice(); 
  gfx = createGraphics(asciiart_width, asciiart_height);
  gfx.pixelDensity(1);
  myAsciiArt = new AsciiArt(this);
  // myAsciiArt.printWeightTable();
  textAlign(CENTER, CENTER); textFont('monospace', 8); textStyle(BOLD);textWrap(WORD);
  strokeWeight(2); fill(100);
  frameRate(15);
}


function draw() {
if(myCapture !== null && myCapture !== undefined) { 
    background(0);
    gfx.background(0);
    gfx.image(myCapture, 0, 0, gfx.width, gfx.height);
    gfx.filter(POSTERIZE, 4);
    ascii_arr = myAsciiArt.convert(gfx);
    textAlign(LEFT, CENTER); textFont('monospace', 12)
    fill(150);
    myAsciiArt.typeArray2d(ascii_arr, this);
    tint(255, 100);
    image(myCapture, 0, 0, width, height);
    /*
      Now it's time to show ASCII art on the screen. First, we set drawing
      parametrs. Next, we call the function typeArray2d() embedded in the
      ASCII Art library, that writes the contents of a two-dimensional array
      containing (implicitly) text characters (chars) on the screen. In this
      case, we call a function with 2 parameters: the first is the table
      whose contents we want to print, and the second is the destination (an
      object with "canvas" property). If you use the function with two
      parameters (as we do in this example), it will assume that you need to
      fill the entire surface of the target canvass with a drawing. However,
      the function can be called in 3 variants:
        [AsciiArt instance].typeArray2d(_arr2d, _dst);
        [AsciiArt instance].typeArray2d(_arr2d, _dst, _x, _y);
        [AsciiArt instance].typeArray2d(_arr2d, _dst, _x, _y, _w, _h);
      The parameters are as follows:
        _arr2d - 2-dimentional array containing glyphs (chars)
        _dst - destination (typically the sketch itself)
        _x, _y - coordinates of the upper left corner
        _w, _h - width and height
      It is relatively easy to write your own function that formats the contents
      of an array to ASCII graphics. At the end of this example, I glue the
      function code from a non-minimized version of the library - it can be
      used as a base for your own experiments.
    */
      printPoem(1.5)
  }
  else {
    background(255, 0, 0);
  }
}

function mouseClicked() {
 
}
   
function printPoem(time){

  step = int((Date.now() / 1000) % time);

  if (step==0 & next==true){
    wordCounter = (wordCounter+1) % poemGenerate.length;
    next=false;
  }else{
    next=true
  }

  textAlign(LEFT, CENTER); textFont('monospace', 32); textStyle(BOLD);
  thetext = poemGenerate.split(" ").splice(0,wordCounter).join(" ")
  fill(255, 255, 255);
  text(thetext,32,64,windowWidth-32);
  // console.log(thetext)
  
}













function createLine(points, strokeLevel){
  noFill();
  stroke(255, 255, 255);
  strokeWeight(strokeLevel);
  beginShape();
  for(point in points){
    vertex(points[point][0],points[point][1]);
  }

  endShape();
}

function createCurve(points, strokeLevel){
  noFill();
  stroke(255, 255, 255);
  strokeWeight(strokeLevel);
  beginShape();
  curveVertex(points[0][0],points[0][1]);
  for(point in points){
    curveVertex(points[point][0],points[point][1]);
  }
  curveVertex(points[points.length-1][0],points[points.length-1][1]);
  endShape();
}

function calculateWeights(poems){
  let poemsWeights = []

  poems.forEach(element => {
    words_lenght = []
    element.split(" ").forEach(word => {
      words_lenght.push(word.length)
    });
    poemsWeights.push(words_lenght)
  });

  return poemsWeights
}

function calculateDistance(poems){
  poemdistances = []
  poemsWeights = calculateWeights(poems)

  original = poemsWeights[poemsWeights.length-1]

  poemsWeights.forEach(line =>{
    
    for(word in line){
      line[word]=line[word] - original[word]
    }
    poemdistances.push(line)
  })

  // console.log(poemdistances)
  return poemdistances
}
