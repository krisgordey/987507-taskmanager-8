/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/create-card.js":
/*!****************************!*\
  !*** ./src/create-card.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const createCardDetailsAndSettings = () => {
  return `<div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <button class="card__date-deadline-toggle" type="button">
                  date: <span class="card__date-status">yes</span>
                </button>
    
                <fieldset class="card__date-deadline">
                  <label class="card__input-deadline-wrap">
                    <input
                      class="card__date"
                      type="text"
                      placeholder="23 September"
                      name="date"
                      value="23 September"
                    />
                  </label>
                  <label class="card__input-deadline-wrap">
                    <input
                      class="card__time"
                      type="text"
                      placeholder="11:15 PM"
                      name="time"
                      value="11:15 PM"
                    />
                  </label>
                </fieldset>
    
                <button class="card__repeat-toggle" type="button">
                  repeat:<span class="card__repeat-status">yes</span>
                </button>
    
                <fieldset class="card__repeat-days">
                  <div class="card__repeat-days-inner">
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-mo-4"
                      name="repeat"
                      value="mo"
                    />
                    <label class="card__repeat-day" for="repeat-mo-4"
                      >mo</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-tu-4"
                      name="repeat"
                      value="tu"
                      checked
                    />
                    <label class="card__repeat-day" for="repeat-tu-4"
                      >tu</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-we-4"
                      name="repeat"
                      value="we"
                    />
                    <label class="card__repeat-day" for="repeat-we-4"
                      >we</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-th-4"
                      name="repeat"
                      value="th"
                    />
                    <label class="card__repeat-day" for="repeat-th-4"
                      >th</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-fr-4"
                      name="repeat"
                      value="fr"
                      checked
                    />
                    <label class="card__repeat-day" for="repeat-fr-4"
                      >fr</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      name="repeat"
                      value="sa"
                      id="repeat-sa-4"
                    />
                    <label class="card__repeat-day" for="repeat-sa-4"
                      >sa</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-su-4"
                      name="repeat"
                      value="su"
                      checked
                    />
                    <label class="card__repeat-day" for="repeat-su-4"
                      >su</label
                    >
                  </div>
                </fieldset>
              </div>
    
              <div class="card__hashtag">
                <div class="card__hashtag-list">
                  <span class="card__hashtag-inner">
                    <input
                      type="hidden"
                      name="hashtag"
                      value="repeat"
                      class="card__hashtag-hidden-input"
                    />
                    <button type="button" class="card__hashtag-name">
                      #repeat
                    </button>
                    <button type="button" class="card__hashtag-delete">
                      delete
                    </button>
                  </span>
    
                  <span class="card__hashtag-inner">
                    <input
                      type="hidden"
                      name="hashtag"
                      value="repeat"
                      class="card__hashtag-hidden-input"
                    />
                    <button type="button" class="card__hashtag-name">
                      #cinema
                    </button>
                    <button type="button" class="card__hashtag-delete">
                      delete
                    </button>
                  </span>
    
                  <span class="card__hashtag-inner">
                    <input
                      type="hidden"
                      name="hashtag"
                      value="repeat"
                      class="card__hashtag-hidden-input"
                    />
                    <button type="button" class="card__hashtag-name">
                      #entertaiment
                    </button>
                    <button type="button" class="card__hashtag-delete">
                      delete
                    </button>
                  </span>
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
                src="img/sample-img.jpg"
                alt="task picture"
                class="card__img"
              />
            </label>
    
            <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              <div class="card__colors-wrap">
                <input
                  type="radio"
                  id="color-black-4"
                  class="card__color-input card__color-input--black visually-hidden"
                  name="color"
                  value="black"
                />
                <label
                  for="color-black-4"
                  class="card__color card__color--black"
                  >black</label
                >
                <input
                  type="radio"
                  id="color-yellow-4"
                  class="card__color-input card__color-input--yellow visually-hidden"
                  name="color"
                  value="yellow"
                  checked
                />
                <label
                  for="color-yellow-4"
                  class="card__color card__color--yellow"
                  >yellow</label
                >
                <input
                  type="radio"
                  id="color-blue-4"
                  class="card__color-input card__color-input--blue visually-hidden"
                  name="color"
                  value="blue"
                />
                <label
                  for="color-blue-4"
                  class="card__color card__color--blue"
                  >blue</label
                >
                <input
                  type="radio"
                  id="color-green-4"
                  class="card__color-input card__color-input--green visually-hidden"
                  name="color"
                  value="green"
                />
                <label
                  for="color-green-4"
                  class="card__color card__color--green"
                  >green</label
                >
                <input
                  type="radio"
                  id="color-pink-4"
                  class="card__color-input card__color-input--pink visually-hidden"
                  name="color"
                  value="pink"
                />
                <label
                  for="color-pink-4"
                  class="card__color card__color--pink"
                  >pink</label
                >
              </div>
            </div>
          </div>
    
          <div class="card__status-btns">
            <button class="card__save" type="submit">save</button>
            <button class="card__delete" type="button">delete</button>
          </div>`;
};

/* harmony default export */ __webpack_exports__["default"] = ((cardData) => ` <article class="card card--yellow card--repeat">
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
                    class="card__btn card__btn--favorites card__btn--disabled"
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
                    >
Here is a card with filled data</textarea
                    >
                  </label>
                </div>
                ${cardData.details ? createCardDetailsAndSettings(cardData.details) : ``}
              </div>
            </form>
          </article>`);




