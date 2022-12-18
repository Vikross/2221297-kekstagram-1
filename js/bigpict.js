import { createComment } from './comments.js';
import { isEscape } from './util.js';

const commentLoader = document.querySelector('.comments-loader');
const bigPicture = document.querySelector('.big-picture');
const closingButton = bigPicture.querySelector('.big-picture__cancel');
const commentCounter = document.querySelector('.social__comment-count');
const commentTemplate = bigPicture.querySelector('.social__comment');

const onDocumentEscKeyDown = (evt) => {
  if(isEscape(evt)){
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');

    document.removeEventListener('keydown', onDocumentEscKeyDown);
  }
};

const addOnPictureClick = (picture, pictureData) =>{
  picture.addEventListener('click', () => {
    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.big-picture__img').querySelector('img').src = pictureData.url;
    bigPicture.querySelector('.likes-count').textContent = pictureData.likes;
    bigPicture.querySelector('.comments-count').textContent = pictureData.comments.length;
    bigPicture.querySelector('.social__caption').textContent = pictureData.description;
    const comments = bigPicture.querySelector('.social__comments');
    comments.innerHTML = '';
    pictureData.comments.forEach((comment) => {
      comments.appendChild(createComment(comment, commentTemplate));
    });
    commentCounter.classList.add('hidden');
    commentLoader.classList.add('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onDocumentEscKeyDown);
  });

};

closingButton.addEventListener('click', () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentEscKeyDown);
});

export{addOnPictureClick};
