
function drawLine(ctx2, begin, end, color){
    console.log("begin: " + begin + " end: " + end);

        ctx2.beginPath();
        ctx2.moveTo(begin.x, begin.y);
        ctx2.lineTo(end.x, end.y);
        ctx2.lineWidth = 4;
        ctx2.strokeStyle = color;
        ctx2.stroke();
};




function vanillaQR(callback, primary, secondary, context){
    this.dom = document.getElementById("vanillaQR");
    this.callback = callback;
    this.primary = primary;
    this.secondary = secondary;
    this.context = context;
    
    this.inicialize = function(){
        var video = document.createElement("video");
        //video.src = "./image/castillo.jpg";
        video.classList.add("qrvideo");
        //video.classList.add("embed-responsive-item");
        video.setAttribute("id", "qrvideo");
        
        /*  Creamos ambos canvas   */
        var c1 = document.createElement("canvas");
        var c2 = document.createElement("canvas");
        c2.setAttribute("id", "c2");
        c2.classList.add("qrcanvas");
        c1.setAttribute("id", "c1");
        c1.classList.add("qrcanvas");
        /* End creacion de canvas */
   
          
          /*
        var ctx2 = c2.getContext("2d");
        ctx2.fillStyle = "pink";
        ctx2.fillRect(0, 0, c2.width, c2.height);
        */

        /* Creamos el div del error*/
        var error = document.createElement("div");
        error.classList.add("none");
        error.classList.add("error");
        error.setAttribute("id", "error");

        /* Agregamos todos los elementos a la clase */
        this.video = video;
        this.c1 = c1;
        this.error = error;
        this.c2 = c2;

        this.dom.appendChild(video);
        this.dom.appendChild(c1);
        this.dom.appendChild(c2);
        this.dom.appendChild(error);

    }


    this.start = function(){
        var video = document.getElementById("qrvideo");
        var c1 = document.getElementById("c1");
        var ctx1 = c1.getContext("2d");
        var c2 = document.getElementById("c2");
        var ctx2 = c2.getContext("2d");

        
        navigator.mediaDevices.getUserMedia({ video: 
            { facingMode: "environment"} }).then(function(stream) {
            video.srcObject = stream;
            video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
            video.play();
          }).catch(function(err) {
            /* manejar el error */
            document.getElementById("qrvideo").classList.add("none");
            var error = document.getElementById("error");
            error.classList.remove("none");
            var div = document.createElement("div");
            div.innerText = "No es posible obtener acceso a la cámara";
            var icon = document.createElement("i");
            icon.classList.add("material-icons", "--primary");
            icon.innerText = "videocam_off";
            error.appendChild(icon);
            error.appendChild(div);
          });



    }
   
        

    this.scan = function(){
    
        var video = document.getElementById("qrvideo");
        var c1 = document.getElementById("c1");
        var canvas = c1.getContext("2d");
        var c2 = document.getElementById("c2");
       
        if (video.readyState === video.HAVE_ENOUGH_DATA) {

            var posicion = video.getBoundingClientRect();
            console.log(posicion.top, posicion.right, posicion.bottom, posicion.left);
            console.log(posicion.width + "---" + posicion.height);

            

            //Dimensionamos ambos canvas
            c1.height = video.videoHeight;
            c1.width = video.videoWidth;
            this.dom.style.height = posicion.height + "px";

            c2.height = video.videoHeight;
            c2.width = video.videoWidth;
            
            

            //Dibujamos la imagen en el canvas c1
            canvas.drawImage(video, 0, 0, c1.width, c1.height);

            //Decodificamos el codigo qr
            var imageData = canvas.getImageData(0, 0, c1.width, c1.height);
            var code = jsQR(imageData.data, imageData.width, imageData.height, {
              inversionAttempts: "dontInvert",
            });


            //Dibujamos el rectangulo en el canvas c2
            if (code) {

                //console.log(code.data);
               var color = this.secondary;
               if(this.callback(code.data)){
                 color = this.primary
                 if(this.context){
                   this.video.style.backgroundColor = this.primary;
                 }
               }else{
                if(this.context){
                  this.video.style.backgroundColor = this.secondary;
                }
               }
             

                
               
                 var ctx2 = c2.getContext("2d");
                
    
                drawLine(ctx2, code.location.topLeftCorner, code.location.topRightCorner, color);
                drawLine(ctx2, code.location.topRightCorner, code.location.bottomRightCorner, color);
                drawLine(ctx2, code.location.bottomRightCorner, code.location.bottomLeftCorner, color);
                drawLine(ctx2, code.location.bottomLeftCorner, code.location.topLeftCorner, color);

               return code.data;
                 
                }

            }
        }
        
    }

   

