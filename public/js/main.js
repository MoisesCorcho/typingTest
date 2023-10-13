// Obtenemos el ID del campo de entrada
var userInputField = document.getElementById('userInputID');

// Obtenemos el ID del formulario
var formField = document.getElementById('typingForm');

// Game variables
const textito = "typing test";

var index = 0;
var insult = 'ESCRIBE BIEN NOJODA.';
var toInsult = false;
var error = false;

// Monitoreamos el evento INPUT en el campo de entrada para verificar cada modificacion de su valor.
userInputField.addEventListener('input', function()
{    
    // Obtenemos el valor del campo de entrada
    var userInputRecieved = userInputField.value;

    var tempIndex = 0

    // Obtenemos el ultimo indice en donde se escribio bien.
    while (tempIndex < userInputRecieved.length && tempIndex < textito.length) {
        // Si no concuerda rompemos ciclo.
        if ( userInputRecieved[tempIndex] !== textito[tempIndex]) {
            break;
        }
        tempIndex++
    }

    var elem = document.querySelector('#tytest');

    // Si tempIndex < 0 significa que no se ha escrito nada bien.
    if (tempIndex < 1 && userInputRecieved.length >= textito.length) {
        elem.innerHTML = '<span style="color: red;">' + textito + '</span>'
    }

    // Se han escrito algunas cosas bien, luego mal
    if (tempIndex > 0 && tempIndex != textito.length) {
        elem.innerHTML = 
            '<span style="color: green;">' + textito.slice(0, tempIndex) + '</span>' +
            '<span style="color: red;">' + textito.slice(tempIndex, userInputRecieved.length) + '</span>' +
            textito.slice(userInputRecieved.length, textito.length)
    }

    // Se han escrito algunas cosas mal (Pero no todo el texto a llenar)
    if (tempIndex < 1 && userInputRecieved.length < textito.length) {
        elem.innerHTML =
            '<span style="color: red;">' + textito.slice(tempIndex, userInputRecieved.length) + '</span>' +
            textito.slice(userInputRecieved.length, textito.length)
    }

    // Si todo esta bien
    if (tempIndex == textito.length) {
        elem.innerHTML =
        '<span style="color: green;">' + textito + '</span>' 
    }

    elem.style.whiteSpace = 'pre-wrap';

    // ========================================================================================================================

    if (userInputRecieved.slice(-1) === textito[index] && userInputRecieved.length <= [...textito].slice(0, index+1).length) {
        error = false;
        toInsult = false;
        index++;
    }
    else {
        error = true;
        toInsult = true;
    }

    if (toInsult) {
        document.getElementById('insultme').innerHTML = insult;
    }else {
        document.getElementById('insultme').innerHTML = '';
    }

    if (textito.length === userInputRecieved.length && !error) {
        document.getElementById('resultado').innerHTML = 'FELICITACIONES';
        userInputField.disabled = true;
    }

});


formField.addEventListener('submit', function(e)
{
    e.preventDefault();
});