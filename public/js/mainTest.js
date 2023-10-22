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
const textito = "type test bueno.";

// aumenta cada vez que se ingresa un caracter correcto.
var index = 0;

var indexArr = 0;

// insulto que se mostrará cada vez que se ingrese un caracter incorrecto.
var insult = 'ESCRIBE BIEN NOJODA.';

// Permite saber si se va a insultar al usuario o no.
var toInsult = false;

// Lleva control de los errores cometidos.
var error = false;

// Establecemos el texto
var elem = document.querySelector('#tytest');
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


    // Para bloquear el uso de la tecla eliminar cuando haya un espacio como ultimo caracter.
    if (userInputRecieved.slice(-1) == " ") {
        indexArr++
    }

    // Obtenemos el primer indice donde se escribió mal.
    while (tempIndex < userInputRecieved.length && tempIndex < textito.length) {
        // Si no concuerda rompemos ciclo.
        if ( userInputRecieved[tempIndex] !== textito[tempIndex]) {
            break;
        }
        tempIndex++
    }

    console.log(userInputRecievedArr.length);
    console.log(textitoArr.length);

    // Bloquemos la tecla space al final de lo escrito.
    if (textitoArr.length == userInputRecievedArr.length) {
        userInputField.addEventListener('keydown', bloquearTeclaSpace);
    }

    if ( textitoArr.length == userInputRecievedArr.length && userInputRecieved.slice(-1) == "." ) {

        console.log('first');
        var htmlText = '';

        for (let i = 0; i < userInputRecievedArr.length; i++) {
            
            if ( i == userInputRecievedArr.length - 1 ) {

                if (!userInputRecievedArr[i].includes(".")) {
                    // Eliminamos el punto del final de lo que escribimos al fina solo si la palabra final NO lleva punto.
                    userInputRecievedArr[i] = userInputRecievedArr[i].slice(0, -1)
                } 
                

                if ( textitoArr[i] === userInputRecievedArr[i] ) {
                    htmlText += '<span style="color: green;">' + textitoArr[i] + '</span>'
                } else {
                    htmlText += '<span style="color: red;">' + textitoArr[i] + '</span>'
                }

            } else {

                if ( textitoArr[i] === userInputRecievedArr[i] ) {
                    htmlText += '<span style="color: green;">' + textitoArr[i] + '</span>' + "&nbsp;"
                } else {
                    htmlText += '<span style="color: red;">' + textitoArr[i] + '</span>' + "&nbsp;"
                }

            }
        }

        elem.innerHTML = htmlText

    } else if (indexArr > 0) {

        console.log('second');

        var htmlText = '';

        for (let i = 0; i < indexArr; i++) {
            if ( textitoArr[i] === userInputRecievedArr[i] ) {
                htmlText += '<span style="color: green;">' + textitoArr[i] + '</span>' + "&nbsp;"
            } else {
                htmlText += '<span style="color: red;">' + textitoArr[i] + '</span>' + "&nbsp;"
            }
        }

        htmlText += textitoArr.slice(indexArr, textitoArr.length).join(" ");

        elem.innerHTML = htmlText
    }


    // Para que se tomen en cuenta los espacios en blanco.
    elem.style.whiteSpace = 'pre-wrap';
    
    // ========================================================================================================================
    
    // En caso de que eliminemos caracteres.
    if (tempIndex-1 < index) {
        index = tempIndex
    }

    console.log("index: "+index);
    console.log("tempIndex: "+tempIndex + "\n\n");

    /**
     * verificamos que el ultimo caracter ingresado sea igual al caracter que debemos escribir
     * & verificamos que index sea igual que tempIndex.
     * 
     * index     => Va comprobando que el ultimo caracter ingresado sea el correcto segun lo que debemos escribir
     * tempIndex => Revisa desde cero cada vez que lo que hemos escrito esté correcto desde el principio
     */
    if (userInputRecieved.slice(-1) === textito[index] && index == tempIndex-1) {
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

    /**
     * 🔹 The test will finishing when <textitoArr.length == userInputRecievedArr.length && userInputRecieved.slice(-1) == ".">
     *    OR when textitoArr.length < userInputRecievedArr.length.
     * 🔹 You'll win the test when you accert 60% or more.
     */
    if (textitoArr.length == userInputRecievedArr.length && userInputRecieved.slice(-1) == ".") {
        youWon()
    }

});


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

function startTypingAudio()
{
    // Se reproduce cada vez que se ingresa un caracter.
    var audio = document.getElementById("myAudio");

    // Establecemos el tiempo de reproduccion del audio a 0 cada vez que ingresamos un caracter.
    audio.currentTime = 0;
    audio.play()
}

function youWon()
{
    // Mostramos el boton de reinicio.
    document.getElementById('restart').classList.remove('hidden')

    document.getElementById('resultado').innerHTML = 'FELICITACIONES';
    userInputField.disabled = true;
    document.getElementById("myAudio2").play();
}

function youFailed()
{
    // Mostramos el boton de reinicio.
    document.getElementById('restart').classList.remove('hidden')

    document.getElementById('resultado').innerHTML = 'SIGUE INTENTANDO';
    userInputField.disabled = true;
    document.getElementById("myAudio2").play();
}