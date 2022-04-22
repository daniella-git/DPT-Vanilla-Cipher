
function printCipherText() {
  var userInput = document.getElementById("entrybox").value;
    document.getElementById("caeser").innerHTML = userInput;
    document.getElementById("rot13").innerHTML = userInput
    document.getElementById("vigenere").innerHTML = userInput
}

const apiUrl = 'https://philosophy-quotes-api.glitch.me/quotes'

async function getApi(url) {
    const response = await fetch(url);
    const json = await response.json();
    return json  
}


function printPhilosopherQuotes(){
    const jsonPromise = getApi(apiUrl);
    jsonPromise.then((elements) => {
        let randomIndex = Math.floor(Math.random() * elements.length)
    var singleQuote = elements[randomIndex].quote + " " + elements[randomIndex].source;
    console.log(singleQuote)
    document.getElementById("quote").innerHTML = singleQuote;
        
    });

}

printPhilosopherQuotes()


  


