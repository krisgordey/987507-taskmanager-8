import generateTask from "./helpers/generate-task";
import {INITIAL_CARDS_LENGTH} from './helpers/constants.js';

export default class Model {
  constructor() {
    this._tasks = [];
  }

  fetchTasks() {
    this._tasks = new Array(INITIAL_CARDS_LENGTH).fill(null).map(() => generateTask());
  }

  getTasks() {
    return this._tasks;
  }

  updateTask(index, data) {
    this._tasks[index] = {
      ...this._tasks[index],
      ...data,
    };
  }

  deleteTask(index) {
    this._tasks[index] = null;
  }
}
