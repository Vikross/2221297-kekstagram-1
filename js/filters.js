import { getRandomElements, debounce } from './util.js';
import { renderPhotos, clearPhotos } from './pictures.js';
import { getAllData } from './main.js';

const RANDOM_PHOTOS_COUNT = 10;

const filterForm = document.querySelector('.img-filters__form');

const compareDiscussedPhotos = (photo1, photo2) => photo2.comments.length - photo1.comments.length;

const filters = {
  'filter-default': (photos) => photos.slice(),
  'filter-random': (photos) => getRandomElements(photos, RANDOM_PHOTOS_COUNT),
  'filter-discussed': (photos) => photos.slice().sort(compareDiscussedPhotos),
};

const onFilterFormClicked = debounce((evt) => {
  if(evt.target.tagName === 'BUTTON') {
    const selectedButton = filterForm.querySelector('.img-filters__button--active');

    if(selectedButton){
      selectedButton.classList.remove('img-filters__button--active');
    }

    evt.target.classList.add('img-filters__button--active');

    clearPhotos();
    renderPhotos(filters[evt.target.id](getAllData()));
  }
});

filterForm.addEventListener('click', onFilterFormClicked);
