let x = 8, y = 8;

let weights = [];

let poemGenerate = [];

function preload() {
  poemGenerate = loadStrings('poems/picasso_in_botswana.en.AI.txt');
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont('helvetica', 16);
  textLeading(21);
  textAlign(LEFT);
  background(50, 30, 40);
  fill(220);
  text(poemGenerate.join("\n"), x, y, 420, 420);
  // console.log(poemGenerate)
  sub_poems = poemGenerate.slice(0, 100)
  distances = calculateDistance(poemGenerate)
  // distances = [[0,0,2,1,2,2,3,1,1,1,1,0,0,1,-1,-4,-4]]

  drawTree(distances)

}


function draw() {

}

function mouseClicked() {
 
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

function generateBranch(toLine, xpos, ypos, width, height){
  branchPoints =  []
  lastPoint = 0
  point = [xpos, ypos]
  branchPoints.push(point)
  angle = 0
  toLine.forEach((element, index) => {
    
      // lastPoint = (index-toLine.length)
      // lastPoint = (index)
      // point = [xpos, ypos - index*4]
      
      // V2
      angle = (element+angle)
      lastPoint += (Math.atan(angle/Math.PI))*(toLine.length-index)

      point = [(lastPoint * width) + xpos, ypos-index*height]

      // // V1
      // lastPoint += element*width
      // point = [lastPoint + xpos, ypos -index*height ]

      branchPoints.push(point)
  })
  return branchPoints
}

function drawTree(poemdistances){

  xpos = windowWidth/2
  ypos = windowHeight
  
   // TODO: all the lines
  poemdistances.forEach((distances, index) =>{
    // branchPoints = generateBranch(distances, xpos, ypos, 5, 3.5)
    branchPoints = generateBranch(distances, xpos, ypos, 0.02, 3.6 ) // V2
    console.log(branchPoints)
    createLine(branchPoints,2*(250-index)/100) // V1
    // createCurve(branchPoints,1)

    
    
  })
  

}