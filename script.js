var pauseButton = document.getElementById("btnStartPause")
var display = document.querySelector("#timer")
var interval = document.getElementById("interval")
let duration = 60*25
let delay = 60*5
let pause
let contPomodoro = 0
let timer = duration
var audio = new Audio ('som.wav')

function startTimer(durationLocal, display){
    pause = setInterval(function() {
        updateTimer()
        --timer
        if(timer < 0){
            clearInterval(pause) 
            contPomodoro += 1
            audio.play() 
            
            if (interval.checked){
                timerInterval()
                return
            }
                pauseTimer() 
                timer = duration
                updateTimer()
        }    
    }, 1000);
} 

function timerInterval(){
    timer = delay
    pause = setInterval(function(){
        updateTimer()
        --timer 
        if (timer < 0){
            clearInterval(pause)
            pauseTimer()
            timer = duration
            updateTimer()
            audio.play()
        }
    },1000)
}

function updateTimer(){
    minutes = parseInt(timer / 60 , 10) 
    seconds = parseInt(timer % 60 , 10)

    minutes = minutes < 10 ? "0" + minutes : minutes 
    seconds = seconds < 10 ? "0" + seconds : seconds

    display.textContent = minutes + ":" + seconds
}

function start(){
    startTimer(duration, display)
    document.getElementById("startPause").innerHTML = ('<button id="btnStartPause" onclick="pauseTimer()">Pause</button>');
}

function pauseTimer(){
    clearInterval(pause)
    document.getElementById("startPause").innerHTML = ('<button id="btnStartPause" onclick="start()">Start</button>')
}