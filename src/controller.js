import Model from './model.js';
import TasksView from './View/tasks-view.js';
import FiltersView from './View/filters-view.js';
import ControlsView from './View/controls-view.js';
import StatisticView from './View/statistic-view.js';
import API from "./helpers/api.js";
import utils from './helpers/utils.js';

// const AUTHORIZATION = `Basic dXNlckBwKRISYXNzd29yZAo=${Math.random()}`;
const AUTHORIZATION = `Basic dXNlckBwKRISYXNzd29yZAo=99999}`;
const END_POINT = `https://es8-demo-srv.appspot.com/task-manager`;

export default class Controller {
  constructor() {
    this._api = null;
    this._model = null;
    this._controlsView = null;
    this._filtersView = null;
    this._tasksView = null;
    this._statisticView = null;
    this._currentScreen = null;
    this._tasksData = null;
  }

  async _init() {
    this._api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

    try {
      const tasks = await this._api.getTasks();
      this._model = new Model(tasks);
    } catch (err) {
      utils.notifyError(`Something went wrong while loading your tasks. Check your connection or try again later`);
    }

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

    this._tasksView.onTaskChange = async (index, newData) => {
      try {
        await this._api.updateTask(newData);
        this._model.updateTask(index, newData);
      } catch (err) {
        utils.notifyError(err);
      }
    };

    this._tasksView.onTaskDelete = async (index, id) => {
      try {
        await this._api.deleteTask(id);
        this._model.deleteTask(index);
      } catch (err) {
        utils.notifyError(err);
      }
    };
  }

  start() {
    this._init().then(() => {
      document.querySelector(`.main`).insertAdjacentElement(`afterbegin`, this._controlsView.render());
      document.querySelector(`.main`).appendChild(this._filtersView.render());
      document.querySelector(`.main`).appendChild(this._tasksView.render());

      this._currentScreen = this._tasksView;
    });
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
