import generateTask from './generate-task.js';

export default (count) => {
  return new Array(count).fill(null).map(() => generateTask());
};
