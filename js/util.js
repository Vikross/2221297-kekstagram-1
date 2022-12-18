const isEscape = (evt) => evt.key === 'Escape';

const DELAY = 500;

function getRandomNumber (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
}

const getRandomElements = (array, elementsCount) => {
  const elementNumbers = [];
  const randomArray = [];
  for(let i = 0; i < array.length; i++){
    const number = getRandomNumber(0, array.length - 1);
    if(elementNumbers.indexOf(number) === -1){
      randomArray.push(array[number]);
      elementNumbers.push(number);
    }
    if(randomArray.length === elementsCount){
      break;
    }
  }
  return randomArray;
};

const debounce = (callback) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), DELAY);
  };
};


export {getRandomElements, isEscape, debounce};
