let poem = ''

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: "AIzaSyCibkQ4NCKfrTcfJz-1Cb1SgIBopsmJRpg",
  authDomain: "poesiaai.firebaseapp.com",
  projectId: "poesiaai",
});

var db = firebase.firestore();


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
          
          db.collection("poemas").add({
            poem: toShow,
            title: input.value,
            language: browserLanguage.split("-")[0]
            })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });

          spinner.style.visibility = "hidden"
        console.log(toShow); // JSON data parsed by `data.json()` call
      });

}

function generate(element){
  if(event.key === 'Enter') {
    generatePoem()    
  }
}

generatePoem()