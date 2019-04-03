export default class ModelTask {
  constructor(data) {
    this.id = data[`id`];
    this.title = data[`title`] || ``;
    this.dueDate = new Date(data[`due_date`]);
    this.tags = new Set(data[`tags`] || []);
    this.picture = data[`picture`] || ``;
    this.repeatingDays = data[`repeating_days`];
    this.color = data[`color`];
    this.isFavorite = Boolean(data[`is_favorite`]);
    this.isDone = Boolean(data[`is_done`]);
  }

  static toRaw(data) {
    return {
      'id': data.id,
      'title': data.title,
      'due_date': data.dueDate.getTime(),
      'tags': [...data.tags.values()],
      'picture': data.picture,
      'repeating_days': data.repeatingDays,
      'color': data.color,
      'is_favorite': data.isFavorite,
      'is_done': data.isDone,
    };
  }

  static parseTask(data) {
    return new ModelTask(data);
  }

  static parseTasks(data) {
    return data.map(ModelTask.parseTask);
  }
}
