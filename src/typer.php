<?php

    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['userInputParam'])) {

        // Obtener el valor del campo de entrada enviado desde index.php
        $userInput = $_POST['userInputParam'];

        // Simplemente devolver el valor para verificar que funciona correctamente
        // echo "Valor recibido desde index.php: " . $userInput;
        echo $userInput;

    } 
    else 
    {
        // Manejar cualquier otro caso o error aquí
        // echo "No se recibieron datos válidos desde index.php";
    }

    if(isset($_POST['textParam']))
    {
        $textP = $_POST['textParam'];
        echo $textP ;
    }

    // Clase creada para probar que se pueda llamar
    // class testclass {
    //     function test ($param1, $param2)
    //     {
    //         echo "Funcion Ejecutada";
    //     }
    // }

    function typingtest() 
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['userInputParam'])) {

            // Obtener el valor del campo de entrada enviado desde index.php
            $userInput = $_POST['userInputParam'];
    
            // Simplemente devolver el valor para verificar que funciona correctamente
            // echo "Valor recibido desde index.php: " . $userInput;
            echo $userInput;
    
        } 
    }

    function matching()
    {
        return true;
    }

?>