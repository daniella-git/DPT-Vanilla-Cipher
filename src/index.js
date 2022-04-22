

function printCipherText() {
  var userInput = document.getElementById("entrybox").value;
    document.getElementById("caeser").innerHTML = encrypt(userInput);
    document.getElementById("rot13").innerHTML = encrypt(userInput);
    document.getElementById("vigenere").innerHTML = encrypt(userInput)
}





function caeserCheckbox() {

    var userInput = document.getElementById("entrybox").value;
    var checkBox = document.getElementById("checkbox1");
    if (checkBox.checked == true) {
        document.getElementById("caeser").innerHTML = encrypt(userInput)
    }
    else { 
        document.getElementById("caeser").innerHTML = userInput;
    }
}


function rot13Checkbox() {
    var userInput = document.getElementById("entrybox").value;
    var checkBox = document.getElementById("checkbox2");
    if (checkBox.checked == true) {
        document.getElementById("rot13").innerHTML = encrypt(userInput)
    }
    else { 
        document.getElementById("rot13").innerHTML = userInput;
    }
}

function vigenereCheckbox() {
    var userInput = document.getElementById("entrybox").value;
    var checkBox = document.getElementById("checkbox3");
    if (checkBox.checked == true) {
        document.getElementById("vigenere").innerHTML = encrypt(userInput)
    }
    else { 
        document.getElementById("vigenere").innerHTML = userInput;
    }
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
    document.getElementById("quote").innerHTML = singleQuote;
        
    });

}

printPhilosopherQuotes();



const alphabet = [
    'A','B','C','D','E','F',
    'G','H','I','J','K','L',
    'M','N','O','P','Q','R',
    'S','T','U','V','W','X',
    'Y','Z'
  ];


  function encrypt(items) {  
    const shift = Number(document.getElementById("rotnum").value);
    let cipherString = "";
    for (item of items){
        if (alphabet.includes(item.toUpperCase())){
            const position = alphabet.indexOf(item.toUpperCase());
            const newPosition = (position + shift)%26;
            cipherString += alphabet[newPosition]
        }
        else cipherString += item
    }
    return cipherString
}
    