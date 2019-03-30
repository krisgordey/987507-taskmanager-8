import Model from './model.js';
import TasksView from './View/tasks-view.js';
import FiltersView from './View/filters-view.js';
import ControlsView from './View/controls-view.js';
import StatisticView from './View/statistic-view.js';

export default class Controller {
  constructor() {
    this._model = null;
    this._controlsView = null;
    this._filtersView = null;
    this._tasksView = null;
    this._statisticView = null;
    this._currentScreen = null;
    this._tasksData = null;
  }

  _init() {
    this._model = new Model();
    this._model.fetchTasks();

    this._tasksData = this._model.getTasks();

    this._controlsView = new ControlsView();
    this._filtersView = new FiltersView(this._tasksData);
    this._tasksView = new TasksView(this._tasksData);
    this._statisticView = new StatisticView(this._tasksData);

    this._controlsView.onControl = (name) => {
      document.querySelector(`.main`).removeChild(this._currentScreen.element);
      this._currentScreen.unrender();

      const screenToRender = this._getScreenToRender(name);
      document.querySelector(`.main`).appendChild(screenToRender.render());

      if (name === `statistic`) {
        screenToRender.updateCharts();
      }

      this._currentScreen = screenToRender;
    };

    this._filtersView.onFilter = (category) => {
      this._tasksView.unrenderTasks();
      this._tasksView.renderTasks(category);
    };

    this._tasksView.onTaskChange = (index, newData) => {
      this._model.updateTask(index, newData);
    };

    this._tasksView.onTaskDelete = (index) => {
      this._model.deleteTask(index);
    };
  }

  start() {
    this._init();

    document.querySelector(`.main`).insertAdjacentElement(`afterbegin`, this._controlsView.render());
    document.querySelector(`.main`).appendChild(this._filtersView.render());
    document.querySelector(`.main`).appendChild(this._tasksView.render());

    this._currentScreen = this._tasksView;
  }

  _getScreenToRender(name) {
    if (name === `tasks`) {
      return this._tasksView;
    }
    if (name === `statistic`) {
      return this._statisticView;
    }
    return undefined;
  }
}
