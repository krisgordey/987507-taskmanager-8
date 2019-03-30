import Component from '../helpers/component';

export default class FiltersView extends Component {
  constructor(tasks) {
    super();
    this._tasks = tasks;
  }

  get template() {
    let filtersMarkup = ``;

    for (const key of Object.keys(this._tasks)) {
      filtersMarkup += `<input
      type="radio"
      id="filter__${key}"
      class="filter__input visually-hidden"
      name="filter"
      data-category="${key}"
      ${key === `all` ? `checked` : ``}
      ${this._tasks[key].length === 0 ? `disabled` : ``}
      />
      <label for="filter__${key}" class="filter__label">
        ${key} <span class="filter__${key}-count">${this._tasks[key].length}</span></label
      >`;
    }

    return `<section class="main__filter filter container">${filtersMarkup}</section>`;
  }

  addListeners() {
    this._element.addEventListener(`change`, (evt) => this._onFilter(evt.target.dataset.category));
  }

  set onFilter(fn) {
    this._onFilter = fn;
  }


}
