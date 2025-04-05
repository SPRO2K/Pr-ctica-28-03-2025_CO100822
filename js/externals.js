const requestNotificationPermission = async ()=>{
    const permission = await Notification.requestPermission();
    if(permission !== 'granted'){
        throw new Error("No se ha podido otorgar permisos para la notificación.");
    }else{
        new Notification("Hola, mi nombre es Sebastian Ernesto Cordova Orellana, soy estudiante de la Universidad Francisco Gavidia.");
    }
}




async function recordVideo() {
    if(window.recorder && window.recorder.state==="recording"){
        window.recorder.stop();
    }else{
        let toggle = document.getElementById("recording-button");

        let stream = await navigator.mediaDevices.getUserMedia({audio:true,video:true}).catch((error)=>{
            throw new Error("No es posible continuar, debido a que no se han brindado permisos a la aplicación");
        });

        let videoE1 = document.getElementById("video-element");
        videoE1.srcObject = stream;
        videoE1.play();

        window.recorder = new MediaRecorder(stream);

        
        let chunks = [];
        window.recorder.ondataavailable = function(event){
            if(event.data.size > 0){
                chunks.push(event.data);
            }
        };

        window.recorder.onstop = function(){
            let blob = new Blob(chunks,{type:'video/mp4'});
            toggle.innerHTML = `<i class="fa fa-circle"></i>`;
            videoE1.srcObject = null;
            videoE1.src = URL.createObjectURL(blob);
            let tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
        }

        window.recorder.onstart = function(){
            toggle.innerHTML = `<i class="fa fa-square"></i>`;

        };

        window.recorder.start();

    }
}
function geolocalizacion(){
     if ( navigator.permissions && navigator.permissions.query) {
        navigator.permissions.query({name:`geolocation`}).then(function(result){
            const permissions = result.state;
            if(permissions === `granted` || permissions === `prompt`){
                _onGetCurrentlocation();
            }
        });
        
     }else if(navigator.geolocation){
        _onGetCurrentlocation();
     }
}

function _onGetCurrentlocation(){
    const options = {
        enableHighAccuracy: true,
        Timeout: 5000,
        maximumAge: 0
    };
    navigator.geolocation.getCurrentPosition(function(position){
        const marker = {
            lat: position.coords.latitude,
            lgn: position.coords.latitude
        };
        let enlace = document.getElementById("ir_mapa");
        enlace.href= `https://maps.google.com/?q=${marker.lat},${marker.lng}`;
        enlace.text ="IR AL MAPA";
        enlace.target = "_blank";

    },function(error){
        console.log(error);

    },options);
}


const init = () =>{
    const tieneSoprteUsermedia = () =>
        ||(navigator.mediaDevices.getUserMedia);


    if(typeof mediaRecorder === "undefined" || !tieneSoprteUsermedia()){
        return alert("su navegador no cumple con los requisitos, favor actualice");

    } 
    const $listaDeDispositivos = document.querySelector("#listaDeDispositivos"),
    $duracion = document.querySelector("#aduracion"),
    $btnComenzarGrabacion = document.querySelector("#btnComenzarGrabacion"),
    $btnComenzarDetenerGrabacion = document.querySelector("#btnDetenerGrabacion");


    const limpiarSelect = () => {
        
    }
}