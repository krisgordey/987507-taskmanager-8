import {KeyCodes, BUTTONS_COLORS, BLANK_REPEATED_DAYS} from '../helpers/constants.js';
import utils from '../helpers/utils';
import Component from '../helpers/component';
import flatpickr from 'flatpickr';
import moment from 'moment';

const colorClasses = {
  blue: `card--blue`,
  black: `card--black`,
  yellow: `card--yellow`,
  green: `card--green`,
  pink: `card--pink`,
};
export default class TaskEdit extends Component {
  constructor(data) {
    super();
    this._id = data.id;
    this._isDone = data.isDone;
    this._color = data.color;
    this._title = data.title;
    this._dueDate = data.dueDate;
    this._tags = new Set([...data.tags]);
    this._picture = data.picture;
    this._repeatingDays = {...data.repeatingDays};
    this._isFavorite = data.isFavorite;

    this._onSubmit = null;
    this._onClose = null;

    this._onCloseCase = this._onCloseCase.bind(this);
    this._onSubmitCase = this._onSubmitCase.bind(this);
    this._onTitleChange = this._onTitleChange.bind(this);
    this._onColorChange = this._onColorChange.bind(this);
    this._onChangeRepeated = this._onChangeRepeated.bind(this);
    this._onChangeRepeatedDay = this._onChangeRepeatedDay.bind(this);
    this._onDeleteTag = this._onDeleteTag.bind(this);
    this._onAddTag = this._onAddTag.bind(this);
    this._onChangeDate = this._onChangeDate.bind(this);
    this._onDeleteCase = this._onDeleteCase.bind(this);
  }

  initState() {
    this._state.isRepeated = this._isRepeating();
    this._state.isDate = !!this._dueDate;
    this._state.isError = false;
  }

  _getTag(tag) {
    return `<span class="card__hashtag-inner">
        <input type="hidden" name="hashtag" value="${tag}"
        class="card__hashtag-hidden-input"/>
        <button type="button" class="card__hashtag-name">
        ${tag}
        </button>
        <button type="button" class="card__hashtag-delete">
        delete
        </button>
      </span>`;
  }

  _getTags(tagsSet) {
    return [...tagsSet].map((item) => this._getTag(item)).join(``);
  }

  _getRepeatingDaysMarkup() {
    let daysInputsMarkup = ``;

    for (let key of Object.keys(this._repeatingDays)) {
      daysInputsMarkup += `<input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-${key}-4" 
        name="repeat" value="${key}" ${this._repeatingDays[key] === true ? `checked` : ``}>
      <label class="card__repeat-day" for="repeat-${key}-4">${key}</label>`;
    }

    return `<fieldset class="card__repeat-days">
              <div class="card__repeat-days-inner">
                ${daysInputsMarkup}
              </div>
            </fieldset>`;
  }

  _getDueDateMarkup() {
    return `<fieldset class="card__date-deadline">
              <label class="card__input-deadline-wrap">
                <input
                  class="card__date"
                  type="text"
                  placeholder="23 September"
                  name="date"
                  value="${this._dueDate ? moment(this._dueDate).format(`DD MMMM`) : moment().add(1, `days`).format(`DD MMMM`)}"
                />
              </label>
              <label class="card__input-deadline-wrap">
                <input
                  class="card__time"
                  type="text"
                  placeholder="11:15 PM"
                  name="time"
                  value="${this._dueDate ? moment(this._dueDate).format(`hh:mm a`) : moment().add(1, `days`).format(`hh:mm a`)}"
                />
              </label>
            </fieldset>`;
  }

  _getColorButtonsMarkup(colors) {
    return colors.map((color) => `<input
                  type="radio"
                  id="color-${color}-4"
                  class="card__color-input card__color-input--${color} visually-hidden"
                  name="color"
                  value="${color}"
                  ${color === this._color ? `checked` : ``}
                />
                <label
                  for="color-${color}-4"
                  class="card__color card__color--${color}"
                  >${color}</label
                >`).join(``);
  }

  _isRepeating() {
    return Object.values(this._repeatingDays).some((it) => it === true);
  }

  _isExpiredTask(dueDate) {
    return dueDate ? (Date.now() - dueDate.getTime()) > 0 : false;
  }

