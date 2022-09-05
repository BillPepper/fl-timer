// FL-Timer

import FLHelpers from "./helpers";
import { FLTimer } from "./interfaces";

import "./style.css";

const version = "0.2.6";
const versionString = document.getElementById("version-string");
versionString.innerText = `v${version} // This tools does not save any data.`;

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

let alertInterval = null;
let timerInterval = null;

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
    alertInterval = setInterval(() => {
      document.querySelector("body").classList.toggle("negative");
    }, 1000);
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
    return parseInt(displayMin.value);
  },

  getInputSeconds: (): number => {
    return parseInt(displaySec.value);
  },

  inputsAreValid: (): boolean => {
    if (!FLHelpers.isValidNumber(FLTimer.getInputMinutes())) {
      FLTimer.showError('Enter valid number for "minutes"');
      return false;
    }

    if (!FLHelpers.isValidNumber(FLTimer.getInputSeconds())) {
      FLTimer.showError('Enter valid number for "seconds"');
      return false;
    }

    return true;
  },

  start: (): void => {
    const min = FLTimer.getInputMinutes();
    const sec = FLTimer.getInputSeconds();

    FLTimer.timerCount = sec + min * 60;
    timerSettings.classList.add("in");
    triggerButton.innerText = "Stop";
    FLTimer.timerActive = true;
    FLTimer.setDisplay(FLTimer.timerCount);
    timerInterval = setInterval(() => FLTimer.tick(), 1000);
  },

  stop: (): void => {
    timerSettings.classList.remove("in");
    triggerButton.innerText = "Start";
    FLTimer.timerActive = false;
    timerDisplay.innerText = "Stop!";
    clearInterval(alertInterval);
    clearInterval(timerInterval);
    document.querySelector("body").classList.remove("negative");
  },
};

document.addEventListener("click", (e: any) =>
  FLTimer.handleClick(e.target.id)
);
