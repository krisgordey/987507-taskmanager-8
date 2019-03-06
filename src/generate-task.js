import utils from './utils.js';

const TAGS_LIMIT = 4;
const WEEK_IN_MILLISECONDS = 604800000;
const HOUR_IN_MILLISECONDS = 3600000;
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
  days: [`Mo`, `Tu`, `We`, `Th`, `Fr`, `Sa`, `Su`],
};

const generateRepeatingDays = (days) => days.map((day) => [day, utils.getRandomBoolean()]);

const generateRandomTags = (set) => utils.makeShuffledArray([...set]).slice(0, (Math.floor(Math.random() * TAGS_LIMIT)));

const generateDueDate = () => {
  let randomDays = utils.getRandomInRange(HOUR_IN_MILLISECONDS, WEEK_IN_MILLISECONDS);
  return new Date(Date.now() + (utils.getRandomBoolean() ? randomDays : -randomDays));
};

export default () => {
  const isRepeating = utils.getRandomBoolean();
  return {
    title: utils.getRandomArrayElement(mockData.title),
    picture: `http://picsum.photos/100/100?r=${Math.random()}`,
    tags: generateRandomTags(mockData.tags),
    dueDate: !isRepeating ? generateDueDate() : null,
    color: utils.getRandomArrayElement(mockData.color),
    repeatingDays: isRepeating ? generateRepeatingDays(mockData.days) : [],
    isFavorite: utils.getRandomBoolean(),
    isDone: utils.getRandomBoolean(),
  };
};

