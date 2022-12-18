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
  message.innerHTML = '';
};

const onMessageEscKeyDown = (evt) => {
  if(isEscape(evt)) {
    closeMessage();
    document.addEventListener('keydown', onDocumentEscKeyDown);
    document.removeEventListener('keydown', onMessageEscKeyDown);
  }
};

const showMessage = (isSuccessful) => {
  if (isSuccessful){
    message = successTemplate.cloneNode(true);
  }
  else {
    message = errorTemplate.cloneNode(true);
    document.removeEventListener('keydown', onDocumentEscKeyDown);
  }

  message.style.zIndex = INDEX_MESSAGE;
  message.classList.remove('hidden');

  document.addEventListener('keydown', onMessageEscKeyDown);
  document.body.appendChild(message);
};

const closeSendingForm = () => {
  closeMessage();
  closeForm();
};

const onSuccessButtonClick = () => closeSendingForm();
const onErrorButtonClick = () => closeMessage();
const onSuccess = () => {
  showMessage(true);
  message.addEventListener('click', onSuccessButtonClick);
};

const onFail = () => {
  showMessage(false);
  message.addEventListener('click', onErrorButtonClick);
};

const onFormEscKeyDown = (evt) => {
  if(isEscape(evt)){
    if (message){
      closeMessage();
    }

    if (message.classList.contains('success')){
      closeForm();
    }

    uploadForm.removeEventListener('keydown', onFormEscKeyDown);
  }
};

const sendAllData = () => sendNewRequest(onSuccess, onFail, 'POST', new FormData(uploadForm));

uploadForm.addEventListener('keydown', onFormEscKeyDown);

export {sendAllData};
