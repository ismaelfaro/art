let x = 8, y = 8;

let weights = [];

let originalPoem = [];
let poemGenerate = [];

let listOfWords = [];
let aux = [];

let originWord = "";
const originWordSize = 8;
let originWordNextPositionInY = originWordSize + 1;


let speed = 300

let startTime = Math.ceil((Date.now() / speed))


function preload() {
  originalPoem = loadStrings('poems/picasso_in_botswana.en.txt');
  poemGenerate = loadStrings('poems/picasso_in_botswana.en.AI.txt');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont('monospace', 8);
  textLeading(21);
  textAlign(LEFT);
  textStyle(NORMAL);
  background(0,0,0);
  fill(220);

  for (let i = 0; i < originalPoem.length ; i++){ 
    aux = originalPoem[i].split(" ");
    for (let j = 0; j < aux.length ; j++){
      if (!(aux[j] === "")){
        listOfWords.push(aux[j]);
      }
    }
  }
  
}


function draw() {
 

  printPoems()
  
}

function mouseClicked() {
 
}

   
function center_box(x,y, texto){
  fill("black")
  rect(windowWidth/2-100, windowHeight/2-50, 200, 100);
  noStroke();
  textAlign(CENTER, CENTER);
  fill(0, 102, 153);
  textSize(36)
  text(texto, x+100, y+50);
  noFill();
  stroke('white');
  strokeWeight(4);
  rect(x, y, 200, 100);


}


function backgroundText(originWord, originWordSize , x, y, font_color){
  noStroke();
  textAlign(LEFT);
  fill(font_color);
  textSize(originWordSize)
  text(originWord, x, y);

}


function poem(number){
 
  backTextSize = 3;

  word = listOfWords[number]
  center_box(windowWidth/2-100,windowHeight/2-50,word) ;
  iniText = ""


  for (let i = 0; i < number ; i++){
    iniText += listOfWords[i];
  }

  originWord = iniText+ " " +listOfWords[number];
  textSize(7);
  originWordNextPositionInY = number * backTextSize + backTextSize;
  backgroundText(originWord, backTextSize, 0 , originWordNextPositionInY, 'white');

  
  aux = poemGenerate[number];
  backgroundText(aux.slice(originWord.length), backTextSize, textWidth(originWord)+ 3,  originWordNextPositionInY, "red");
  
}

function printPoems(){
  
  line = (Math.ceil((Date.now() / speed)) - startTime) % poemGenerate.length

  poem(line)

}

function mousePressed() {
  if (mouseX > 0 && mouseX < windowWidth && mouseY > 0 && mouseY < windowHeight) {
    // let fs = fullscreen();
    fullscreen(true);
    startTime = Math.ceil((Date.now() / speed))
    background(0,0,0);  
  }
}