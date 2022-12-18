import { getRandomArrayElement } from './util.js';

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTIONS = [
  'Ура, скоро Новый Год!!!:)',
  'Вчера ходила в кино... лучше бы не ходила',
  'Я больше не буду ходить без шапки',
  'Живите, кайфуйте, жизнь одна',
  'Не баг, а фича;)'
];

const NAMES = [
  'Виктория',
  'Кристина',
  'Роман',
  'Анлегина',
  'Андрей',
];

let countLikes = {
    MIN: 15,
    MAX: 200
};

MAX_PHOTOS = 25;
MAX_COMMENTS = 6;

const createComments = (id) => ({
  id,
  avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
  message: MESSAGES[getRandomPositiveInteger(0, MESSAGES.length - 1)],
  name: NAMES[getRandomPositiveInteger(0, NAMES.length - 1)]
});

const createPhotosData = (id) => ({
  id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomPositiveInteger(countLikes.MIN, countLikes.MAX),
  comments: Array.from({length: getRandomPositiveInteger(1, MAX_COMMENTS)}).map((element, index) => createComments(index + 1)),
});

const getPhotosData = () => Array.from({length: MAX_PHOTOS}).map((element, index) => createPhotosData(index + 1));

export {getPhotosData};
