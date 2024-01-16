import { obtenerFraseAleatoria } from './texts.js';

// Obtenemos el ID del campo de entrada
var userInputField = document.getElementById('userInputID');

// Obtenemos el button a traves de su id
var buttonRestart = document.getElementById('restartButton');

/**
 * -----------------------------
 *  Game variables
 * -----------------------------
 */

// Texto para replicar
const textito = obtenerFraseAleatoria();

var score = 0;

// aumenta cada vez que se ingresa un caracter correcto.
var index = 0;

// Permite saber por cual indice vamos del arreglo cuya longitud aumenta cada vez que digitamos un espacio
var indexArr = 0;

// insulto que se mostrará cada vez que se ingrese un caracter incorrecto.
var insult = 'ESCRIBE BIEN NOJODA.';

// Permite saber si se va a insultar al usuario o no.
var toInsult = false;

// Creamos la variable en donde almacenaremos el html donde incrustaremos el texto que escribimos
var elem = document.querySelector('#tytest');

// Establecemos el string a completar
elem.textContent = textito;

// Monitoreamos el evento INPUT en el campo de entrada para verificar cada modificacion de su valor.
userInputField.addEventListener('input', function()
{    

    startTypingAudio()

    // Obtenemos el valor del campo de entrada.
    var userInputRecieved = userInputField.value;

    // Texto a llenar convertida en arreglo
    var textitoArr = textito.split(" ")

    // Input escrita por el usuario convertida en arreglo basado en espacios (" ")
    var userInputRecievedArr = userInputRecieved.split(" ")

    var tempIndex = 0

    /**
     * IndexArr increases only when the user type a space 
     * AND when indexArr + 1 is different from the length of userInputReceivedArray
     * 
     * At this point userInputRecievedArr.length should always be greater than indexArr
     * by 1
     */
    if (userInputRecieved.slice(-1) == " " && (indexArr + 1) != userInputRecievedArr.length) {

        indexArr++
        // Agregar el escuchador de eventos para bloquear "Eliminar"
        userInputField.addEventListener('keydown', bloquearTeclaDelete);
    } else {
        // Para desbloquear "Eliminar", elimina el escuchador de eventos
        userInputField.removeEventListener('keydown', bloquearTeclaDelete);
    }

    // Obtenemos el primer indice donde se escribió mal.
    while (tempIndex < userInputRecievedArr[indexArr].length && tempIndex < textitoArr[indexArr].length) {
        // Si no concuerda rompemos ciclo.
        if ( userInputRecievedArr[indexArr][tempIndex] !== textitoArr[indexArr][tempIndex]) {
            break;
        }
        tempIndex++
    }

    // Bloquemos la tecla space al final de lo escrito.
    if (textitoArr.length == userInputRecievedArr.length) {
        userInputField.addEventListener('keydown', bloquearTeclaSpace);
    }

    var htmlText = '';

    // Entra aqui solo cuando estamos en la ultima palabra del string a replicar.
    if ( textitoArr.length == userInputRecievedArr.length && userInputRecieved.slice(-1) == "." ) {

        console.log('first');

        for (let i = 0; i < userInputRecievedArr.length; i++) {
            
            // Si nos encontranmos en la ultima palabra del texto que debemos replicar.
            if ( i == userInputRecievedArr.length - 1 ) {

                if (!textitoArr[i].includes(".")) {
                    // Eliminamos el punto del final de la palabra, solo si la palabra final NO lleva punto.
                    userInputRecievedArr[i] = userInputRecievedArr[i].slice(0, -1)
                } 
                
                if ( textitoArr[i] === userInputRecievedArr[i] ) {
                    htmlText += '<span style="color: green;">' + textitoArr[i] + '</span>'
                } else {
                    htmlText += '<span style="color: red;">' + textitoArr[i] + '</span>'
                }

            } else {
                htmlText += decideStringColor(textitoArr, userInputRecievedArr, i)
            }
        }

        elem.innerHTML = htmlText

    } else if (indexArr > 0) {

        console.log('second');

        for (let i = 0; i < indexArr; i++) {
            htmlText += decideStringColor(textitoArr, userInputRecievedArr, i)
        }

        if (tempIndex > 0 && tempIndex != textito.length) {
            
            htmlText += decideCharacterColorStartsWell(textitoArr, indexArr, tempIndex, userInputRecievedArr);
                
            // Agregamos espacio al final mientras no estemos en la ultima palabra.
            if (userInputRecievedArr.length != textitoArr.length) {
                htmlText += "&nbsp;"
            }
                

        }
        // Some character have been misspelled from the beginning, but not all. 
        else {
            htmlText += decideCharacterColorStartsWrong(textitoArr, indexArr, tempIndex, userInputRecievedArr);

            // Agregamos espacio al final mientras no estemos en la ultima palabra.
            if (userInputRecievedArr.length != textitoArr.length) {
                htmlText += "&nbsp;"
            }

        }

        htmlText += textitoArr.slice(indexArr + 1, textitoArr.length).join(" ");        

        elem.innerHTML = htmlText

    } else if (indexArr == 0) {
        // The user has not entered a space yet

        console.log('Third');

        // Some characters have been mistyped, but not all.
        if (tempIndex > 0 && tempIndex != textito.length) {

            htmlText += decideCharacterColorStartsWell(textitoArr, indexArr, tempIndex, userInputRecievedArr);

            htmlText += "&nbsp;" // Espacio en blanco
        } 
        // Some character have been misspelled from the beginning, but not all.
        else {
            htmlText += decideCharacterColorStartsWrong(textitoArr, indexArr, tempIndex, userInputRecievedArr);

            htmlText += "&nbsp;" // Espacio en blanco
        }

        htmlText += textitoArr.slice(indexArr + 1, textitoArr.length).join(" ");

        elem.innerHTML = htmlText
    }
    
    // ========================================================================================================================
    
    // En caso de que eliminemos caracteres.
    if (tempIndex-1 < index) {
        index = tempIndex
    }

    /**
     * verificamos que el ultimo caracter ingresado sea igual al caracter que debemos escribir
     * & verificamos que index sea igual que tempIndex.
     * 
     * index     => Va comprobando que el ultimo caracter ingresado sea el correcto segun lo que debemos escribir
     * tempIndex => Revisa desde cero cada vez que lo que hemos escrito esté correcto desde el principio
     */
    if ( userInputRecievedArr[indexArr].slice(-1) === textitoArr[indexArr][index] && index == tempIndex-1 ) {
        toInsult = false;
        index++;
    }
    else if ( userInputRecievedArr[indexArr].length == 0 && userInputRecieved.slice(-1) == " " ) {
        toInsult = false;
    }
    else {
        toInsult = true;
    }

    if (toInsult) {
        document.getElementById('insultme').innerHTML = insult;
    }else {
        document.getElementById('insultme').innerHTML = '';
    }

    

    /**
     * 🔹 The test will finishing when <textitoArr.length == userInputRecievedArr.length && userInputRecieved.slice(-1) == ".">
     *    OR when textitoArr.length < userInputRecievedArr.length.
     * 🔹 You'll win the test when you accert 60% or more.
     */
    if (textitoArr.length == userInputRecievedArr.length && userInputRecieved.slice(-1) == ".") {

        //Eliminamos el insulto siempre al finalizar.
        document.getElementById('insultme').innerHTML = '';

        score = calculateScore(textitoArr, userInputRecievedArr, score)

        if ( score >= 60 ) {
            youWon(score)
        } else {
            youFailed(score)
        }
        
    }

});

