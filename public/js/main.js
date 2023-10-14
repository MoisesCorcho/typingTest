// Obtenemos el ID del campo de entrada
var userInputField = document.getElementById('userInputID');

// Obtenemos el ID del formulario
var formField = document.getElementById('typingForm');

/**
 * -----------------------------
 *  Game variables
 * -----------------------------
 */

// Texto para replicar
const textito = "typing test";

// aumenta cada vez que se ingresa un caracter correcto.
var index = 0;

// insulto que se mostrará cada vez que se ingrese un caracter incorrecto.
var insult = 'ESCRIBE BIEN NOJODA.';

// Permite saber si se va a insultar al usuario o no.
var toInsult = false;

// Lleva control de los errores cometidos.
var error = false;

// Monitoreamos el evento INPUT en el campo de entrada para verificar cada modificacion de su valor.
userInputField.addEventListener('input', function()
{    
    // Se reproduce cada vez que se ingresa un caracter.
    var audio = document.getElementById("myAudio");

    // Establecemos el tiempo de reproduccion del audio a 0 cada vez que ingresamos un caracter.
    audio.currentTime = 0;
    audio.play()

    // Obtenemos el valor del campo de entrada.
    var userInputRecieved = userInputField.value;

    var tempIndex = 0

    // Obtenemos el primer indice donde se escribió mal.
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

    // Si todo esta bien.
    if (tempIndex == textito.length) {
        elem.innerHTML =
            '<span style="color: green;">' + textito + '</span>' 
    }

    // Para que se tomen en cuenta los espacios en blanco.
    elem.style.whiteSpace = 'pre-wrap';
    
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

    if (textito.length === userInputRecieved.length && !error) {
        document.getElementById('resultado').innerHTML = 'FELICITACIONES';
        userInputField.disabled = true;
        document.getElementById("myAudio2").play();
    }

});

// Evitamos que se recargue la pagina
formField.addEventListener('submit', function(e)
{
    e.preventDefault();
});