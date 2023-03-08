var startButton = document.getElementById("btnStart")
var pauseButton = document.getElementById("btnPause")
let pause

function startTimer(duration, display){
    var timer = duration, minutes, seconds

    pause = setInterval(function() {
        minutes = parseInt(timer / 60 , 10) 
        seconds = parseInt(timer % 60 , 10)

        minutes = minutes < 10 ? "0" + minutes : minutes
        seconds = seconds < 10 ? "0" + seconds : seconds

        display.textContent = minutes + ":" + seconds

        if(--timer < 0){
            timer = duration
        }
    
    }, 1000);
}

startButton.addEventListener('click', function(){
    var duration = 60 * 25
    var display = document.querySelector("#timer")
    startTimer(duration, display)
    startButton.disabled = true
})

function pauseTimer(){
    clearInterval(pause)
    duration = timer
    
}