var pauseButton = document.getElementById("btnStartPause")
var display = document.querySelector("#timer")
var interval = document.getElementById("interval")
var audio = new Audio ('som.wav')

let duration = 60*25
let delay = 60*5
let pause
let contPomodoro = 0
let timer = duration

var resInicial = confirm('Deseja alterar o seu tempo de foco total para algum outro?')
if (resInicial == true){
    var newTimer = prompt('Qual é o valor, em minutos, a ser atribuído ao Pomodoro?')
    duration = newTimer*60
    timer = parseInt(newTimer)*60
    updateTimer()
}

function startTimer(durationLocal, display){
    pause = setInterval(function() {
        --timer
        updateTimer()
        if(timer <= 0){
            clearInterval(pause) 
            contPomodoro += 1
            audio.play()
            updateTimer()
            notify()
            document.getElementById("total").textContent = "Quantidade de pomodoros: " + contPomodoro
            
            if (contPomodoro % 4 == 0){
                var res = confirm('Você já fez 4 pomodoros, aceita aumentar o intervalo de descanso para 10 minutos?')
                if (res == true){
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

function updateTimer(){
    minutes = parseInt(timer / 60 , 10) 
    seconds = parseInt(timer % 60 , 10)

    minutes = minutes < 10 ? "0" + minutes : minutes 
    seconds = seconds < 10 ? "0" + seconds : seconds

    display.textContent = minutes + ":" + seconds
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
            notify()
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
            notify()
        }
    },1000)
}

function start(){
    startTimer(duration, display)
    document.getElementById("startPause").innerHTML = ('<button id="btnStartPause" class="btn btn-outline-secondary btn-lg" onclick="pauseTimer()">Pausar</button>')
}

function pauseTimer(){
    clearInterval(pause)
    document.getElementById("startPause").innerHTML = ('<button id="btnStartPause" class="btn btn-outline-primary btn-lg" onclick="start()">Iniciar</button>')
}

function notify(){
    if (window.Notification&&Notification.permission!=="denied") {
        Notification.requestPermission(function(status){
            let n = new Notification('Pomodoro', {
            body:'Tempo esgotado.'
        })
    })
    }
} 

document.addEventListener('DOMContentLoaded', function(){
    if(!Notification){
        return
    }
    if(Notification.permission !== "granted") 
    Notification.requestPermission()
})