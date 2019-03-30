import Component from '../helpers/component';
import Task from '../Components/task.js';
import TaskEdit from '../Components/task-edit.js';
import utils from '../helpers/utils';

export default class TasksView extends Component {
  constructor(tasks) {
    super();
    this._tasks = tasks;
    this._renderedTasks = [];
  }

  get template() {
    return `<section class="board container">
        <p class="board__no-tasks visually-hidden">
          Congratulations, all tasks were completed! To create a new click on
          «add new task» button.
        </p>
        <div class="board__tasks">
        </div>
        <button class="load-more" type="button">load more</button>
      </section>`;
  }

  set onTaskChange(fn) {
    this._onTaskChange = fn;
  }

  set onTaskDelete(fn) {
    this._onTaskDelete = fn;
  }

  render() {
    this.initState();
    this._element = utils.createElement(this.template);
    this.addListeners();

    this.renderTasks();

    return this._element;
  }

  renderTasks(category = `all`) {
    const tasksContainer = this._element.querySelector(`.board__tasks`);

    this._tasks[category].forEach((taskData, index, array) => {
      if (!taskData) {
        return;
      }

      const taskComponent = new Task(taskData);
      this._renderedTasks.push(taskComponent);

      const editTaskComponent = new TaskEdit(taskData);

      tasksContainer.appendChild(taskComponent.render());

      let isUpdateNeeded = false;

      taskComponent.onEdit = () => {
        if (isUpdateNeeded) {
          editTaskComponent.update(array[index]);
          isUpdateNeeded = false;
        }

        editTaskComponent.render();
        tasksContainer.replaceChild(editTaskComponent.element, taskComponent.element);
        taskComponent.unrender();

        this._renderedTasks[index] = editTaskComponent;
      };

      editTaskComponent.onSubmit = (function (newData) {
        this._onTaskChange(index, newData);

        isUpdateNeeded = true;

        taskComponent.update(array[index]);
        taskComponent.render();
        tasksContainer.replaceChild(taskComponent.element, editTaskComponent.element);
        editTaskComponent.unrender();

        this._renderedTasks[index] = taskComponent;
      }).bind(this);

      editTaskComponent.onClose = () => {
        taskComponent.render();
        tasksContainer.replaceChild(taskComponent.element, editTaskComponent.element);
        editTaskComponent.unrender();

        this._renderedTasks[index] = taskComponent;
      };

      editTaskComponent.onDelete = () => {
        this._onTaskDelete(index);

        tasksContainer.removeChild(editTaskComponent.element);
        editTaskComponent.unrender();

        this._renderedTasks[index] = null;
      };
    });
  }

  unrenderTasks() {
    const tasksContainer = this._element.querySelector(`.board__tasks`);

    this._renderedTasks.forEach((task) => {
      if (!task) {
        return;
      }
      tasksContainer.removeChild(task.element);
      task.unrender();
    });

    this._renderedTasks = [];
  }

  unrender() {
    this.unrenderTasks();

    this.removeListeners();
    this._element = null;
    this._state = {};
  }
}
