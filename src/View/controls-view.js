import Component from '../helpers/component';

export default class FiltersView extends Component {
  constructor() {
    super();
  }

  get template() {
    const controlsData = [
      {
        name: `tasks`,
        header: `TASKS`,
      },
      {
        name: `add-new-task`,
        header: `ADD NEW TASKS`,
      },
      {
        name: `statistic`,
        header: `STATISTIC`,
      },
      {
        name: `search`,
        header: `SEARCH`,
      },
    ];
    let controlsMarkup = ``;
    for (let control of controlsData) {
      controlsMarkup += `<input
            type="radio"
            name="control"
            id="control__${control.name}"
            class="control__input visually-hidden"
            ${control.name === `tasks` ? `checked` : ``}
            data-control="${control.name}"
          />
          <label for="control__${control.name}" class="control__label">${control.header}</label>`;
    }

    return `<section class="main__control control container">
        <h1 class="control__title">UNFO. TASKMANAGER</h1>
        <section class="control__btn-wrap">
          ${controlsMarkup}
        </section>
      </section>`;
  }

  set onControl(fn) {
    this._onControl = fn;
  }

  addListeners() {
    this._element.addEventListener(`change`, (evt) => this._onControl(evt.target.dataset.control));
  }

}