//======================================================================================================================================

buttonRestart.addEventListener('click', function() {
    location.reload();
});

// Evitar que se recargue la página en el evento 'keydown' del campo de entrada
userInputField.addEventListener('keydown', function(e) {
    if (e.key === "Enter") {
        e.preventDefault();
    }
});

// Para bloquear el uso de la tecla eliminar cuando haya un espacio como ultimo caracter.
function bloquearTeclaSpace(event) {
    if (event.keyCode === 32) {
        event.preventDefault(); // Bloquea la tecla "Eliminar"
    }
}

// Para bloquear el uso de la tecla eliminar cuando haya un espacio como ultimo caracter.
function bloquearTeclaDelete(event) {
    if (event.key === 'Delete' || event.key === 'Del' || event.key === 'Backspace') {
        event.preventDefault(); // Bloquea la tecla "Eliminar"
    }
}

function startTypingAudio()
{
    // Se reproduce cada vez que se ingresa un caracter.
    var audio = document.getElementById("myAudio");

    // Establecemos el tiempo de reproduccion del audio a 0 cada vez que ingresamos un caracter.
    audio.currentTime = 0;
    audio.play()
}

function youWon(score)
{
    // Mostramos el boton de reinicio.
    document.getElementById('restart').classList.remove('hidden')

    document.getElementById('resultado').innerHTML = '¡¡FELICITACIONES!! TU PORCENTAJE DE ACIERTO FUE DE ' + score.toFixed(2) + '%';
    userInputField.disabled = true;
    document.getElementById("myAudio2").play();
}

