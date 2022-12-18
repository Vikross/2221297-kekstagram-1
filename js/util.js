import { getRandomNumber } from './randnum.js';

const getRandomElement = (array) => array[getRandomNumber(0, array.length - 1)];
const isEscape = (evt) => evt.key === 'Escape';

export {getRandomElement, isEscape};
