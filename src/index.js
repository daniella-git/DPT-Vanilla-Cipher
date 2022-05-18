function printCipherText() {
  var userInput = document.getElementById("entrybox").value;
  var rotationNum = Number(document.getElementById("rotnum").value);
  var userKeyword = document.getElementById("keyword").value;
  document.getElementById("caeser").innerHTML = encryptString(userInput, rotationNum);
  document.getElementById("rot13").innerHTML = encryptString(userInput, 13);
  document.getElementById("vigenere").innerHTML = encryptVigenere(userInput, userKeyword)
}

function caeserCheckbox() {

    var userInput = document.getElementById("entrybox").value;
    var checkBox = document.getElementById("checkbox1");
    var rotationNum = Number(document.getElementById("rotnum").value);
    if ( !checkBox.checked) {
        document.getElementById("caeser").innerHTML = encryptString(userInput, rotationNum);
    }
    else { 
        document.getElementById("caeser").innerHTML = decryptString(userInput, rotationNum);
    }
}

function rot13Checkbox() {
    var userInput = document.getElementById("entrybox").value;
    var checkBox = document.getElementById("checkbox2");
    var rotationNum = 13
    if ( !checkBox.checked) {
        document.getElementById("rot13").innerHTML = encryptString(userInput, rotationNum);
    }
    else { 
        document.getElementById("rot13").innerHTML = decryptString(userInput, rotationNum);
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
    var todayDate = today.getDate().toString().padStart(2, '0') + "/" + 
    (today.getMonth() + 1).toString().padStart(2, '0') + "/" + 
    today.getFullYear(); 
    var displayedTodayDate = todayDate + " - " +  
    today.getHours().toString().padStart(2, '0') + ":" +  
    today.getMinutes().toString().padStart(2, '0') + ":" +  
    today.getSeconds().toString().padStart(2, '0');
    document.getElementById('ct').innerHTML = displayedTodayDate;
    refreshTime();
}

function onPageLoad() {
displayCurrentDate();
printPhilosopherQuotes();
}

function encryptString(textInput, shift) {
    let cipherString = "";
    for (let letter of textInput){
       const cipheredLetter = encrypt(letter, shift)
       cipherString += cipheredLetter
    }
    return cipherString
}

function decryptString(textInput, shift) {
    let cipherString = "";
    for (let letter of textInput){
       const cipheredLetter = decrypt(letter, shift)
       cipherString += cipheredLetter
    }
    return cipherString
}

const alphabet = [
    'A','B','C','D','E','F',
    'G','H','I','J','K','L',
    'M','N','O','P','Q','R',
    'S','T','U','V','W','X',
    'Y','Z'
  ];

  function encrypt(letter, shift) {  
    let cipherString = "";
    if (alphabet.includes(letter.toUpperCase())){
        const position = alphabet.indexOf(letter.toUpperCase());
        const newPosition = (position + shift)%26;
        cipherString += alphabet[newPosition]
    }
    else cipherString += letter
    return cipherString
}

function decrypt(letter, shift) {  
    let cipherString = "";
    const n = 26
    if (alphabet.includes(letter.toUpperCase())){
            const position = alphabet.indexOf(letter.toUpperCase());
            let newPosition = position - shift
            const newPositionWithShift = (newPosition % n + n)% n;
            cipherString += alphabet[newPositionWithShift]
    }
    else cipherString += letter
    return cipherString
}

function encryptVigenere(textInput, keyword) {  
    let cipherString = "";
    for (let[index, letter] of Object.entries(textInput)){
        if (alphabet.includes(letter.toUpperCase())){
            var keywordShiftNumber = alphabet.indexOf(keyword[index % keyword.length].toUpperCase());
            var encryptedLetter = encrypt(letter.toUpperCase(), keywordShiftNumber)
            cipherString += encryptedLetter
        }
        else cipherString += letter
    }
    return cipherString
}

function decryptVigenere(textInput, keyword) {  
    let cipherString = "";
    for (let[index, letter] of Object.entries(textInput)){
        if (alphabet.includes(letter.toUpperCase())){
            var keywordShiftNumber = alphabet.indexOf(keyword[index % keyword.length].toUpperCase());
            var decryptedLetter = decrypt(letter.toUpperCase(), keywordShiftNumber)
            cipherString += decryptedLetter
        }
        else cipherString += letter
    }
    return cipherString
}
