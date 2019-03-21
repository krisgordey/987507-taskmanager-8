import {FILTERS_DATA} from './constants.js';
import createFilter from './create-filter.js';
import TasksModel from './tasks-model.js';
import TaskView from './task-view.js';
import TaskEditView from './task-edit-view.js';

const tasksContainer = document.querySelector(`.board__tasks`);

const tasksModel = new TasksModel();

tasksModel.fetchTasks();

const tasks = tasksModel.getTasks();

tasks.forEach((taskData) => {
  const taskComponent = new TaskView(taskData);
  const editTaskComponent = new TaskEditView(taskData);

  tasksContainer.appendChild(taskComponent.render());

  let isUpdateNeeded = false;

  taskComponent.onEdit = () => {
    if (isUpdateNeeded) {
      editTaskComponent.update(taskData);
      isUpdateNeeded = false;
    }

    editTaskComponent.render();
    tasksContainer.replaceChild(editTaskComponent.element, taskComponent.element);
    taskComponent.unrender();
  };

  editTaskComponent.onSubmit = (newData) => {
    taskData.title = newData.title;
    taskData.tags = newData.tags;
    taskData.color = newData.color;
    taskData.repeatingDays = newData.repeatingDays;
    taskData.dueDate = newData.dueDate;

    isUpdateNeeded = true;

    taskComponent.update(taskData);
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

const filtersContainer = document.querySelector(`.filter`);

filtersContainer.innerHTML = FILTERS_DATA.map(createFilter).join(``);

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
