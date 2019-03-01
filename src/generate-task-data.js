import utils from './utils.js';

const mockData = {
  title: [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`,
    `Поплакать`,
    `Посмеяться`
  ],
  tags: new Set([
    `homework`,
    `theory`,
    `practice`,
    `intensive`,
    `keks`
  ]),
  color: [
    `black`,
    `yellow`,
    `blue`,
    `green`,
    `pink`
  ],
  repeatingDays: {
    'Mo': false,
    'Tu': false,
    'We': false,
    'Th': false,
    'Fr': false,
    'Sa': false,
    'Su': false,
  },
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

const generateDueDate = () => {
  let randomDays = Math.floor(Math.random() * 7) * 24 * Math.floor(Math.random() * 60) * Math.floor(Math.random() * 60) * 1000;
  const plusOrMinusDays = utils.getRandomBoolean() ? randomDays : -randomDays;
  return new Date(Date.now() + 1 + plusOrMinusDays);
};

export default () => {
  const isRepeating = utils.getRandomBoolean();
  const repeatingDays = isRepeating ? generateRandomRepeatingDays(mockData.repeatingDays) : null;
  const dueDate = !isRepeating ? generateDueDate() : null;
  return {
    title: utils.getRandomArrayElement(mockData.title),
    picture: `http://picsum.photos/100/100?r=${Math.random()}`,
    tags: generateRandomTags(mockData.tags),
    dueDate,
    color: utils.getRandomArrayElement(mockData.color),
    repeatingDays,
    isFavorite: utils.getRandomBoolean(),
    isDone: utils.getRandomBoolean(),
    isRepeating,
  };
};

