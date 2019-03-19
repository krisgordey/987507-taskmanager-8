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

  let isFirstRender = true;

  taskComponent.onEdit = () => {
    if (!isFirstRender) {
      editTaskComponent.update(task);
    }

    editTaskComponent.render();
    tasksContainer.replaceChild(editTaskComponent.element, taskComponent.element);
    taskComponent.unrender();

    if (isFirstRender) {
      isFirstRender = !isFirstRender;
    }
  };

  editTaskComponent.onSubmit = (newObject) => {
    task.title = newObject.title;
    task.tags = newObject.tags;
    task.color = newObject.color;
    task.repeatingDays = newObject.repeatingDays;
    task.dueDate = newObject.dueDate;

    taskComponent.update(task);
    taskComponent.render();
    tasksContainer.replaceChild(taskComponent.element, editTaskComponent.element);
    editTaskComponent.unrender();
  };

  editTaskComponent.onClose = () => {
    taskComponent.render();
    tasksContainer.replaceChild(taskComponent.element, editTaskComponent.element);
    editTaskComponent.unrender();
  };
});

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


