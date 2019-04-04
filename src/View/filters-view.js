import Component from '../helpers/component';
import {BLANK_GROUPED_TASKS} from "../helpers/constants";

export default class FiltersView extends Component {
  constructor() {
    super();
    this._tasks = BLANK_GROUPED_TASKS;
  }

  set tasks(tasks) {
    this._tasks = tasks;

    this._element.innerHTML = this._getFiltersMarkup();
  }

  get template() {
    return `<section class="main__filter filter container">${this._getFiltersMarkup()}</section>`;
  }

  _getFiltersMarkup() {
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

    return filtersMarkup;
  }

  addListeners() {
    this._element.addEventListener(`change`, (evt) => this._onFilter(evt.target.dataset.category));
  }

  set onFilter(fn) {
    this._onFilter = fn;
  }
}
