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
  const plusOrMinusDays = utils.getRandomBoolean() ? randomDays : -randomDays;
  return new Date(Date.now() + plusOrMinusDays);
};

export default () => {
  const isRepeating = utils.getRandomBoolean();
  const repeatingDays = isRepeating ? generateRepeatingDays(mockData.days) : null;
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

