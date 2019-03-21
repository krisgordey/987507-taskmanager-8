import generateTask from "./generate-task";
import {INITIAL_CARDS_LENGTH} from './constants.js';

export default class TasksModel {
  constructor() {
    this._tasks = [];
  }

  fetchTasks() {
    this._tasks = new Array(INITIAL_CARDS_LENGTH).fill(null).map(() => generateTask());
  }

  getTasks() {
    return this._tasks;
  }
}