/***/ }),

/***/ "./src/create-filter.js":
/*!******************************!*\
  !*** ./src/create-filter.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((filter) => `<input
    type="radio"
    id="filter__${filter.name}"
    class="filter__input visually-hidden"
    name="filter"
    ${filter.name === `all` ? `checked` : ``}
    ${filter.amount === 0 ? `disabled` : ``}
  />
  <label for="filter__${filter.name}" class="filter__label">
    ${filter.name} <span class="filter__${filter.name}-count">${filter.amount}</span></label
  >`);


/***/ }),

/***/ "./src/generate-task-data.js":
/*!***********************************!*\
  !*** ./src/generate-task-data.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const cardData = {
  title: [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`,
  ],
  dueDate: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
  tags: new Set([
    `homework`,
    `theory`,
    `practice`,
    `intensive`,
    `keks`
  ]),
  picture: `http://picsum.photos/100/100?r=${Math.random()}`,
  color: [
    `black`,
    `yellow`,
    `blue`,
    `green`,
    `pink`
  ],
  repeatingDays: {
    'mo': true,
    'tu': true,
    'we': true,
    'th': false,
    'fr': false,
    'sa': false,
    'su': false,
  },
  isFavorite: true,
  isDone: true
};


const random = (myArray) => myArray[Math.floor(Math.random() * myArray.length)];


/* harmony default export */ __webpack_exports__["default"] = (() => {
  return {
    //title: title[Math.floor(Math.random() * 3)],
    //picture: `http://picsum.photos/100/100?r=${Math.random()}`,
    test: ``,
  };
});


/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _create_filter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./create-filter.js */ "./src/create-filter.js");
/* harmony import */ var _create_card_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./create-card.js */ "./src/create-card.js");
/* harmony import */ var _generate_task_data_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./generate-task-data.js */ "./src/generate-task-data.js");




const INITIAL_CARDS_LENGTH = 7;
const FILTERS_DATA = [
  {name: `all`, amount: 115},
  {name: `overdue`, amount: 0},
  {name: `today`, amount: 0},
  {name: `favorites`, amount: 7},
  {name: `repeating`, amount: 2},
  {name: `tags`, amount: 6},
  {name: `archive`, amount: 115}
];
const RandomRange = {
  MIN: 1,
  MAX: 10
};
const filtersContainer = document.querySelector(`.filter`);
const cardsContainer = document.querySelector(`.board__tasks`);

const makeRandomCount = (max, min) => Math.floor(Math.random() * (max - min + 1)) + min;

const filtersDataString = FILTERS_DATA.map(_create_filter_js__WEBPACK_IMPORTED_MODULE_0__["default"]).join(``);
filtersContainer.innerHTML = filtersDataString;

const fakeCardsData = new Array(INITIAL_CARDS_LENGTH).fill({});

const cardsMarkupString = fakeCardsData.map(_create_card_js__WEBPACK_IMPORTED_MODULE_1__["default"]).join(``);
cardsContainer.innerHTML = cardsMarkupString;

filtersContainer.addEventListener(`click`, function (event) {
  if (event.target.classList.contains(`filter__input`)) {
    const newFakeCardsData = new Array(makeRandomCount(RandomRange.MIN, RandomRange.MAX)).fill({});

    const newcardsMarkupString = newFakeCardsData.map(_create_card_js__WEBPACK_IMPORTED_MODULE_1__["default"]).join(``);
    cardsContainer.innerHTML = newcardsMarkupString;
  }
});

console.log(Object(_generate_task_data_js__WEBPACK_IMPORTED_MODULE_2__["default"])());



/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map