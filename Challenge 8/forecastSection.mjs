export default class ForecastSection {
  constructor(options = {}) {
    this.date = new Date(options.date || '');

    this.temperature = options.temperature || '65';
    this.humidity = options.humidity || '84';
    this.pressure = options.pressure || '28';
  }

  get weekDay() {
    return 'SUN'
  }

  get monthDay() {
    return 9
  }

  render() {
    return `
    <section class="forecast__section">
      <div class="forecast__date">
        <time class="forecast__week-day">${weekDay}</time>
        <time class="forecast__month-day">${monthDay}</time>
      </div>
      <div class="forecast__weather forecast__weather--sunny">
        <svg class="forecast__image" role="img" width="208" height="213" viewBox="0 0 208 213">
          <use xlink:href="#sunny"></use>
        </svg>
        <p class="forecast__degrees">${this.temperature}</p>
        <div class="forecast__humidity">
          <span class="forecast__humidity-icon"></span>
          <p class="forecast__humidity-value">${this.humidity}</p>
        </div>
        <div class="forecast__pressure">
          <span class="forecast__pressure-icon"></span>
          <p class="forecast__pressure-value">${this.pressure}</p>
        </div>
      </div>
    </section>
    `
  }
}
