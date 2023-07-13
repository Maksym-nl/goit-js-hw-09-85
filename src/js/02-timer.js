import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const dayEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let timerId = null;
let chosenDate = null; //выбранная дата

startBtn.addEventListener('click', onStartBtn);

startBtn.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {//метод библиотеки флетпик
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtn.setAttribute('disabled', true);
    } else {
      startBtn.removeAttribute('disabled');
      chosenDate = selectedDates[0];
    }

    console.log(selectedDates[0]);
  },
};

flatpickr(input, options);//вызов библиотеки

function onStartBtn() {//начало отсчета запуск таймера
  Notiflix.Notify.success('Timer started');
  timerId = setInterval(() => {
    input.setAttribute('disabled', true);
    startBtn.setAttribute('disabled', true);
    const deltaTime = chosenDate - new Date();
    if (deltaTime <= 0) {//deltaTime - разница выбранная дата и текущая
      input.removeAttribute('disabled');
      startBtn.removeAttribute('disabled');
      clearInterval(timerId)
      Notiflix.Notify.success('Time end');
      return 
    }
    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    changeTextContent({ days, hours, minutes, seconds });
  }, 1000);
}

function changeTextContent({ days, hours, minutes, seconds }) {//подставляет в браузер значения
  dayEl.textContent = days;
  hoursEl.textContent = hours;
  minutesEl.textContent = minutes;
  secondsEl.textContent = seconds;
}
function addLeadingZero(value) {//подставляет вперед 0 если цифра меньше 10
  return String(value).padStart(2, 0);
}
function convertMs(ms) {//дано по условию 
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
