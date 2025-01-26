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
const loadMoreBtnEl = document.querySelector('.js-load-more-btn');

const lightBoxRefresh = () => {};

const onSearchFormSubmit = async event => {
  try {
    event.preventDefault();
    loadMoreBtnEl.classList.add('is-hidden');
    galleryEl.innerHTML = createWaitingCardTemplate();
    page = 1;

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

    loadMoreBtnEl.classList.add('is-hidden');
    const total_pages = Math.round(data.totalHits / 15);
    if (total_pages > 1) {
      loadMoreBtnEl.classList.remove('is-hidden');

      loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);
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

const onLoadMoreBtnClick = async event => {
  try {
    page++;
    galleryEl.insertAdjacentHTML('beforeend', createWaitingCardTemplate());

    const data = await fetchPhotosByQuery(searchedQuery, page);
    const total_pages = Math.round(data.totalHits / 15);
    const paragraphs = document.querySelectorAll('p');
    if (paragraphs.length > 0) {
      const lastParagraph = paragraphs[paragraphs.length - 1];
      lastParagraph.remove();
    }
    const galleryTemplate = data.hits
      .map(el => createGalleryCardTemplate(el))
      .join('');

    galleryEl.insertAdjacentHTML('beforeend', galleryTemplate);
    lightbox.refresh();

    const cards = galleryEl.querySelectorAll('li');
    const cardHeight = cards[0].getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    if (page === total_pages) {
      loadMoreBtnEl.classList.add('is-hidden');

      loadMoreBtnEl.removeEventListener('click', onLoadMoreBtnClick);
    }
  } catch (err) {
    console.log(err);
  }
};
