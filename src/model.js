import moment from 'moment';

export default class Model {
  constructor(tasks) {
    this._tasks = tasks;
  }

  // fetchTasks() {
  //   this._tasks = new Array(INITIAL_CARDS_LENGTH).fill(null).map(() => generateTask());
  // }

  getTasks() {
    const groupedTasks = {
      all: this._tasks,
      overdue: [],
      today: [],
      favorites: [],
      repeating: [],
      tags: [],
      archive: [],
    };

    for (const task of this._tasks) {
      if (task.dueDate && task.dueDate.getTime() < Date.now()) {
        groupedTasks.overdue.push(task);
      }
      if (task.dueDate && moment(task.dueDate).isSame(moment(), `days`)) {
        groupedTasks.today.push(task);
      }
      if (task.isFavorite) {
        groupedTasks.favorites.push(task);
      }
      if (Object.values(task.repeatingDays).some((it) => it === true)) {
        groupedTasks.repeating.push(task);
      }
      if (task.tags.size > 0) {
        groupedTasks.tags.push(task);
      }
    }

    return groupedTasks;
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
