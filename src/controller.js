import Model from './model.js';
import TasksView from './View/tasks-view.js';
import FiltersView from './View/filters-view.js';
import ControlsView from './View/controls-view.js';
import StatisticView from './View/statistic-view.js';
import API from "./helpers/api.js";
import {BOARDSTATUS} from './helpers/constants.js';

// const AUTHORIZATION = `Basic dXNlckBwKRISYXNzd29yZAo=${Math.random()}`;
const AUTHORIZATION = `Basic dXNlckBwKRISYXNzd29yZAo=9999sss9dds11`;
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

  _init() {
    this._api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

    this._controlsView = new ControlsView();
    this._filtersView = new FiltersView();
    this._tasksView = new TasksView();

    this._api.getTasks()
      .then((tasks) => {
        this._model = new Model(tasks);
        this._tasksData = this._model.getTasks();

        this._filtersView.tasks = this._tasksData;
        this._tasksView.tasks = this._tasksData;

        this._statisticView = new StatisticView(this._tasksData);

        this._controlsView.onControl = (name) => {
          document.querySelector(`.main`).removeChild(this._currentScreen.element);
          this._currentScreen.unrender();

          const screenToRender = this._getScreenToRender(name);

          console.log(screenToRender, screenToRender.render())
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
          return this._api.updateTask(newData)
            .then((updateResult) => {
              this._model.updateTask(index, updateResult);
              return updateResult;
            });
        };

        this._tasksView.onTaskDelete = (index, id) => {
          return this._api.deleteTask(id)
            .then(() => {
              return this._model.deleteTask(index);
            })
            .catch((err) => {
              throw err;
            });
        };
      })
      .catch((err) => {
        this._tasksView.onLoadError(err);
      });
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
