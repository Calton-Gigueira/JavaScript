const startButtonElement = document.querySelector('#js-start-button');
const stopButtonElement = document.querySelector('#js-stop-button');
const resetButtonElement = document.querySelector('#js-reset-button');
const timerElement = document.querySelector('#js-timer');

let count = JSON.parse(localStorage.getItem('count')) || 0;
let isCounting = false;
let intervalId;

function countingTimer() {
    if (!isCounting) {
        intervalId = setInterval(() => {
            count++;
            timerElement.innerHTML = 'Timer:\n';
            timerElement.innerHTML += count;
            localStorage.setItem('count', JSON.stringify(count));
        }, 1000);
        isCounting = true;
    }
}

startButtonElement.addEventListener('click', countingTimer());

resetButtonElement.addEventListener('click', () => {
    clearInterval(intervalId);
    localStorage.removeItem('count');
    timerElement.innerHTML = 0;
    startButtonElement.innerHTML = 'Start';
});

stopButtonElement.addEventListener('click', () => {
    clearInterval(intervalId);
    isCounting = false;
    startButtonElement.innerHTML = 'Continue';
})
