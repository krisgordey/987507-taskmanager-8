import createFilterMarkup from './create-filter.js';
import createCard from './create-card.js';
import getTasks from './get-tasks.js';
import Task from './task.js';


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

filtersContainer.innerHTML = FILTERS_DATA.map(createFilterMarkup).join(``);

const tasks = getTasks(INITIAL_CARDS_LENGTH);

// const cardsMarkupString = tasks.map(createCard).join(``);
// cardsContainer.innerHTML = cardsMarkupString;

// test
tasks.forEach((task) => {
  const firstTask = new Task(task);
  firstTask.render(cardsContainer);
});

filtersContainer.addEventListener(`click`, function (event) {
  if (event.target.classList.contains(`filter__input`)) {
    const newTasksCount = makeRandomCount(RandomRange.MIN, RandomRange.MAX);
    const newTasks = getTasks(newTasksCount);
    cardsContainer.innerHTML = newTasks.map(createCard).join(``);
  }
});
cardsContainer.addEventListener(`click`, function (event) {
  if (event.target.classList.contains(`filter__input`)) {
    const newTasksCount = makeRandomCount(RandomRange.MIN, RandomRange.MAX);
    const newTasks = getTasks(newTasksCount);
    cardsContainer.innerHTML = newTasks.map(createCard).join(``);
  }
});


