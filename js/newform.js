import { onFormInput, resetForm } from './validator.js';
import { isEscape } from './util.js';

const form = document.querySelector('.img-upload__form');
const imageOverlay = document.querySelector('.img-upload__overlay');
const uploadFileButton = document.querySelector('#upload-file');
const cancelButton = document.querySelector('#upload-cancel');
const hashtags = document.querySelector('.text__hashtags');
const comment = document.querySelector('.text__description');

const onCloseClick = () => {
  imageOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadFileButton.value = '';
  hashtags.value = '';
  comment.value = '';
  resetForm();
  form.removeEventListener('submit', onFormInput);
  cancelButton.removeEventListener('click', onCloseClick);
};

const isNotTarget = (evt) => !evt.target.classList.contains('text__hashtags')
&& !evt.target.classList.contains('text__description');

const onDocumentEscKeyDown = (evt) => {
  if(isEscape(evt) && isNotTarget(evt)){
    onCloseClick();
    document.removeEventListener('keydown', onDocumentEscKeyDown);
  }
};

const onFileInput = () => {
  imageOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  cancelButton.addEventListener('click', onCloseClick);
  document.addEventListener('keydown', onDocumentEscKeyDown);
  form.addEventListener('submit', onFormInput);
};

uploadFileButton.addEventListener('input', onFileInput);
