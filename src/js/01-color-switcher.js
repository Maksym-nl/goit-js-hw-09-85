const startBtn = document.querySelector('button[data-start]')
const stopBtn = document.querySelector('button[data-stop]')
let timerId = null

startBtn.addEventListener('click', onStart)
stopBtn.addEventListener('click', onStop)


function getRandomHexColor() {//ДАНА ПО УСЛОВИЮ В ДЗ
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }

  function onStart(){
      timerId = setInterval( changeColor
    , 1000);
    startBtn.setAttribute('disabled', true)
  }

function onStop(){
  clearInterval(timerId)
  startBtn.removeAttribute('disabled')
}

function changeColor(){
  document.body.style.backgroundColor = getRandomHexColor();
}