// FL-Timer
const version = '0.2.2'

const timerDisplay = document.getElementById("timer_display_number");

const minMinus = document.getElementById("button_minutes_sub");
const minPlus = document.getElementById("button_minutes_add");
const displayMin = document.getElementById("input_minutes");

const secMinus = document.getElementById("button_seconds_sub");
const secPlus = document.getElementById("button_seconds_add");
const displaySec = document.getElementById("input_seconds");

const timerSettings = document.getElementById("timer_settings");
const triggerButton = document.getElementById("button_timer_start");

const versionString = document.getElementById("version-string")
versionString.innerText = `v${version} // This tools does not save any data whatsoever`

let timerCount = 0;
let timerActive = false;

let alertInterval = null;
let timerInterval = null;

const handleClick = (id) => {
  switch (id) {
    case "button_minutes_sub":
      if (displayMin.value > 0) {
        displayMin.value--;
      }
      break;
    case "button_minutes_add":
      displayMin.value++;
      break;
    case "button_seconds_sub":
      if (displaySec.value > 0) {
        displaySec.value--;
      }
      break;
    case "button_seconds_add":
      displaySec.value++;
      break;
    case "button_timer_start":
      trigger();
      break;
  }
};

const toTwoDigits = (no) => {
  return no.toString().padStart(2, "0");
};

const setDisplay = (seconds) => {
  const min = Math.floor(seconds / 60);
  const sec = seconds - min * 60;
  timerDisplay.innerText = `${toTwoDigits(min)}:${toTwoDigits(sec)}`;
};

const trigger = () => {
  if (timerActive) {
    stop();
  } else {
    start();
  }
};

const alert = () => {
  alertInterval = setInterval(() => {
    document.querySelector("body").classList.toggle("negative");
  }, 1000);
};

const finish = () => {
  clearInterval(timerInterval);
  timerDisplay.innerText = "Done!";
  alert();
};

const tick = () => {
  timerCount--;
  setDisplay(timerCount);
  if (timerCount < 1) {
    finish();
  }
};

const start = () => {
  timerCount = parseInt(displaySec.value) + parseInt(displayMin.value) * 60;
  timerSettings.classList.add("in");
  triggerButton.innerText = "Stop";
  timerActive = true;
  setDisplay(timerCount);
  timerInterval = setInterval(() => tick(), 1000);
};

const stop = () => {
  timerSettings.classList.remove("in");
  triggerButton.innerText = "Start";
  timerActive = false;
  timerDisplay.innerText = "Stop!";
  clearInterval(alertInterval);
  clearInterval(timerInterval);
  document.querySelector("body").classList.remove("negative");
  console.log(timer);
};

document.addEventListener("click", (e) => handleClick(e.target.id));
