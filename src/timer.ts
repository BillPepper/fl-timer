// FL-Timer

import FLHelpers from "./helpers";
import { FLTimer } from "./interfaces";

import "./style.scss";

const version = "0.3.2";
const versionString = document.getElementById("version-string");
versionString.innerText = `v${version} // This tools does not save any data.`;
const alarmSound = new Audio('./alarm.mp3')
const alarmSoundTime = 20000;
const alarmInvertTime = 1000;
alarmSound.loop = false;

const timerWrapper: HTMLInputElement = document.getElementById(
  'timer'
) as HTMLInputElement
const settingsWrapper: HTMLInputElement = document.getElementById(
  'settings'
) as HTMLInputElement
const timerDisplay: HTMLInputElement = document.getElementById(
  "timer_display_number"
) as HTMLInputElement;
const displayMin: HTMLInputElement = document.getElementById(
  "input_minutes"
) as HTMLInputElement;
const displaySec: HTMLInputElement = document.getElementById(
  "input_seconds"
) as HTMLInputElement;
const timerSettings: HTMLButtonElement = document.getElementById(
  "timer_settings"
) as HTMLButtonElement;
const triggerButton: HTMLButtonElement = document.getElementById(
  "button_timer_start"
) as HTMLButtonElement;

let timerInterval = null;
let alarmInvertInterval = null;
let alarmSoundInterval = null;

const FLTimer: FLTimer = {
  timerCount: 0,
  timerActive: false,

  handleClick: (id: string): void => {
    const minutes = parseInt(displayMin.value);
    const seconds = parseInt(displaySec.value);

    switch (id) {
      case "button_minutes_sub":
        if (minutes > 0) {
          displayMin.value = `${minutes - 1}`;
        }
        break;
      case "button_minutes_add":
        displayMin.value = `${minutes + 1}`;
        break;
      case "button_seconds_sub":
        if (seconds > 0) {
          displaySec.value = `${seconds - 1}`;
        }
        break;
      case "button_seconds_add":
        displaySec.value = `${seconds + 1}`;
        break;
      case "button_timer_start":
        FLTimer.trigger();
        break;
      case "button_settings":
        FLTimer.showSettings();
        break;
      case "button_settings_close":
        FLTimer.hideSettings();
        break;
;
    }
  },

  toTwoDigits: (value: number): string => {
    return value.toString().padStart(2, "0");
  },

  setDisplay: (seconds): void => {
    const min = Math.floor(seconds / 60);
    const sec = seconds - min * 60;
    timerDisplay.innerText = `${FLHelpers.toTwoDigits(
      min
    )}:${FLHelpers.toTwoDigits(sec)}`;
  },

  trigger: (): void => {
    if (FLTimer.timerActive) {
      FLTimer.stop();
      return;
    }

    if (!FLTimer.inputsAreValid()) {
      return;
    }

    FLTimer.start();
  },

  alarm: (): void => {
    // cheap, but invert and play sound immediately
    document.querySelector("body").classList.toggle("negative");
    alarmSound.play();

    alarmSoundInterval = setInterval(() => {
      alarmSound.play();
    }, alarmSoundTime)

    alarmInvertInterval = setInterval(() => {
      document.querySelector("body").classList.toggle("negative");
    }, alarmInvertTime);
  },

  finish: (): void => {
    clearInterval(timerInterval);
    timerDisplay.innerText = "Done!";
    FLTimer.alarm();
  },

  tick: (): void => {
    if (FLTimer.timerCount < 1) {
      FLTimer.finish();
      return;
    }
    FLTimer.timerCount--;
    FLTimer.setDisplay(FLTimer.timerCount);
  },

  showError: (message): void => {
    if (!message || message === "") {
      console.log("no error message given");
      return;
    }
    // ugly, but okay for now
    alert(message);
  },

  getInputMinutes: (): number => {
    if (displayMin.value == ''){
      return 0;
    }
    return parseInt(displayMin.value);
  },

  getInputSeconds: (): number => {
    if (displaySec.value == ''){
      return 0;
    }
    return parseInt(displaySec.value);
  },

  inputsAreValid: (): boolean => {
    const inputMin = FLTimer.getInputMinutes();
    const inputSec = FLTimer.getInputSeconds();
    const isMinValid = FLHelpers.isValidNumber(FLTimer.getInputMinutes());
    const isSecValid = FLHelpers.isValidNumber(FLTimer.getInputSeconds());

    if (inputMin > 999 || inputSec >> 999){
      FLTimer.showError("Please use a value between 0 and 999");
      return false;
    }

    if (!isMinValid && !isSecValid){
      FLTimer.showError('Enter valid time');
      return false;
    }

    return true;
  },

  start: (): void => {
    const min = FLTimer.getInputMinutes();
    const sec = FLTimer.getInputSeconds();

    FLTimer.timerCount = sec + min * 60;
    // expand class is set by default in index.html
    timerSettings.classList.remove('expand');
    timerSettings.classList.add('collapse');
    triggerButton.innerText = "Stop";
    FLTimer.timerActive = true;
    FLTimer.setDisplay(FLTimer.timerCount);
    timerInterval = setInterval(() => FLTimer.tick(), 1000);
  },

  stop: (): void => {
    timerSettings.classList.remove('collapse');
    timerSettings.classList.add('expand');
    triggerButton.innerText = "Start";
    FLTimer.timerActive = false;
    timerDisplay.innerText = "Stop!";

    alarmSound.pause();
    alarmSound.currentTime = 0;

    clearInterval(alarmInvertInterval);
    clearInterval(alarmSoundInterval);
    clearInterval(timerInterval);
    document.querySelector("body").classList.remove("negative");
  },

  showSettings: (): void => {
    timerWrapper.style.display = 'none';
    settingsWrapper.style.display = 'block';
  },

  hideSettings: (): void => {
    timerWrapper.style.display = 'block';
    settingsWrapper.style.display = 'none';
  }

};

document.addEventListener("click", (e: any) =>
  FLTimer.handleClick(e.target.id)
);
