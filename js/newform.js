import { onFormInput as onFormSubmit, resetForm} from './validator.js';
import { isEscape } from './util.js';
import { setDefaultScale } from './scale.js';
import { setDefaultEffect } from './effects.js';

const uploadForm = document.querySelector('.img-upload__form');
const imageOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadingField = uploadForm.querySelector('#upload-file');
const cancelButton = uploadForm.querySelector('#upload-cancel');

const closeForm = () => {
  imageOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadingField.value = '';
  uploadForm.querySelector('.text__hashtags').value = '';
  uploadForm.querySelector('.text__description').value = '';
  resetForm();
  uploadForm.removeEventListener('submit', onFormSubmit);
};

const onCloseButtonClick = () => {
  closeForm();
  cancelButton.removeEventListener('click', onCloseButtonClick);
};

const isNotTarget = (evt) => !evt.target.classList.contains('text__hashtags')
&& !evt.target.classList.contains('text__description');

const onDocumentEscKeyDown = (evt) => {
  if(isEscape(evt) && isNotTarget(evt)){
    onCloseButtonClick();
    document.removeEventListener('keydown', onDocumentEscKeyDown);
  }
};

const onUploadingFieldInput = () => {
  setDefaultScale();
  setDefaultEffect();
  imageOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  cancelButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentEscKeyDown);
  uploadForm.addEventListener('submit', onFormSubmit);
};

uploadingField.addEventListener('input', onUploadingFieldInput);

export {closeForm, onDocumentEscKeyDown};
