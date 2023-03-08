var startButton = document.getElementById("btnStart")
var pauseButton = document.getElementById("btnPause")
var interval = document.getElementById("interval")
let duration = 60*25
let delay = 60*5
let pause
let contPause = 0

function startTimer(duration, display){
    var timer = duration, minutes, seconds

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

startButton.addEventListener('click', function(){
    var display = document.querySelector("#timer")
    startTimer(duration, display)
    startButton.disabled = true
    if (timer == 0){
        startButton.disabled = false
    }  
})

function pauseTimer(){
    clearInterval(pause)
}