
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="output.css">
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <title>Document</title>
</head>
<body class="bg-slate-800 text-white">
    
    <div class="flex items-center justify-center text-center uppercase font-bold text-white text-6xl p-2 mt-5 mb-10">
            
        Welcome to this shitty Typing Test (INDEX 3)

    </div>

    <div id="resultado" class="flex items-center justify-center font-semibold text-4xl text-center mx-5"></div>
    <div id="insultme" class="flex items-center justify-center font-semibold text-4xl text-center mx-5"></div>
    <div id="goingwell"></div>

    <div class="flex items-center justify-center font-semibold text-4xl text-center mx-5">
        typing test
    </div>


    <!-- OUTER CONTAINER DIV : Este es el contenedor que tendra el formulario y dictamina cuanto espacio se le asigna como limite, asi como su justificacion centrada -->
    <div class="flex justify-center items-center mt-10 p-4">
        
        <!-- FORM CONTAINER : Esta es la estructura del formulario como tal asigamos el tamaño que tendra el fomulario dentro del contenedor asignado antes -->
        <form class="w-full max-w-6xl mx-5" method="POST" id="typingForm">

            <!-- MIDDLE CONTAINER DIV : Esto permite que los objetos conenidos dentro del formulario y este div tengan la propiedad FLEX-->
            <div class="flex">

                <!-- INPUT CONTAINER DIV : Esto le da el tamaño al input asignadole un contenedor y diciendole que ocupe todo ese espacio -->
                <div class="w-full">

                    <input class="w-full bg-slate-800 border-b-4 text-gray-300 text-2xl" type="text" name="userInputName" id="userInputID" value="">

                    <!-- 
                    Ejecutamos un script de JavaScript usando la libreria AXIOS la cual esta importada via CDN para realizar una solicutd AJAX, 
                    para mas info de que es esto consultar.
                    -->

                    <script src="./js/main.js"></script>
                    

                </div>

            </div>

        </form>

    </div>   
    
</body>
</html>

