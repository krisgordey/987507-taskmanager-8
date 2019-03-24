import Model from './model.js';
import TasksView from './View/tasks-view.js';

const model = new Model();
model.fetchTasks();

const tasksData = model.getTasks();

const tasksView = new TasksView(tasksData);

tasksView.onTaskChange = (index, newData) => {
  model.updateTask(index, newData);
};

tasksView.onTaskDelete = (index) => {
  model.deleteTask(index);
};

document.querySelector(`.main`).appendChild(tasksView.render());
