function keyTyped() {
 
    console.log(key)
    switch(key) {
    case "1":
        window.location.href="vis1.html?poem=picasso_in_botswana.es"
        break;
    case "2":
        window.location.href="vis2.html?poem=inimitables.es"
        break;
    case "3":
        window.location.href="vis3.html?poem=new_worlds.ga"
        break;
    case "4":
        window.location.href="vis4.html?poem=metareality.es"
        break;
    case "5":
        window.location.href="vis5.html?poem=burn_after_selling.es"
        break;
    case "6":
        window.location.href="shot1.html"
        break;
    case "7":
        window.location.href="shot2.html"
        break;
    case "8":
        window.location.href="shot3.html"
        break;
    case "9":
        window.location.href="shot4.html"
        break;
    case "0":
        window.location.href="shot5.html"
        break;
    case "m":
        window.location.href="index.es.html"
        break;
    case "q":
        window.location.href="pause.html"
        break;
    default:
    
    }

}


function get_poem_name(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('poem')
}