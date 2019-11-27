const timerDisplay = document.getElementById("timerDisplayNumber");

const minMinus = document.getElementById("minmin");
const minPlus = document.getElementById("minpls");
const displayMin = document.getElementById("dispMin");

const secMinus = document.getElementById("secmin");
const secPlus = document.getElementById("secpls");
const displaySec = document.getElementById("dispSec");

const timerSettings = document.getElementById("timerSettings");
const triggerButton = document.getElementById("triggerButton");

let timerCount = 0;
let timerActive = false;

let alertInterval = null;
let timerInterval = null;

const handleClick = id => {
  switch (id) {
    case "minmin":
      if (dispMin.value > 0) {
        displayMin.value--;
      }
      break;
    case "minpls":
      displayMin.value++;
      break;
    case "secmin":
      if (dispSec.value > 0) {
        displaySec.value--;
      }
      break;
    case "secpls":
      displaySec.value++;
      break;
    case "triggerButton":
      trigger();
      break;
  }
};

const toTwoDigits = no => {
  return no.toString().padStart(2, "0");
};

const setDisplay = seconds => {
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

document.addEventListener("click", e => handleClick(e.target.id));
