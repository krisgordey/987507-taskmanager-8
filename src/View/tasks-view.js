import Component from '../helpers/component';
import Task from '../Components/task.js';
import TaskEdit from '../Components/task-edit.js';
import utils from '../helpers/utils';
import {BOARDSTATUS} from '../helpers/constants.js';

// const BoardStatus = {
//   ERROR: `Something went wrong while loading your tasks. Check your connection or try again later`,
//   ALL_TASKS_DONE: `Congratulations, all tasks were completed! To create a new click on «add new task» button.`,
//   LOADING: `Loading tasks...`,
// };

export default class TasksView extends Component {
  constructor() {
    super();
    this._tasks = null;
    this._renderedTasks = [];
  }

  set tasks(tasks) {
    this._tasks = tasks;
    const boardNoTasks = this._element.querySelector(`.board__no-tasks`);
    console.log(this._tasks)
    if (this._tasks.all.length === 0) {
      console.log('kik')
      boardNoTasks.innerText = BOARDSTATUS.ALL_TASKS_DONE;
      return;
    }

    boardNoTasks.innerText = ``;
    boardNoTasks.classList.add(`visually-hidden`);

    this.renderTasks();
  }

  onLoadError(err) {
    const boardNoTasks = this._element.querySelector(`.board__no-tasks`);
    boardNoTasks.innerText = BOARDSTATUS.ERROR;
    boardNoTasks.classList.remove(`visually-hidden`);
  }

  get template() {
    return `<section class="board container">
        <p class="board__no-tasks visually-hidden">
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

    if (!this._tasks) {
      this._state.isLoading = true;

      const boardNoTasks = this._element.querySelector(`.board__no-tasks`);
      boardNoTasks.innerText = BOARDSTATUS.LOADING;
      boardNoTasks.classList.remove(`visually-hidden`);
    }

    if (this._tasks) {
      this.renderTasks();
    }

    return this._element;
  }

  renderTasks(category = `all`) {
    const tasksContainer = this._element.querySelector(`.board__tasks`);

    this._tasks[category].forEach((taskData, index) => {
      if (!taskData) {
        return;
      }

      const taskComponent = new Task(taskData);
      this._renderedTasks.push(taskComponent);

      const editTaskComponent = new TaskEdit(taskData);

      tasksContainer.appendChild(taskComponent.render());

      taskComponent.onEdit = () => {
        editTaskComponent.render();
        tasksContainer.replaceChild(editTaskComponent.element, taskComponent.element);
        taskComponent.unrender();

        this._renderedTasks[index] = editTaskComponent;
      };

      editTaskComponent.onSubmit = (function (newData) {
        return this._onTaskChange(index, newData).then((data) => {
          taskComponent.update(data);
          taskComponent.render();

          tasksContainer.replaceChild(taskComponent.element, editTaskComponent.element);

          editTaskComponent.update(data);
          editTaskComponent.unrender();

          this._renderedTasks[index] = taskComponent;
        });
      }).bind(this);

      editTaskComponent.onClose = () => {
        taskComponent.render();
        tasksContainer.replaceChild(taskComponent.element, editTaskComponent.element);
        editTaskComponent.unrender();

        this._renderedTasks[index] = taskComponent;
      };

      editTaskComponent.onDelete = () => {
        this._onTaskDelete(index, taskData.id)
          .then(() => {
            tasksContainer.removeChild(editTaskComponent.element);
            editTaskComponent.unrender();

            this._renderedTasks[index] = null;

            if (this._tasks.all.every((it) => it === null)) {
              const boardTasks = this._element.querySelector(`.board__tasks`);
              const boardNoTasks = this._element.querySelector(`.board__no-tasks`);

              boardTasks.classList.add(`visually-hidden`);
              boardNoTasks.classList.remove(`visually-hidden`);

              boardNoTasks.innerText = BOARDSTATUS.ALL_TASKS_DONE;
            }
          })
          .catch(() => {
            editTaskComponent.showError();
          });
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
