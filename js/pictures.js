import { photosArray } from './data.js';
import {addOnPictureClick} from './bigpict.js';

const picturesBlock = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const fragment = document.createDocumentFragment();

const renderPhoto = (photo) => {
  const element = pictureTemplate.cloneNode(true);
  element.querySelector('.picture__img').src = photo.url;
  element.querySelector('.picture__likes').textContent = photo.likes;
  element.querySelector('.picture__comments').textContent = photo.comments.length;
  addOnPictureClick(element, photo);
  return element;
};

const renderPhotos = () => {
  photosArray.forEach((photo) => {
    fragment.appendChild(renderPhoto(photo));
  });
  picturesBlock.appendChild(fragment);
};

renderPhotos();
