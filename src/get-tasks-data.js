import generateTaskData from './generate-task-data.js';

export default (count) => {
  return new Array(count).fill(null).map(() => generateTaskData());
};
