import Component from '../helpers/component';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import flatpickr from 'flatpickr';
import utils from "../helpers/utils";
import moment from 'moment';

const daysChartData = {
  plugins: [ChartDataLabels],
  type: `line`,
  data: {
    labels: [`01 FEB`, `02 FEB`, `03 FEB`, `04 FEB`, `05 FEB`, `06 FEB`, `07 FEB`],
    datasets: [{
      data: [4, 6, 3, 1, 5, 2, 0],
      backgroundColor: `transparent`,
      borderColor: `#000000`,
      borderWidth: 1,
      lineTension: 0,
      pointRadius: 8,
      pointHoverRadius: 8,
      pointBackgroundColor: `#000000`
    }]
  },
  options: {
    plugins: {
      datalabels: {
        font: {
          size: 8
        },
        color: `#ffffff`
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          display: false
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }],
      xAxes: [{
        ticks: {
          fontStyle: `bold`,
          fontColor: `#000000`
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }]
    },
    legend: {
      display: false
    },
    layout: {
      padding: {
        top: 10
      }
    },
    tooltips: {
      enabled: false
    }
  }
};

const tagsChartData = {
  plugins: [ChartDataLabels],
  type: `pie`,
  data: {
    labels: [`#watchstreams`, `#relaxation`, `#coding`, `#sleep`, `#watermelonpies`],
    datasets: [{
      data: [20, 15, 10, 5, 2],
      backgroundColor: [`#ff3cb9`, `#ffe125`, `#0c5cdd`, `#000000`, `#31b55c`]
    }]
  },
  options: {
    plugins: {
      datalabels: {
        display: false
      }
    },
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          const allData = data.datasets[tooltipItem.datasetIndex].data;
          const tooltipData = allData[tooltipItem.index];
          const total = allData.reduce((acc, it) => acc + parseFloat(it));
          const tooltipPercentage = Math.round((tooltipData / total) * 100);
          return `${tooltipData} TASKS — ${tooltipPercentage}%`;
        }
      },
      displayColors: false,
      backgroundColor: `#ffffff`,
      bodyFontColor: `#000000`,
      borderColor: `#000000`,
      borderWidth: 1,
      cornerRadius: 0,
      xPadding: 15,
      yPadding: 15
    },
    title: {
      display: true,
      text: `DONE BY: TAGS`,
      fontSize: 16,
      fontColor: `#000000`
    },
    legend: {
      position: `left`,
      labels: {
        boxWidth: 15,
        padding: 25,
        fontStyle: 500,
        fontColor: `#000000`,
        fontSize: 13
      }
    }
  }
};

const colorsChartData = {
  plugins: [ChartDataLabels],
  type: `pie`,
  data: {
    labels: [`#pink`, `#yellow`, `#blue`, `#black`, `#green`],
    datasets: [{
      data: [5, 25, 15, 10, 30],
      backgroundColor: [`#ff3cb9`, `#ffe125`, `#0c5cdd`, `#000000`, `#31b55c`]
    }]
  },
  options: {
    plugins: {
      datalabels: {
        display: false
      }
    },
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          const allData = data.datasets[tooltipItem.datasetIndex].data;
          const tooltipData = allData[tooltipItem.index];
          const total = allData.reduce((acc, it) => acc + parseFloat(it));
          const tooltipPercentage = Math.round((tooltipData / total) * 100);
          return `${tooltipData} TASKS — ${tooltipPercentage}%`;
        }
      },
      displayColors: false,
      backgroundColor: `#ffffff`,
      bodyFontColor: `#000000`,
      borderColor: `#000000`,
      borderWidth: 1,
      cornerRadius: 0,
      xPadding: 15,
      yPadding: 15
    },
    title: {
      display: true,
      text: `DONE BY: COLORS`,
      fontSize: 16,
      fontColor: `#000000`
    },
    legend: {
      position: `left`,
      labels: {
        boxWidth: 15,
        padding: 25,
        fontStyle: 500,
        fontColor: `#000000`,
        fontSize: 13
      }
    }
  }
};

export default class StatisticView extends Component {
  constructor(tasks) {
    super();
    this._tasks = tasks;
    this._daysChart = null;
    this._tagsChart = null;
    this._colorsChart = null;
    this._tagChartColors = [];
    this._onDateChanged = this._onDateChanged.bind(this);
  }

