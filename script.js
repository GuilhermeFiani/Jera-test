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
        --timer
        updateTimer()
        if(timer < 0){
            clearInterval(pause) 
            contPomodoro += 1
            audio.play()
            updateTimer()
            if (window.Notification&&Notification.permission!=="denied") {
                Notification.requestPermission(function(status){
                    let n = new Notification('Pomodoro', {
                    body:'Tempo esgotado.'
                })
            })
        }
            document.getElementById("total").textContent = "Quantidade de pomodoros: " + contPomodoro
            if (contPomodoro % 4 == 0){
                var res = confirm('Você já fez 4 pomodoros, aceita aumentar o intervalo de descanso para 10 minutos?')
                if (res == true){
                    timer = 60*10
                    timerUp()
                    return 
                }
            }

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

function timerUp(){
    timer = 60 * 10
    updateTimer()
    pause = setInterval(function(){
        --timer 
        updateTimer()
        if (timer < 0){
            clearInterval(pause)
            pauseTimer()
            timer = duration
            updateTimer()
            audio.play()
        }
    },1000)
}    

function timerInterval(){
    timer = delay
    pause = setInterval(function(){
        --timer 
        updateTimer()
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

document.addEventListener('DOMContentLoaded', function(){
    if(!Notification){
        return
    }
    if(Notification.permission !== "granted") 
    Notification.requestPermission()
})