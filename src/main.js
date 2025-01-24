import {
  createGalleryCardTemplate,
  createWaitingCardTemplate,
} from './js/render-function';
import { fetchPhotosByQuery } from './js/pixaby-api';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let page = 1;
let searchedQuery = '';

const searchFormEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');
const lightbox = new SimpleLightbox('.js-gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const onSearchFormSubmit = async event => {
  try {
    event.preventDefault();
    galleryEl.innerHTML = createWaitingCardTemplate();

    searchedQuery = event.currentTarget.elements.user_query.value.trim();

    if (searchedQuery === '') {
      iziToast.show({
        color: 'red',
        titleColor: 'red',
        title: 'Fields must be filled!',
        position: 'topRight',
      });
      galleryEl.innerHTML = '';
      searchFormEl.reset();
      return;
    }
    const data = await fetchPhotosByQuery(searchedQuery, page);
    console.log('API Response:', data);
    if (data.total === 0) {
      galleryEl.innerHTML = '';
      searchFormEl.reset();
      iziToast.show({
        color: 'red',
        titleColor: 'red',
        title:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    const galleryTemplate = data.hits
      .map(el => createGalleryCardTemplate(el))
      .join('');

    galleryEl.innerHTML = galleryTemplate;
    lightbox.refresh();
  } catch (error) {
    iziToast.show({
      color: 'red',
      titleColor: 'red',
      title: `An error occurred: ${error.message}`,
      position: 'topRight',
    });
    console.error('Error:', error);
  }
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);
