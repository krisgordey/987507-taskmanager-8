import utils from './utils.js';

const mockData = {
  title: [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`,
  ],
  dueDate: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
  tags: new Set([
    `homework`,
    `theory`,
    `practice`,
    `intensive`,
    `keks`
  ]),
  picture: `http://picsum.photos/100/100?r=${Math.random()}`,
  color: [
    `black`,
    `yellow`,
    `blue`,
    `green`,
    `pink`
  ],
  repeatingDays: {
    'mo': false,
    'tu': false,
    'we': false,
    'th': false,
    'fr': false,
    'sa': false,
    'su': false,
  },
  isFavorite: true,
  isDone: true
};

const generateRandomRepeatingDays = (obj) => {
  const newObj = {...obj};

  for (let key of Object.keys(newObj)) {
    newObj[key] = Math.random() >= 0.5;
  }

  return newObj;
};

const generateRandomTags = (set) => {
  let newArr = [...set];

  newArr = utils.makeShuffledArray(newArr).slice(0, (Math.floor(Math.random() * (3 + 1))));
  return newArr;
};

export default () => {
  return {
    title: utils.getRandomArrayElement(mockData.title),
    picture: `http://picsum.photos/100/100?r=${Math.random()}`,
    tags: generateRandomTags(mockData.tags),
    dueDate: mockData.dueDate,
    color: utils.getRandomArrayElement(mockData.color),
    repeatingDays: generateRandomRepeatingDays(mockData.repeatingDays),
    isFavorite: Math.random() >= 0.5,
    isDone: Math.random() >= 0.5
  };
};

