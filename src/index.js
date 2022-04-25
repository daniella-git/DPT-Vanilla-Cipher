

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
        document.getElementById("caeser").innerHTML = decrypt(userInput);
    }
}


function rot13Checkbox() {
    var userInput = document.getElementById("entrybox").value;
    var checkBox = document.getElementById("checkbox2");
    if (checkBox.checked == true) {
        document.getElementById("rot13").innerHTML = encrypt(userInput)
    }
    else { 
        document.getElementById("rot13").innerHTML = decrypt(userInput);
    }
}

function vigenereCheckbox() {
    var userInput = document.getElementById("entrybox").value;
    var checkBox = document.getElementById("checkbox3");
    if (checkBox.checked == true) {
        document.getElementById("vigenere").innerHTML = encrypt(userInput)
    }
    else { 
        document.getElementById("vigenere").innerHTML = decrypt(userInput);
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

function display_c(){
    var refresh=1000; 
    let mytime = setTimeout('display_ct()',refresh)
    }
  
    function display_ct() {
      var x = new Date()
      var x1 = x.getMonth() + 1+ "/" + x.getDate() + "/" + x.getFullYear(); 
      x1 = x1 + " - " +  x.getHours( )+ ":" +  x.getMinutes() + ":" +  x.getSeconds();
      document.getElementById('ct').innerHTML = x1;
      display_c();
   }



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


function decrypt(textInput) {  
    const shift = Number(document.getElementById("rotnum").value);
    let cipherString = "";
    const n = 26
    for (letter of textInput){
        if (alphabet.includes(letter.toUpperCase())){
            const position = alphabet.indexOf(letter.toUpperCase());
            let newPosition = position - shift
            const newPosition2 = (newPosition % n + n)% n;
            cipherString += alphabet[newPosition2]
        }
        else cipherString += letter
    }
    return cipherString
}
    

