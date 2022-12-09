class Timer {
  constructor(timerEl, timerMinutesEl, timerSecondsEl, timerToggleEl, timerSettingsEl) {
    this._timerEl = timerEl;
    this._timerMinutesEl = timerMinutesEl;
    this._timerSecondsEl = timerSecondsEl;
    this._timerToggleEl = timerToggleEl;
    this._timerSettingsEl = timerSettingsEl;

    this._finishTime = null;
    this._minutes = 15;
    this._seconds = 0;
    this._percent = 100;

    this._initialTimeAmount = null;
    this._timeInterval = null;
    this._timerToggleEl.onclick = () => this.start();
    this._timerSettingsEl.onclick = () => this.edit();
  }

  set finishTime(value) {
    if (!(value instanceof Date && !isNaN(value))) return;
    this._finishTime = value;
    this._finishTime.setMinutes(this._finishTime.getMinutes() + this._minutes);
    this._finishTime.setSeconds(this._finishTime.getSeconds() + this._seconds);
    this._initialTimeAmount = this._finishTime.getTime() - Date.now();
  }
  get finishTime() {
    return this._finishTime.getTime();
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

  set percent(value) {
    this._percent = value;
    document.documentElement.style.setProperty('--percent',  `${value}%`);
  }
  get percent() {
    return this._percent;
  }

  start() {
    this._timerEl.classList.toggle('timer--active');
    this._timerToggleEl.innerText = 'STOP';
    this._timerToggleEl.onclick = () => this.stop();

    this.finishTime = new Date();

    setTimeout(() => this.countTime(), 200);
    this._timeInterval = setInterval(() => this.countTime(), 1000);
  }

  stop() {
    clearInterval(this._timeInterval);
    this.percent = 100;
    this._timerEl.classList.toggle('timer--active');
    this._timerToggleEl.innerText = 'START';
    this._timerToggleEl.onclick = () => this.start();
  }

  finish() {
    this.stop();
    this.minutes = 0;
    this.seconds = 0;
    alert('Timer is finished!');
  }

  countTime() {
    const dif = this.finishTime - Date.now();

    this.minutes = Math.floor((dif % (1000 * 60 * 60)) / (1000 * 60));
    this.seconds = Math.floor((dif % (1000 * 60)) / 1000);
    this.percent = Math.floor((dif / this._initialTimeAmount) * 100);

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
