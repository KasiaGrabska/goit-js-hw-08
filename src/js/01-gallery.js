// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
// Opisany w dokumentacji
import SimpleLightbox from 'simplelightbox';
// Dodatkowy import stylów
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');

const listItems = galleryItems
  .map(
    galleryItem =>
      `<li class="gallery__item">
            <a class="gallery__link" href="${galleryItem.original}">
                <img
            class="gallery__image"
            src="${galleryItem.preview}"
            alt="${galleryItem.description}"
              />
            </a>
    </li>`
  )
  .join('');

gallery.insertAdjacentHTML('afterbegin', listItems);

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionType: 'attr',
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});
