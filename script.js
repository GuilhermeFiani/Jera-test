var pauseButton = document.getElementById("btnStartPause")
var display = document.querySelector("#timer")
var interval = document.getElementById("interval")
let duration = 60*25
let delay = 60*5
let pause
let contPause = 0
let timer = duration

function startTimer(durationLocal, display){

    pause = setInterval(function() {
        minutes = parseInt(timer / 60 , 10) 
        seconds = parseInt(timer % 60 , 10)

        minutes = minutes < 10 ? "0" + minutes : minutes 
        seconds = seconds < 10 ? "0" + seconds : seconds

        display.textContent = minutes + ":" + seconds

        if(--timer < 0){
            clearInterval(pause) 
        }
        
        if(timer-1 < 0){ 
            if (interval.checked){
                timer = delay
                contPause += 1 
                if (timer-1 == 0 && contPause == 1){
                    timer = duration
                    contPause = 0
                    console.log('teste')
                }
            }   
        }
    }, 1000);
} 

function start(){
    startTimer(duration, display)
    document.getElementById("startPause").innerHTML = ('<button id="btnStartPause" onclick="pauseTimer()">Pause</button>');
    console.log('teste')
}

function pauseTimer(){
    clearInterval(pause)
    document.getElementById("startPause").innerHTML = ('<button id="btnStartPause" onclick="start()">Start</button>')
}