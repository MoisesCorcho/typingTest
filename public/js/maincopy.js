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
// const textito = obtenerFraseAleatoria();
const textito = 'type test dos';

var indexArr = 0;

// aumenta cada vez que se ingresa un caracter correcto.
var index = 0;

var indexGeneral = 0;

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
    startTypeAudio();

    // Obtenemos el valor del campo de entrada.
    var userInputRecieved = userInputField.value;

    var textitoArr = textito.split(" ")
    var userInputRecievedArr = userInputRecieved.split(" ")

    var tempIndex = 0
    var tempIndexGeneral = 0
    
    // Para bloquear el uso de la tecla eliminar cuando haya un espacio como ultimo caracter.
    if (userInputRecieved.slice(-1) == " ") {

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

    while (tempIndexGeneral < userInputRecieved.length && tempIndexGeneral < textito.length) {
        // Si no concuerda rompemos ciclo.
        if ( userInputRecieved[tempIndexGeneral] !== textito[tempIndexGeneral]) {
            break;
        }
        tempIndexGeneral++
    }

    // Se mostrará todo en los colores correspondientes si se ha completado el texto (ya sea que se haya hecho bien o mal)
    if ( userInputRecievedArr.length - 1 > 0 && userInputRecievedArr.length > textitoArr.length ) {

        console.log('new one');
        var htmlText = '';

        for (let i = 0; i < textitoArr.length; i++) {
            if ( textitoArr[i] === userInputRecievedArr[i] ) {
                htmlText += '<span style="color: green;">' + textitoArr[i] + '</span>' + "&nbsp;"
            } else {
                htmlText += '<span style="color: red;">' + textitoArr[i] + '</span>' + "&nbsp;"
            }
        }

        elem.innerHTML = htmlText
    }



    if ( indexArr > 0 ) {

        console.log('new two');
        var htmlText = '';

        for (let i = 0; i < indexArr; i++) {
            if ( textitoArr[i] === userInputRecievedArr[i] ) {
                htmlText += '<span style="color: green;">' + textitoArr[i] + '</span>' + "&nbsp;"
            } else {
                htmlText += '<span style="color: red;">' + textitoArr[i] + '</span>' + "&nbsp;"
            }
        }

        // Se han escrito algunas cosas bien.
        if (tempIndex > 0 && tempIndex != textitoArr[indexArr].length) {
            console.log('interno');
            htmlText += 
                '<span style="color: green;">' + textitoArr[indexArr].slice(0, tempIndex) + '</span>' +
                '<span style="color: red;">' + textitoArr[indexArr].slice(tempIndex, userInputRecievedArr[indexArr].length) + '</span>' +
                textito.slice(userInputRecieved.length, textito.length)
        } else {
            htmlText += textitoArr.slice(indexArr, textitoArr.length).join(" ");
        }


        elem.innerHTML = htmlText
    }

    // ========================================================================================================================
    
    // En caso de que eliminemos caracteres.
    if (tempIndex-1 < index) {
        index = tempIndex
    }

    if (tempIndexGeneral-1 < indexGeneral) {
        indexGeneral = tempIndexGeneral
    }

    // console.log(userInputRecievedArr);
    // console.log(index);
    // console.log("indexArr: "+indexArr);
    // console.log(tempIndex + "\n\n");

    console.log(indexGeneral);
    console.log(tempIndexGeneral + "\n\n");

    /**
     * verificamos que el ultimo caracter ingresado sea igual al caracter que debemos escribir
     * & verificamos que index sea igual que tempIndex.
     * 
     * index     => Va comprobando que el ultimo caracter ingresado sea el correcto segun lo que debemos escribir
     * tempIndex => Revisa desde cero cada vez que lo que hemos escrito esté correcto desde el principio
     */
    if (userInputRecievedArr[indexArr].slice(-1) === textitoArr[indexArr][index] && index == tempIndex-1) {
        error = false;
        toInsult = false;
        index++;
    }
    else {
        error = true;
        toInsult = true;
    }

    if (userInputRecieved.slice(-1) === textito[indexGeneral] && indexGeneral == tempIndexGeneral-1) {
        indexGeneral++;
    }

    if (toInsult) {
        document.getElementById('insultme').innerHTML = insult;
    }else {
        document.getElementById('insultme').innerHTML = '';
    }

    // Terminar el juego
    if ( textito.length == userInputRecieved.length ) {
        // finishGame()
    }

});


buttonRestart.addEventListener('click', function() {
    location.reload();
});

// Evitar que se recargue la página en el evento 'keydown' del campo de entrada.
userInputField.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
    }
});


// Para bloquear el uso de la tecla eliminar cuando haya un espacio como ultimo caracter.
function bloquearTeclaDelete(event) {
    if (event.key === 'Delete' || event.key === 'Del' || event.key === 'Backspace') {
        event.preventDefault(); // Bloquea la tecla "Eliminar"
    }
}

function startTypeAudio()
{
    // Se reproduce cada vez que se ingresa un caracter.
    var audio = document.getElementById("myAudio");

    // Establecemos el tiempo de reproduccion del audio a 0 cada vez que ingresamos un caracter.
    audio.currentTime = 0;
    audio.play()
}

function finishGame()
{
    // Mostramos el boton de reinicio.
    document.getElementById('restart').classList.remove('hidden')

    document.getElementById('resultado').innerHTML = 'FELICITACIONES';
    userInputField.disabled = true;
    document.getElementById("myAudio2").play();
}
