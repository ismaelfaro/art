let poem = ''
// `pa:
// La Casa is rise on the feelings
// you can see this like a journey
// re:
// we love when you feel inspired
// welcome to our Secret Garden
// ###
// pa:
// `

let output = document.getElementById("poemoutput")
let input = document.getElementById("poeminput")
let spinner = document.getElementById("spinner")

function cleanPoem(poem){
    console.log(poem)
    // poem = poem.replace("PA:","").replace("RE:","").replace("pa:","").replace("re:","").replace("#","").replace("\n\n","\n").replace(",",",\n").replace(".",".\n").replace("\\","\n")
    // poem = poem.replace("re:","").replace("\N","\n").replace("\\n","\n").replace(",","\n").replace(".","\n")
    // poem = poem.replace("\\","\n").replace('\"','\n').replace(' \'','\n')

   
    poem = poem.replace("re:","")
    poem = poem.replace("\N","\n")
    poem = poem.replace("\\n","\n")
    poem = poem.replace(",","\n")
    poem = poem.replace(".","\n")
    poem = poem.replace(";","\n")
    poem = poem.replace("\\","\n")
    poem = poem.replace(/\\\//g, '\n')
    // poem = poem.replace( \,'\n')
    poem = poem.split(",").join(",\n")
    poem = poem.split(".").join(".\n")
    poem = poem.split("\/").join("\n")
    poem = poem.replace(/\\\//g, '\n')
    poem = poem.replace(/\\/g, '\n')
    console.log("---",poem)
    lines = poem.split("\n").slice(0, 10).join("\n")
    return lines
}

function FirstRequestToGraph(url, data) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain'
          },
          body: data 
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        return json
    })
    .catch(function(err) {
        console.log(`Error: ${err}`)
    });
}


function generatePoem(){
    spinner.style.visibility = "visible"
    poemPluYou = poem + input.value 
    console.log(poemPluYou)
    let urlAPI = "https://poems.asst.workers.dev"
    var browserLanguage = navigator.language
    if (browserLanguage.split("-")[0] == "es"){
        urlAPI = urlAPI + '/?language=es'
      } else {
        urlAPI = urlAPI + '/?language=en'
      }

    FirstRequestToGraph(urlAPI,poemPluYou)
      .then(data => {
          toShow = data[0].generated_text
          output.innerText = cleanPoem(toShow.slice(poem.length, toShow.length))
          spinner.style.visibility = "hidden"
        console.log(toShow); // JSON data parsed by `data.json()` call
      });

}

function generate(element){
  if(event.key === 'Enter') {
    generatePoem()    
  }
}