import { getPhotosData } from './data.js';
import{ createPhotos } from './miniatures.js';

const arr = getPhotosData();
createPhotos(arr);
