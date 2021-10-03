let poem = 
`pa:
La Casa is rise on the feelings
you can see this like a journey
re:
we love when you feel inspired
welcome to our Secret Garden
###
pa:
`

let output = document.getElementById("poemoutput")
let input = document.getElementById("poeminput")
let spinner = document.getElementById("spinner")

function cleanPoem(poem){
    poem = poem.replace("PA:","").replace("RE:","").replace("pa:","").replace("re:","").replace("#","").replace("\n\n","\n")
    lines = poem.split("\n").slice(0, 8).join("\n");
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
    poemPluYou = poem + input.value + '\nre:\n'
    console.log(poemPluYou)
    FirstRequestToGraph('https://poems.asst.workers.dev',poemPluYou)
      .then(data => {
          toShow = data[0].generated_text
          output.innerText = cleanPoem(toShow.slice(poem.length, toShow.length))
          spinner.style.visibility = "hidden"
        console.log(toShow); // JSON data parsed by `data.json()` call
      });

}