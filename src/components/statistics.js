import {AbstractSmartComponent} from './abstract-smart-component.js';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {EventTypes} from '../mock/event.js';
import moment from 'moment';

const getUniqItems = (item, index, array) => {
  return array.indexOf(item) === index;
};

const renderMoneyChart = (moneyCtx, points) => {
  const tags = points.map((point) => point.eventType)
    .filter(getUniqItems);

  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: tags.map((tag) => tag.toUpperCase()),
      datasets: [{
        data: tags.map((tag) => points
          .filter((point) => point.eventType === tag)
          .map((point) => point.price)
          .reduce((accumulator, currentValue) => accumulator + currentValue)
        ),
        backgroundColor: tags.map((_) => `rgb(255,255,255)`),
        minBarLength: 30
      }]
    },
    options: {
      plugins: {
        datalabels: {
          color: `#000000`,
          font: {
            weight: `bold`,
            size: 16,
          },
          anchor: `end`,
          align: `start`,
          formatter: (value) => {
            return `€ ` + value;
          }
        }
      },
      title: {
        display: true,
        position: `left`,
        text: `MONEY`,
        fontSize: 24,
        fontColor: `#000000`
      },
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          gridLines: {
            display: false
          },
          ticks: {
            display: false
          }
        }],
        yAxes: [{
          gridLines: {
            display: false
          },
          ticks: {
            fontSize: 12,
            fontStyle: `bold`,
            fontColor: `#000000`
          }
        }]
      }
    },
  });
};

const renderTransportChart = (transportCtx, points) => {
  const filteredPoints = points
    .filter((point) => EventTypes.Transport.includes(point.eventType))
    .map((point) => point.eventType)
    .filter(getUniqItems);

  const transports = filteredPoints.map((filtered) => {
    return {
      eventType: filtered,
      counter: points.filter((point) => point.eventType === filtered).length
    };
  });

  return new Chart(transportCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: transports.map((transport) => transport.eventType.toUpperCase()),
      datasets: [{
        data: transports.map((transport) => transport.counter),
        backgroundColor: transports.map((_) => `rgb(255,255,255)`),
        minBarLength: 30
      }]
    },
    options: {
      plugins: {
        datalabels: {
          color: `#000000`,
          font: {
            weight: `bold`,
            size: 16,
          },
          anchor: `end`,
          align: `start`,
          formatter: (value) => {
            return `x` + value;
          }
        }
      },
      title: {
        display: true,
        position: `left`,
        text: `TRANSPORT`,
        fontSize: 24,
        fontColor: `#000000`
      },
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          gridLines: {
            display: false
          },
          ticks: {
            display: false
          }
        }],
        yAxes: [{
          gridLines: {
            display: false
          },
          ticks: {
            fontSize: 12,
            fontStyle: `bold`,
            fontColor: `#000000`
          }
        }]
      }
    },
  });
};

const renderTimeChart = (timeCtx, points) => {
  const filteredPoints = points
    .map((point) => point.city)
    .filter(getUniqItems);

  const times = filteredPoints.map((filtered) => {
    let hours = 0;

    points
      .filter((point) => point.city === filtered)
      .forEach((point) => {
        const dateB = moment(point.date.eventEndDate);
        const dateA = moment(point.date.eventStartDate);
        const duration = moment.duration(dateB.diff(dateA));
        hours = hours + duration.asHours();
      });

    return {
      city: filtered,
      duration: Math.ceil(hours)
    };
  });

  return new Chart(timeCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: times.map((time) => time.city.toUpperCase()),
      datasets: [{
        data: times.map((time) => time.duration),
        backgroundColor: times.map((_) => `rgb(255,255,255)`),
        minBarLength: 30
      }]
    },
    options: {
      plugins: {
        datalabels: {
          color: `#000000`,
          font: {
            weight: `bold`,
            size: 16,
          },
          anchor: `end`,
          align: `start`,
          formatter: (value) => {
            return value + `H`;
          }
        }
      },
      title: {
        display: true,
        position: `left`,
        text: `TIME`,
        fontSize: 24,
        fontColor: `#000000`
      },
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          gridLines: {
            display: false
          },
          ticks: {
            display: false
          }
        }],
        yAxes: [{
          gridLines: {
            display: false
          },
          ticks: {
            fontSize: 12,
            fontStyle: `bold`,
            fontColor: `#000000`
          }
        }]
      }
    },
  });
};

class Statistics extends AbstractSmartComponent {
  constructor(points) {
    super();
    this._points = points;

    this._moneyCtx = null;
    this._transportCtx = null;
    this._timeCtx = null;

    this._renderCharts();
  }

  recoveryListeners() {}

  rerender() {
    super.rerender();

    this._renderCharts();
  }

  _renderCharts() {
    const moneyCtx = this.getElement().querySelector(`.statistics__chart--money`).getContext(`2d`);
    const transportCtx = this.getElement().querySelector(`.statistics__chart--transport`).getContext(`2d`);
    const timeCtx = this.getElement().querySelector(`.statistics__chart--time`).getContext(`2d`);

    this._resetCharts();

    this._moneyCtx = renderMoneyChart(moneyCtx, this._points.getPoints());
    this._transportCtx = renderTransportChart(transportCtx, this._points.getPoints());
    this._timeCtx = renderTimeChart(timeCtx, this._points.getPoints());
  }

  _resetCharts() {
    if (this._moneyCtx) {
      this._moneyCtx.destroy();
      this._moneyCtx = null;
    }

    if (this._transportCtx) {
      this._transportCtx.destroy();
      this._transportCtx = null;
    }

    if (this._timeCtx) {
      this._timeCtx.destroy();
      this._timeCtx = null;
    }
  }

  getTemplate() {
    return (
      `<section class="statistics visually-hidden">
        <h2>Trip statistics</h2>

        <div class="statistics__item statistics__item--money">
          <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
        </div>

        <div class="statistics__item statistics__item--transport">
          <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
        </div>

        <div class="statistics__item statistics__item--time-spend">
          <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
        </div>
      </section>`
    );
  }
}

export {Statistics};
