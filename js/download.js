const TYPES_UPLOAD_PHOTO = ['jpeg', 'png', 'gif', 'jpg'];

const form = document.querySelector('.img-upload__form');
const preview = form.querySelector('.user-picture');
const effectsPreview = form.querySelectorAll('.effects__preview');
const fileChooser = form.querySelector('.img-upload__input[type=file]');

const onFileChooserChange = () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = TYPES_UPLOAD_PHOTO.some((it) => fileName.endsWith(it));

  if (matches) {
    const newPictureUrl = URL.createObjectURL(file);
    preview.src = newPictureUrl;

    effectsPreview.forEach((effect) => { effect.style.backgroundImage = `url(${newPictureUrl})`; });
  }
};

fileChooser.addEventListener('change', onFileChooserChange);