  get template() {
    return `<section class="statistic container">
        <div class="statistic__line">
          <div class="statistic__period">
            <h2 class="statistic__period-title">Task Activity DIAGRAM</h2>

            <div class="statistic-input-wrap">
              <input
                class="statistic__period-input"
                type="text"
                placeholder="01 Feb - 08 Feb"
              />
            </div>

            <p class="statistic__period-result">
              In total for the specified period
              <span class="statistic__task-found">0</span> tasks were fulfilled.
            </p>
          </div>
          <div class="statistic__line-graphic visually-hidden">
            <canvas class="statistic__days" width="550" height="150"></canvas>
          </div>
        </div>

        <div class="statistic__circle">
          <div class="statistic__tags-wrap visually-hidden">
            <canvas class="statistic__tags" width="400" height="300"></canvas>
          </div>
          <div class="statistic__colors-wrap visually-hidden">
            <canvas class="statistic__colors" width="400" height="300"></canvas>
          </div>
        </div>
      </section>`;
  }

  _setUpFlatpickr() {
    flatpickr(this._element.querySelector(`.statistic__period-input`), {
      mode: `range`,
      altInput: true,
      altFormat: `d M`,
      dateFormat: `d M`,
      defaultDate: [
        moment().startOf(`week`).format(`DD MMM`),
        moment().endOf(`week`).format(`DD MMM`)
      ],
      locale: {
        rangeSeparator: ` - `
      },
      onClose: this._onDateChanged,
    });
  }

  render() {
    this.initState();
    this._element = utils.createElement(this.template);
    this.addListeners();

    this._setUpFlatpickr();
    return this._element;
  }

  updateCharts() {
    this._updateDaysChart();
    this._updateTagsChart();
    this._updateColorsChart();
  }

  _updateDaysChart() {
    if (!this._daysChart) {
      const daysCtx = this._element.querySelector(`.statistic__days`);
      this._daysChart = new Chart(daysCtx, daysChartData);
    }

    const dateInputElement = this._element.querySelector(`.statistic__period-input`);
    const dates = dateInputElement.value.split(` - `);
    const startDate = moment(dates[0], `DD MMM`).startOf(`day`);
    const endDate = dates.length > 1 ? moment(dates[1], `DD MMM`).endOf(`day`) : startDate;
    const filteredTasks = this._tasks.all.filter((task) => {
      return task.dueDate && moment(task.dueDate).isBetween(startDate, endDate);
    });

    this._updateTaskCount(filteredTasks.length);

    const counts = [];
    const labels = [];
    let tempDay = moment(startDate);
    while (tempDay.isBefore(endDate)) {
      labels.push(tempDay.format(`D MMM`));
      counts.push(filteredTasks.filter((task) =>{
        return task.dueDate && moment(task.dueDate).isSame(tempDay, `day`);
      }).length);
      tempDay = moment(tempDay).add(1, `days`);
    }

    this._daysChart.config.data.datasets[0].data = counts;
    this._daysChart.data.labels = labels;
    this._daysChart.update();
  }

  _updateTaskCount(count) {
    const countElement = this._element.querySelector(`.statistic__task-found`);
    countElement.textContent = count;
  }

  _updateTagsChart() {
    if (!this._tagsChart) {
      const tagsElement = this._element.querySelector(`.statistic__tags`);
      this._tagsChart = new Chart(tagsElement, tagsChartData);
    }

    const tasksTags = this._tasks.tags.reduce((acc, task) => acc.concat(Array.from(task.tags)), []);
    const tags = tasksTags.reduce((acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    }, {});

    const labels = Object.keys(tags);
    const counts = Object.values(tags);

    if (this._tagChartColors.length < counts.length) {
      this._tagChartColors = Array.from({length: counts.length}, ()=> utils.getRandomColorHex());
    }

    this._tagsChart.config.data.datasets[0].data = counts;
    this._tagsChart.config.data.datasets[0].backgroundColor = this._tagChartColors;
    this._tagsChart.data.labels = labels;
    this._tagsChart.update();
  }

  _updateColorsChart() {
    if (!this._colorsChart) {
      const colorsElement = this._element.querySelector(`.statistic__colors`);
      this._colorsChart = new Chart(colorsElement, colorsChartData);
    }

    const colors = {
      [`#pink`]: 0,
      [`#yellow`]: 0,
      [`#blue`]: 0,
      [`#black`]: 0,
      [`#green`]: 0,
    };

    for (const task of this._tasks.all) {
      colors[`#` + task.color]++;
    }

    const labels = Object.keys(colors);
    const counts = Object.values(colors);

    this._colorsChart.config.data.datasets[0].data = counts;
    this._colorsChart.data.labels = labels;
    this._colorsChart.update();
  }

  _onDateChanged() {
    this._updateDaysChart();
  }
}
