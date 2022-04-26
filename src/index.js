function printCipherText() {
  var userInput = document.getElementById("entrybox").value;
  var rotationNum = Number(document.getElementById("rotnum").value);
  var userKeyword = document.getElementById("keyword").value;
  document.getElementById("caeser").innerHTML = encrypt(userInput, rotationNum);
  document.getElementById("rot13").innerHTML = encrypt(userInput, 13);
  document.getElementById("vigenere").innerHTML = encryptVigenere(userInput, userKeyword)
}

function caeserCheckbox() {

    var userInput = document.getElementById("entrybox").value;
    var checkBox = document.getElementById("checkbox1");
    var rotationNum = Number(document.getElementById("rotnum").value);
    if ( !checkBox.checked) {
        document.getElementById("caeser").innerHTML = encrypt(userInput, rotationNum);
    }
    else { 
        document.getElementById("caeser").innerHTML = decrypt(userInput, rotationNum);
    }
}

function rot13Checkbox() {
    var userInput = document.getElementById("entrybox").value;
    var checkBox = document.getElementById("checkbox2");
    var rotationNum = 13
    if ( !checkBox.checked) {
        document.getElementById("rot13").innerHTML = encrypt(userInput, rotationNum);
    }
    else { 
        document.getElementById("rot13").innerHTML = decrypt(userInput, rotationNum);
    }
}

function vigenereCheckbox() {
    var userInput = document.getElementById("entrybox").value;
    var checkBox = document.getElementById("checkbox3");
    var userKeyword = document.getElementById("keyword").value;
    if ( !checkBox.checked) {
        document.getElementById("vigenere").innerHTML = encryptVigenere(userInput, userKeyword);
    }
    else { 
        document.getElementById("vigenere").innerHTML = decryptVigenere(userInput, userKeyword);
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
    var singleQuote = elements[randomIndex].quote;
    var singleSource = elements[randomIndex].source;
    document.getElementById("quote").innerHTML = singleQuote;
    document.getElementById("source").innerHTML = singleSource;
    });
}

function refreshTime(){
    var refresh = 1000; 
    let mytime = setTimeout('displayCurrentDate()',refresh)
}
  
function displayCurrentDate() {
    var today = new Date()
    var todayDate = today.getDate().toString().padStart(2, '0') + "/" + (today.getMonth() + 1).toString().padStart(2, '0') + "/" + today.getFullYear(); 
    displayedTodayDate = todayDate + " - " +  today.getHours()+ ":" +  today.getMinutes() + ":" +  today.getSeconds();
    document.getElementById('ct').innerHTML = displayedTodayDate;
    refreshTime();
}

function onPageLoad() {
displayCurrentDate();
printPhilosopherQuotes();
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
    


function encryptVigenere(textInput, keyword) {  
    let cipherString = "";
    const n = 26
    for (let[index, letter] of Object.entries(textInput)){
        if (alphabet.includes(letter.toUpperCase())){
            var messageLetterPosition = alphabet.indexOf(letter.toUpperCase());
            var keyLetterIndex = alphabet.indexOf(keyword[index % keyword.length].toUpperCase());
            let index1 = (messageLetterPosition + keyLetterIndex) % n
            cipherString += alphabet[index1]
        }
        else cipherString += letter
    }
    return cipherString
}

function decryptVigenere(textInput, keyword) {  
    let cipherString = "";
    const n = 26
    for (let[index, letter] of Object.entries(textInput)){
        if (alphabet.includes(letter.toUpperCase())){
            var messageLetterPosition = alphabet.indexOf(letter.toUpperCase());
            var keyLetterIndex = alphabet.indexOf(keyword[index % keyword.length].toUpperCase());
            let newIndex = (messageLetterPosition - keyLetterIndex + n) % n
            cipherString += alphabet[newIndex]
        }
        else cipherString += letter
    }
    return cipherString
}