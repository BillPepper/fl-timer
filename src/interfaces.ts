export interface FLTimer {
    timerCount: number,
    timerActive: boolean,
    handleClick: (id: string) => void,
    toTwoDigits: (value: number) => string,
    setDisplay: (seconds: number) => void,
    trigger: () => void,
    alarm: () => void,
    finish: () => void,
    tick: () => void,
    showError: (message: string) => void,
    getInputMinutes: () => number,
    getInputSeconds: () => number,
    inputsAreValid: () => boolean,
    start: () => void,
    stop: () => void,
}