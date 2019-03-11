import generateTask from './generate-task.js';

export default (count) => new Array(count).fill(null).map(() => generateTask());