  get template() {
    return `<article class="card card--edit ${colorClasses[this._color]} ${this._isRepeating() ? `card--repeat` : ``} ${this._isExpiredTask(this._dueDate) ? `card--deadline` : ``}">
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
                ${this._dueDate ? `${this._getDueDateMarkup()}` : ``}
    
                <button class="card__repeat-toggle" type="button">
                  repeat:<span class="card__repeat-status">${this._state.isRepeated ? `yes` : `no`}</span>
                </button>
                ${this._state.isRepeated ? `${this._getRepeatingDaysMarkup()}` : ``}
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
    
            <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              <div class="card__colors-wrap">
                ${this._getColorButtonsMarkup(BUTTONS_COLORS)}
              </div>
            </div>
          </div>
    
          <div class="card__status-btns">
            <button class="card__save" type="submit">save</button>
            <button class="card__delete" type="button">delete</button>
          </div>
              </div>
            </form>
          </article>`;
  }

  showError() {
    if (!this._state.isError) {
      this._state.isError = true;
      this._element.querySelector(`.card__inner`).classList.add(`shake`);
    } else {
      this._element.querySelector(`.card__inner`).classList.remove(`shake`);
      setTimeout(() => {
        this._element.querySelector(`.card__inner`).classList.add(`shake`);
      }, 10);
    }
  }

  set onSubmit(fn) {
    this._onSubmit = function () {
      if (this._state.isError) {
        this._state.isError = false;
        this._element.querySelector(`.card__inner`).classList.remove(`shake`);
      }

      let dueDate = null;

      if (this._state.isDate) {
        const date = this._element.querySelector(`.card__date`).value;
        const time = this._element.querySelector(`.card__time`).value;
        const timeStamp = moment(`${date} ${time}`, `DD MMMM hh:mm a`).valueOf();

        dueDate = new Date(timeStamp);
      }

      const updates = {
        id: this._id,
        title: this._title,
        color: this._color,
        tags: this._tags,
        picture: this._picture,
        isFavorite: this._isFavorite,
        isDone: this._isDone,
        repeatingDays: this._state.isRepeated ? this._repeatingDays : BLANK_REPEATED_DAYS,
        dueDate
      };
      this._element.querySelector(`.card__save`).setAttribute(`disabled`, true);

      fn(updates)
        .catch(() => {
          this.showError();
          this._element.querySelector(`.card__save`).removeAttribute(`disabled`);
        });
    };
  }

  set onClose(fn) {
    this._onClose = fn;
  }

  set onDelete(fn) {
    this._onDelete = fn;
  }

  _onSubmitCase(evt) {
    evt.preventDefault();
    return typeof this._onSubmit === `function` && this._onSubmit();
  }

  _onTitleChange(evt) {
    this._title = evt.target.value;
  }

  _onColorChange(evt) {
    this._element.classList.remove(colorClasses[this._color]);
    this._element.classList.add(colorClasses[evt.target.value]);

    this._color = evt.target.value;
  }

  _setUpCFlatpickr() {
    flatpickr(this._element.querySelector(`.card__date`), {altInput: true, altFormat: `j F`, dateFormat: `j F`});
    flatpickr(this._element.querySelector(`.card__time`), {enableTime: true, noCalendar: true, altInput: true, altFormat: `h:i K`, dateFormat: `h:i K`});
  }

  _onChangeDate() {
    this._state.isDate = !this._state.isDate;
    this._processDateBlock();

    if (this._state.isDate && this._state.isRepeated) {
      this._state.isRepeated = !this._state.isRepeated;
      this._processRepeatedBlock();
    }
  }

  _processDateBlock() {
    this._element.querySelector(`.card__date-status`).textContent = this._state.isDate ? `yes` : `no`;

    if (this._state.isDate) {
      const dueDateElement = utils.createElement(this._getDueDateMarkup());
      this._element.querySelector(`.card__date-deadline-toggle`).insertAdjacentElement(`afterend`, dueDateElement);

      this._setUpCFlatpickr();

    } else {
      this._element.querySelector(`.card__date-deadline`).remove();
    }
  }

  _onChangeRepeated() {
    this._state.isRepeated = !this._state.isRepeated;
    this._processRepeatedBlock();

    if (this._state.isRepeated && this._state.isDate) {
      this._state.isDate = !this._state.isDate;
      this._processDateBlock();
    }
  }

  _processRepeatedBlock() {
    this._element.querySelector(`.card__repeat-status`).textContent = this._state.isRepeated ? `yes` : `no`;

    if (this._state.isRepeated) {
      const repeatingDaysElement = utils.createElement(this._getRepeatingDaysMarkup());
      this._element.querySelector(`.card__repeat-toggle`).insertAdjacentElement(`afterend`, repeatingDaysElement);
    } else {
      this._element.querySelector(`.card__repeat-days`).remove();
    }
  }

