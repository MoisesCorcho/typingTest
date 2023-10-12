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

    console.log(userInputRecieved);

    /**
     * Hacemos una solicitud AJAX a "typer.php" mediante esta forma le pasamos toda la informacion que necesita la solicitud.
     * 
     * METHOD: hace referencia al metodo que ejecutara la solicitud.
     * 
     * URL: pasa la ruta al archivo al cual le mandara la solicitud.
     * 
     * DATA: es el parametro por el cual se pasara el valor de la variable que se transmitira en la 
     * solicitud por ende va entre comillas invertidas (`) para poder insertar la variable de PHP.
     * 
     * HEADER: muestra una instruccion le pasa a PHP la forma correcta en que debe interpretar la informacion, de 
     * lo contrario se pasaran datos en formato JSON cosa que no soporta PHP por defecto.
     */
    
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
    }
    
    var elemento = document.querySelector('#idTest');

    // Si el elemento no existe lo creamos.
    if (!elemento) {

        var elemento = document.createElement('div')
        elemento.className = "flex items-center justify-center font-semibold text-4xl text-center mx-5 text-yellow-300"
        elemento.textContent = userInputRecieved
        elemento.id = "idTest"
        var container = document.getElementById('goingwell');
        
        if (index == 0 && error == true)
        {
            elemento.innerHTML = '<span style="color: red;">' + userInputRecieved[0] + '</span>';
        }

        container.appendChild(elemento);
    } 

    else {
        // Si no hay errores mostramos la data que hemos escrito bien 
        if (!error) {
            elemento.innerHTML = userInputRecieved.slice(0, index);
        }
        // En caso que haya errores, mostramos de un color de 0 al indice y de color rojo del indice a la longitud
        // de la cadena que escribimos. 
        else {
            elemento.innerHTML = userInputRecieved.slice(0, index) + '<span style="color: red;">' + userInputRecieved.slice(index, userInputRecieved.length) + '</span>';
        }
    }

});

/**
 * Cambiamos la forma en la que se envia el formulario para que no sea la forma tradicional
 * y no se refresque la pagina.
 */ 
formField.addEventListener('submit', function(e)
{
    e.preventDefault();
});