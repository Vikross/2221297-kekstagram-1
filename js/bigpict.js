import { isEscape } from './util.js';

const COMMENT_STEP = 5;

const bigPicture = document.querySelector('.big-picture');
const commentCounter = document.querySelector('.social__comment-count');
const commentLoader = document.querySelector('.comments-loader');
const closingButton = bigPicture.querySelector('.big-picture__cancel');
const commentTemplate = bigPicture.querySelector('.social__comment');
const comments = bigPicture.querySelector('.social__comments');

let currentIndex = COMMENT_STEP;
let currentComments = [];

const createComment = (comment, template) => {
  const newComment = template.cloneNode(true);
  const avatar = newComment.querySelector('.social__picture');
  avatar.src = comment.avatar;
  avatar.alt = comment.name;
  newComment.querySelector('.social__text').textContent = comment.message;

  return newComment;
};

const addComments = () => {
  comments.innerHTML = '';

  currentIndex = (currentIndex > currentComments.length) ? currentComments.length: currentIndex;

  const commentsSelected = currentComments.slice(0, currentIndex);

  if(currentComments.length <= COMMENT_STEP || currentIndex >= currentComments.length)
  {
    commentLoader.classList.add('hidden');
  }
  else{
    commentLoader.classList.remove('hidden');
  }

  commentCounter.textContent = `${currentIndex} из ${currentComments.length} комментариев`;

  commentsSelected.forEach((comment) => {
    comments.appendChild(createComment(comment, commentTemplate));
  });
};

const onCommentLoaderClick = () => {
  currentIndex += COMMENT_STEP;
  addComments();
};

const closePicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  currentComments = [];
  currentIndex = COMMENT_STEP;
  commentLoader.removeEventListener('click', onCommentLoaderClick);
};

const onDocumentEscKeyDown = (evt) => {
  if(isEscape(evt)){
    closePicture();
  }
};

const onClosingButtonClick = () => {
  closePicture();
  closingButton.removeEventListener('click', onClosingButtonClick);
};

const openBigPicture = (picture) =>{
  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  commentCounter.classList.remove('hidden');
  commentLoader.classList.remove('hidden');

  bigPicture.querySelector('.big-picture__img').querySelector('img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.social__caption').textContent = picture.description;

  currentComments = picture.comments;

  addComments();

  commentLoader.addEventListener('click', onCommentLoaderClick);
  document.addEventListener('keydown', onDocumentEscKeyDown);
  closingButton.addEventListener('click', onClosingButtonClick);
};

export {openBigPicture};
