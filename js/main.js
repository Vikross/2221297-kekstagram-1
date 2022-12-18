const COUNT_PHOTO = 25;

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

const getRandomPositiveInteger = (a, b) => {
    const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
    const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
    const result = Math.random() * (upper - lower + 1) + lower;
    return Math.floor(result);
};

const checkStringLength = (string, maxLength) => string.length <= maxLength;

const createComment = (id) => ({
    id,
    avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
    message: MESSAGES[getRandomPositiveInteger(0, MESSAGES.length - 1)],
    name: NAMES[getRandomPositiveInteger(0, NAMES.length - 1)]
});

const createPhotoData = (id) => ({
    id,
    url: `photos/${id}.jpg`,
    description: DESCRIPTIONS[getRandomPositiveInteger(0, DESCRIPTIONS.length - 1)],
    likes: getRandomPositiveInteger(countLikes.MIN, countLikes.MAX),
    comments: createComment(id)
});

const generateData = () => {
    const photos = [];
    for(let i = 0; i < COUNT_PHOTO; i++) {
        photos.push(createPhotoData(i + 1));
    }
    return photos;
}

checkStringLength('Проверить длину строки', 140);
generateData();