  _onChangeRepeatedDay(evt) {
    if (evt.target.classList.contains(`card__repeat-day-input`)) {
      this._repeatingDays[evt.target.value] = evt.target.checked;
      this._state.isRepeated = Object.values(this._repeatingDays).some((it) => it === true);

      if (this._state.isRepeated && !this._element.classList.contains(`card--repeat`)) {
        this._element.classList.add(`card--repeat`);
      }
      if (!this._state.isRepeated) {
        this._element.classList.remove(`card--repeat`);
      }
    }
  }

  _onDeleteTag(evt) {
    if (evt.target.classList.contains(`card__hashtag-delete`)) {
      const hashtagValue = evt.target.parentNode.querySelector(`.card__hashtag-hidden-input`).value;
      this._tags.delete(hashtagValue);
      evt.target.closest(`.card__hashtag-inner`).remove();
    }
  }

  _onAddTag(evt) {
    if (evt.keyCode === KeyCodes.ENTER) {
      evt.preventDefault();
      const hashtags = event.target.value.split(` `)
        .filter((it) => it.startsWith(`#`)).join(``)
        .split(`#`)
        .filter((it) => (it.length >= 3 && it.length <= 8));

      if (hashtags[0] && !this._tags.has(hashtags[0]) && this._tags.size < 5) {
        this._tags.add(hashtags[0]);
        this._element.querySelector(`.card__hashtag-list`).appendChild(utils.createElement(this._getTag(hashtags[0])));
        event.target.value = ``;
      }
    }
  }

  _onCloseCase(evt) {
    if (
      (evt.type === `click` && this._element && !this._element.contains(evt.target) && evt.target.classList.contains(`card__btn`))
      || (evt.type === `keydown` && evt.keyCode === KeyCodes.ESCAPE)
      || (evt.type === `click` && evt.target === this._element.querySelector(`.card__btn--edit`))
    ) {
      // evt.stopPropagation();
      return typeof this._onClose === `function` && this._onClose();
    }
    return undefined;
  }

  _onDeleteCase() {
    return typeof this._onDelete === `function` && this._onDelete();
  }

  addListeners() {
    this._element.querySelector(`.card__form`)
      .addEventListener(`submit`, this._onSubmitCase);
    document.body.addEventListener(`click`, this._onCloseCase, true);
    document.body.addEventListener(`keydown`, this._onCloseCase);
    this._element.querySelector(`.card__text`).addEventListener(`change`, this._onTitleChange);
    this._element.querySelector(`.card__colors-wrap`).addEventListener(`change`, this._onColorChange);
    this._element.querySelector(`.card__repeat-toggle`).addEventListener(`click`, this._onChangeRepeated);
    this._element.querySelector(`.card__dates`).addEventListener(`change`, this._onChangeRepeatedDay);
    this._element.querySelector(`.card__hashtag-list`).addEventListener(`click`, this._onDeleteTag);
    this._element.querySelector(`.card__hashtag-input`).addEventListener(`keydown`, this._onAddTag);
    this._element.querySelector(`.card__delete`).addEventListener(`click`, this._onDeleteCase);
    this._element.querySelector(`.card__date-deadline-toggle`).addEventListener(`click`, this._onChangeDate);

    if (this._state.isDate) {
      this._setUpCFlatpickr();
    }
  }

  removeListeners() {
    this._element.querySelector(`.card__form`)
      .removeEventListener(`submit`, this._onSubmitCase);
    document.body.removeEventListener(`click`, this._onCloseCase, true);
    document.body.removeEventListener(`keydown`, this._onCloseCase);
    this._element.querySelector(`.card__text`, this._onTitleChange);
    this._element.querySelector(`.card__colors-wrap`).removeEventListener(`change`, this._onColorChange);
    this._element.querySelector(`.card__repeat-toggle`).removeEventListener(`click`, this._onChangeRepeated);
    this._element.querySelector(`.card__dates`).removeEventListener(`change`, this._onChangeRepeatedDay);
    this._element.querySelector(`.card__hashtag-list`).removeEventListener(`click`, this._onDeleteTag);
    this._element.querySelector(`.card__hashtag-input`).removeEventListener(`keydown`, this._onAddTag);
    this._element.querySelector(`.card__delete`).removeEventListener(`click`, this._onDeleteCase);
    this._element.querySelector(`.card__date-deadline-toggle`).removeEventListener(`click`, this._onChangeDate);
  }

  update(data) {
    this._title = data.title;
    this._tags = data.tags;
    this._color = data.color;
    this._repeatingDays = {...data.repeatingDays};
    this._dueDate = data.dueDate;
  }
}
