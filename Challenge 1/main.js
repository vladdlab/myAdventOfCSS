class Timer {
  constructor(timerEl, timerMinutesEl, timerSecondsEl, timerToggleEl, timerSettingsEl) {
    this._timerEl = timerEl;
    this._timerMinutesEl = timerMinutesEl;
    this._timerSecondsEl = timerSecondsEl;
    this._timerToggleEl = timerToggleEl;
    this._timerSettingsEl = timerSettingsEl;


    this._countDownDate = null;
    this._minutes = 15;
    this._seconds = 0;

    this._timeInterval = null;
    this._timerToggleEl.onclick = () => this.start();
    this._timerSettingsEl.onclick = () => this.edit();
  }

  set minutes(value) {
    this._minutes = value;
    this._timerMinutesEl.value = this.minutes;
  }
  get minutes() {
    return this._minutes >= 10 ? this._minutes : `0${this._minutes}`;
  }
  set seconds(value) {
    this._seconds = value;
    this._timerSecondsEl.value = this.seconds;
  }
  get seconds() {
    return this._seconds >= 10 ? this._seconds : `0${this._seconds}`;
  }

  start() {
    this._timerEl.classList.toggle('timer--active');
    this._timerToggleEl.innerText = 'STOP';
    this._timerToggleEl.onclick = () => this.stop();
    this._countDownDate = new Date();
    this._countDownDate.setMinutes(this._countDownDate.getMinutes() + this._minutes);
    this._countDownDate.setSeconds(this._countDownDate.getSeconds() + this._seconds);
    setTimeout(() => this.countTime(), 200);
    this._timeInterval = setInterval(() => this.countTime(), 1000);
  }

  stop() {
    this._timerEl.classList.toggle('timer--active');
    clearInterval(this._timeInterval);
    this._timerToggleEl.innerText = 'START';
    this._timerToggleEl.onclick = () => this.start();
  }

  finish() {
    this._timerEl.classList.toggle('timer--active');
    clearInterval(this._timeInterval);
    this._timerToggleEl.innerText = 'START';
    this._timerToggleEl.onclick = () => this.start();
    this.minutes = 0;
    this.seconds = 0;
  }

  countTime() {
    const dif = this._countDownDate.getTime() - Date.now();
    this.minutes = Math.floor((dif % (1000 * 60 * 60)) / (1000 * 60));
    this.seconds = Math.floor((dif % (1000 * 60)) / 1000);
    if (this._minutes <= 0 && this._seconds <= 0) this.finish();
  }

  edit() {
    this._timerEl.classList.toggle('timer--editing');
    this._timerMinutesEl.readOnly = !this._timerMinutesEl.readOnly;
    this._timerSecondsEl.readOnly = !this._timerSecondsEl.readOnly;
    let newMinutes = Number.parseInt(this._timerMinutesEl.value);
    let newSeconds = Number.parseInt(this._timerSecondsEl.value);
    this.minutes = Number.isNaN(newMinutes) ? 15 : newMinutes;
    this.seconds = Number.isNaN(newSeconds) ? 0 : newSeconds;
  }
}


const timerEl = document.querySelector('.timer');
const timerMinutesEl = document.querySelector('.timer__minutes');
const timerSecondsEl = document.querySelector('.timer__seconds');
const timerToggleEl = document.querySelector('.timer__toggle');
const timerSettingsEl = document.querySelector('.timer__settings');

const timer = new Timer(timerEl, timerMinutesEl, timerSecondsEl, timerToggleEl, timerSettingsEl);
