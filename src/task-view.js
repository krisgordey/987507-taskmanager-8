import {MONTHS_NAMES} from './constants.js';
import Component from "./component";

export default class TaskView extends Component {
  constructor(data) {
    super();
    this._color = data.color;
    this._title = data.title;
    this._dueDate = data.dueDate;
    this._tags = data.tags;
    this._picture = data.picture;
    this._repeatingDays = {...data.repeatingDays};
    this._isFavorite = data.isFavorite;
    this._onEdit = null;

    this._onEditButtonClick = this._onEditButtonClick.bind(this);
  }

  _getTags(tagsSet) {
    return [...tagsSet].map((item) => `<span class="card__hashtag-inner">
    <input type="hidden" name="hashtag" value="${item}"
    class="card__hashtag-hidden-input"/>
    <button type="button" class="card__hashtag-name">
    ${item}
    </button>
    <button type="button" class="card__hashtag-delete">
    delete
    </button>
    </span>`).join(``);
  }

  _isRepeating() {
    return Object.values(this._repeatingDays).some((it) => it === true);
  }

  _formatAMPM(date) {
    return date.toLocaleString(`en-US`, {hour: `2-digit`, minute: `2-digit`});
  }

  _isExpiredTask(dueDate) {
    return dueDate ? (Date.now() - dueDate.getTime()) > 0 : false;
  }

  get template() {
    return `<article class="card card--${this._color} ${this._isRepeating() ? `card--repeat` : ``} ${this._isExpiredTask(this._dueDate) ? `card--deadline` : ``}">
            <form class="card__form" method="get">
              <div class="card__inner">
                <div class="card__control">
                  <button type="button" class="card__btn card__btn--edit">
                    edit
                  </button>
                  <button type="button" class="card__btn card__btn--archive">
                    archive
                  </button>
                  <button
                    type="button"
                    class="card__btn card__btn--favorites ${this._isFavorite ? `` : `card__btn--disabled`}"
                  >
                    favorites
                  </button>
                </div>

                <div class="card__color-bar">
                  <svg class="card__color-bar-wave" width="100%" height="10">
                    <use xlink:href="#wave"></use>
                  </svg>
                </div>

                <div class="card__textarea-wrap">
                  <label>
                    <textarea
                      class="card__text"
                      placeholder="Start typing your text here..."
                      name="text"
                    >${this._title}</textarea
                    >
                  </label>
                </div>
                           
            <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <button class="card__date-deadline-toggle" type="button">
                  date: <span class="card__date-status">${this._dueDate ? `yes` : `no`}</span>
                </button>
    
                ${this._dueDate ? `<fieldset class="card__date-deadline">
                  <label class="card__input-deadline-wrap">
                    <input
                      class="card__date"
                      type="text"
                      placeholder="${this._dueDate.getDate()} ${MONTHS_NAMES[this._dueDate.getMonth()]}"
                      name="date"
                      value="${this._dueDate.getDate()}  ${MONTHS_NAMES[this._dueDate.getMonth()]}"
                    />
                  </label>
                  <label class="card__input-deadline-wrap">
                    <input
                      class="card__time"
                      type="text"
                      placeholder="${this._formatAMPM(this._dueDate)}"
                      name="time"
                      value="${this._formatAMPM(this._dueDate)}"
                    />
                  </label>
                </fieldset>` : ``}
               </div>
    
              <div class="card__hashtag">
                <div class="card__hashtag-list">
                ${this._tags ? this._getTags(this._tags) : ``}
                </div>
    
                <label>
                  <input
                    type="text"
                    class="card__hashtag-input"
                    name="hashtag-input"
                    placeholder="Type new hashtag here"
                  />
                </label>
              </div>
            </div>
    
            <label class="card__img-wrap">
              <input
                type="file"
                class="card__img-input visually-hidden"
                name="img"
              />
              <img
                src="${this._picture}"
                alt="task picture"
                class="card__img"
              />
            </label>
          <div class="card__status-btns">
            <button class="card__save" type="submit">save</button>
            <button class="card__delete" type="button">delete</button>
          </div>
              </div>
            </form>
          </article>`;
  }

  _onEditButtonClick() {
    return typeof this._onEdit === `function` && this._onEdit();
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  addListeners() {
    this._element.querySelector(`.card__btn--edit`)
      .addEventListener(`click`, this._onEditButtonClick);
  }

  removeListeners() {
    this._element.querySelector(`.card__btn--edit`)
      .removeEventListener(`click`, this._onEditButtonClick);
  }

  update(data) {
    this._title = data.title;
    this._tags = data.tags;
    this._color = data.color;
    this._repeatingDays = {...data.repeatingDays};
  }
}
