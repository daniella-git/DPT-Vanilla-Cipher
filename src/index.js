

function printCipherText() {
  var userInput = document.getElementById("entrybox").value;
  var rotationNum = Number(document.getElementById("rotnum").value);
  document.getElementById("caeser").innerHTML = encrypt(userInput, rotationNum);
  document.getElementById("rot13").innerHTML = encrypt(userInput, rotationNum);
  document.getElementById("vigenere").innerHTML = encrypt(userInput, rotationNum)
}



function caeserCheckbox() {

    var userInput = document.getElementById("entrybox").value;
    var checkBox = document.getElementById("checkbox1");
    var rotationNum = Number(document.getElementById("rotnum").value);
    if (checkBox.checked == true) {
        document.getElementById("caeser").innerHTML = encrypt(userInput, rotationNum)
    }
    else { 
        document.getElementById("caeser").innerHTML = decrypt(userInput, rotationNum);
    }
}


function rot13Checkbox() {
    var userInput = document.getElementById("entrybox").value;
    var checkBox = document.getElementById("checkbox2");
    var rotationNum = 13
    if (checkBox.checked == true) {
        document.getElementById("rot13").innerHTML = encrypt(userInput, rotationNum)
    }
    else { 
        document.getElementById("rot13").innerHTML = decrypt(userInput, rotationNum);
    }
}

function vigenereCheckbox() {
    var userInput = document.getElementById("entrybox").value;
    var checkBox = document.getElementById("checkbox3");
    if (checkBox.checked == true) {
        document.getElementById("vigenere").innerHTML = encrypt(userInput, 1)
    }
    else { 
        document.getElementById("vigenere").innerHTML = decrypt(userInput, 1);
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


  function encrypt(textInput, shift) {  
    let cipherString = "";
    for (letter of textInput){
        if (alphabet.includes(letter.toUpperCase())){
            const position = alphabet.indexOf(letter.toUpperCase());
            const newPosition = (position + shift)%26;
            cipherString += alphabet[newPosition]
        }
        else cipherString += letter
    }
    return cipherString
}


function decrypt(textInput, shift) {  
    let cipherString = "";
    const n = 26
    for (letter of textInput){
        if (alphabet.includes(letter.toUpperCase())){
            const position = alphabet.indexOf(letter.toUpperCase());
            let newPosition = position - shift
            const newPositionWithShift = (newPosition % n + n)% n;
            cipherString += alphabet[newPositionWithShift]
        }
        else cipherString += letter
    }
    return cipherString
}
    

