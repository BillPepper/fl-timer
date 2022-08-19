// FL-Timer
const version = "0.2.3";

const timerDisplay = document.getElementById("timer_display_number");

const minMinus = document.getElementById("button_minutes_sub");
const minPlus = document.getElementById("button_minutes_add");
const displayMin = document.getElementById("input_minutes");

const secMinus = document.getElementById("button_seconds_sub");
const secPlus = document.getElementById("button_seconds_add");
const displaySec = document.getElementById("input_seconds");

const timerSettings = document.getElementById("timer_settings");
const triggerButton = document.getElementById("button_timer_start");

const versionString = document.getElementById("version-string");
versionString.innerText = `v${version} // This tools does not save any data whatsoever`;

let alertInterval = null;
let timerInterval = null;

FLTimer = {
  timerCount: 0,
  timerActive: false,

  handleClick: (id) => {
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
        FLTimer.trigger();
        break;
    }
  },

  toTwoDigits: (no) => {
    return no.toString().padStart(2, "0");
  },

  setDisplay: (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds - min * 60;
    timerDisplay.innerText = `${FLTimer.toTwoDigits(min)}:${FLTimer.toTwoDigits(
      sec
    )}`;
  },

  trigger: () => {
    if (FLTimer.timerActive) {
      FLTimer.stop();
    } else {
      FLTimer.start();
    }
  },

  alert: () => {
    alertInterval = setInterval(() => {
      document.querySelector("body").classList.toggle("negative");
    }, 1000);
  },

  finish: () => {
    clearInterval(timerInterval);
    timerDisplay.innerText = "Done!";
    FLTimer.alert();
  },

  tick: () => {
    timerCount--;
    FLTimer.setDisplay(timerCount);
    if (timerCount < 1) {
      FLTimer.finish();
    }
  },

  start: () => {
    timerCount = parseInt(displaySec.value) + parseInt(displayMin.value) * 60;
    timerSettings.classList.add("in");
    triggerButton.innerText = "Stop";
    FLTimer.timerActive = true;
    FLTimer.setDisplay(timerCount);
    timerInterval = setInterval(() => FLTimer.tick(), 1000);
  },

  stop: () => {
    timerSettings.classList.remove("in");
    triggerButton.innerText = "Start";
    FLTimer.timerActive = false;
    timerDisplay.innerText = "Stop!";
    clearInterval(alertInterval);
    clearInterval(timerInterval);
    document.querySelector("body").classList.remove("negative");
  },
};
document.addEventListener("click", (e) => FLTimer.handleClick(e.target.id));
