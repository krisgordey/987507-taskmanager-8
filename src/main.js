import {INITIAL_CARDS_LENGTH, FILTERS_DATA} from './constants.js';
import createFilter from './create-filter.js';
import getTasks from './get-tasks.js';
import Task from './task.js';
import TaskEdit from './task-edit.js';

const filtersContainer = document.querySelector(`.filter`);
const tasksContainer = document.querySelector(`.board__tasks`);

filtersContainer.innerHTML = FILTERS_DATA.map(createFilter).join(``);

const tasks = getTasks(INITIAL_CARDS_LENGTH);

tasks.forEach((task) => {
  const taskComponent = new Task(task);
  const editTaskComponent = new TaskEdit(task);

  tasksContainer.appendChild(taskComponent.render());

  taskComponent.onEdit = () => {
    editTaskComponent.render();
    tasksContainer.replaceChild(editTaskComponent.element, taskComponent.element);
    taskComponent.unrender();
  };

  editTaskComponent.onSubmit = () => {
    taskComponent.render();
    tasksContainer.replaceChild(taskComponent.element, editTaskComponent.element);
    editTaskComponent.unrender();
  };

});

// Поддержка функциональности навигации не входит в задания первого этапа, и будет реализовываться после пятой недели обучения (информация от лектора).
//
// filtersContainer.addEventListener(`click`, function (event) {
//   if (event.target.classList.contains(`filter__input`)) {
//     const newTasksCount = utils.makeRandomCount(RandomRange.MIN, RandomRange.MAX);
//     const newTasks = getTasks(newTasksCount);
//     tasksContainer.innerHTML = newTasks.map(createCard).join(``);
//   }
// });
// tasksContainer.addEventListener(`click`, function (event) {
//   if (event.target.classList.contains(`filter__input`)) {
//     const newTasksCount = utils.makeRandomCount(RandomRange.MIN, RandomRange.MAX);
//     const newTasks = getTasks(newTasksCount);
//     tasksContainer.innerHTML = newTasks.map(createCard).join(``);
//   }
// });


