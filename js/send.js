import { onDocumentEscKeyDown } from './newform.js';
import { isEscape } from './util.js';
import {sendNewRequest} from './fetch.js';
import { closeForm } from './newform.js';

const INDEX_MESSAGE = 100;
const uploadForm = document.querySelector('.img-upload__form');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
let message;

const closeMessage = () => {
  message.classList.add('hidden');
};

const onErrorEscapeKeyDown = (evt) => {
  if(isEscape(evt)) {
    closeMessage();
    document.addEventListener('keydown', onDocumentEscKeyDown);
    document.removeEventListener('keydown', onErrorEscapeKeyDown);
  }
};

const showMessage = (isSuccessful) => {
  if (isSuccessful){
    message = successTemplate.cloneNode(true);
  }
  else {
    message = errorTemplate.cloneNode(true);
    document.removeEventListener('keydown', onDocumentEscKeyDown);
    document.addEventListener('keydown', onErrorEscapeKeyDown);
  }

  message.style.zIndex = INDEX_MESSAGE;
  message.classList.remove('hidden');

  document.body.appendChild(message);
};

const closeSendingForm = () => {
  closeMessage();
  closeForm();
};

const onSuccessButtonClicked = () => closeSendingForm();
const onErrorButtonClicked = () => closeMessage();
const onSuccess = () => {
  showMessage(true);
  message.addEventListener('click', onSuccessButtonClicked);
};

const onFail = () => {
  showMessage(false);
  message.addEventListener('click', onErrorButtonClicked);
};

const onFormEscKeyDown = (evt) => {
  if(isEscape(evt)){
    closeMessage();

    if (message.classList.contains('success')){
      closeForm();
    }

    uploadForm.removeEventListener('keydown', onFormEscKeyDown);
  }
};

const sendAllData = () => sendNewRequest(onSuccess, onFail, 'POST', new FormData(uploadForm));

uploadForm.addEventListener('keydown', onFormEscKeyDown);

export {sendAllData};
