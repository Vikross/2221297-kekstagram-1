import { openPhoto } from './big-picture.js';
const photosContainer = document.querySelector('.pictures');
const templatePicture = document.querySelector('#picture').content;
const newPictureTemplate = templatePicture.querySelector('.picture');


const createPhoto = function(photo) {
  const clonedPicture = newPictureTemplate.cloneNode(true);
  clonedPicture.querySelector('.picture__img').src = photo.url;
  clonedPicture.querySelector('.picture__likes').textContent = photo.likes;
  clonedPicture.querySelector('.picture__comments').textContent = photo.comments.length;
  clonedPicture.addEventListener('click',() => {openPhoto(photo)});
  return clonedPicture;
};

const createPhotos = function(photos) {
  const fragment = document.createDocumentFragment();
  for(let i = 0; i<photos.length; i++) {
    fragment.appendChild(createPhoto(photos[i]));
  }
  photosContainer.appendChild(fragment);
};
export{createPhotos};