function youFailed(score)
{
    // Mostramos el boton de reinicio.
    document.getElementById('restart').classList.remove('hidden')

    document.getElementById('resultado').innerHTML = '¡¡SIGUE INTENTANDO!! TU PORCENTAJE DE ACIERTO FUE DE ' + score.toFixed(2) + '%' + ', PARA GANAR DEBES OBTENER 60% O MAS';
    userInputField.disabled = true;
    // document.getElementById("myAudio2").play();
}

/**
 * This function decide if the color the string is red or green.
 * 
 * @param {integer} i the for index when we walk through the array either up indexArr 
 * or userInputRecievedArr.length
 * @param {Array} textitoArr The string we want to complete converted to an Array
 * @param {Array} userInputRecievedArr The string we are typing converted to an Array
 */
function decideStringColor(textitoArr, userInputRecievedArr, i)
{
    if ( textitoArr[i] === userInputRecievedArr[i] ) {
        return '<span style="color: green;">' + textitoArr[i] + '</span>' + "&nbsp;"
    } else {
        return '<span style="color: red;">' + textitoArr[i] + '</span>' + "&nbsp;"
    }
}

/**
 * // Some character have been well written from the beginning AND some have been misspelled, but not all.
 * 
 * @param {Array} textitoArr 
 * @param {integer} indexArr 
 * @param {integer} tempIndex 
 * @param {Array} userInputRecievedArr 
 * 
 * @returns string
 */
function decideCharacterColorStartsWell(textitoArr, indexArr, tempIndex, userInputRecievedArr)
{
    var text = 
        '<span style="color: green;">' + textitoArr[indexArr].slice(0, tempIndex) + '</span>' + // Pintamos de rojo lo malo
        '<span style="color: red;">' + textitoArr[indexArr].slice(tempIndex, userInputRecievedArr[indexArr].length) + '</span>' + // Pintamos de verde lo bueno
        textitoArr[indexArr].slice(userInputRecievedArr[indexArr].length, textitoArr[indexArr].length) // Dejamos del color base lo que falta por escribir

    return text;
}

/**
 * // Some character have been misspelled from the beginning, but not all.
 * 
 * @param {Array} textitoArr 
 * @param {integer} indexArr 
 * @param {integer} tempIndex 
 * @param {Array} userInputRecievedArr 
 * 
 * @returns string
 */
function decideCharacterColorStartsWrong(textitoArr, indexArr, tempIndex, userInputRecievedArr)
{
    var text =
        '<span style="color: red;">' + textitoArr[indexArr].slice(tempIndex, userInputRecievedArr[indexArr].length) + '</span>' + // Pintamos de rojo lo malo
        textitoArr[indexArr].slice(userInputRecievedArr[indexArr].length, textitoArr[indexArr].length) // Dejamos del color base lo que falta por escribir
    
        return text
}

function calculateScore(textitoArr, userInputRecievedArr, score)
{
    var score = 0
    for (let i = 0; i < textitoArr.length; i++) {
        
        if ( textitoArr[i] === userInputRecievedArr[i] ) {
            score += 1
        } else {
            score += 0
        }
    }

    var porcentage = (score/textitoArr.length) * 100

    return porcentage
}