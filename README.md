# vanillaQR-js

# Esta es una libreria javascript, creada con el proposito de leer un codigo qr usando la libreria jsQR.js para la decodifición del mismo y un canvas para que el stream de video sea siempre fluido.

- En este caso he usado la librería jsQR.js, dejo el link al repositorio.
https://github.com/cozmo/jsQR

Es bastante fácil de usar:

- Primero incluir el archivo css
```html
<link href="./css/vanillaQR.css" rel="stylesheet">
```


- Luego incluir ambos javascript
```html
<script src="./js/jsQR.js"></script>
<script src="./js/vanillaQR.js" ></script>
```

- incluir el contenedor del escaner en alguna parte del <body>
```html
<div id="vanillaQR"></div>
```

- Crear una instancia de vanillaQR y usar
```html
<script>
    var callback = function(texto){
        if(texto.includes("corel") ){
            return true;
        }else{
            return false;
        }
}


var reader = new vanillaQR(callback, "#FF3B58", "#108A97", true);
    reader.inicialize();
    reader.start();
    
var t = setInterval(function(){var text = reader.scan()}, 300);
</script>
```

# El constructor de vanillaQR recibe cuatro parametros
```html
<script>
new vanillaQR(callback, color1, color2, marco);
</script>
```

<strong>callback: </strong>
Es una función que valida el texto de un código, esto es útil para los parámetros siguientes. (Debe ser una función booleana)

<strong>color1: </strong>
Dependiendo de la función callback, es el color que será el recuadro que contorneará el qr en el stream de la cámara. 
ejemplos de color: "#108A97"

<strong>color2: </strong>
Si la función callback retorna true, la linea de contorno del qr será de color1, en el caso que la función retorne false, será color2 el color que recuadre el qr.

<strong>marco: </strong>
Es un valor booleano que indica, valiendose de color1 y color2, si el marco que rodea el stream de la cámara, que es originalmente gris, también tomará los colores del marco que recuadra el qr. 