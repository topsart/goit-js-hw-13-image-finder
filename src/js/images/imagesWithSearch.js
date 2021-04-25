import imagesService from '../../services/apiService';
import imagesListTemplate from '../../templates/imagesList.hbs';

const searchForm = document.querySelector('#search-form');

class Images {
  constructor(selector) {
    this.element = document.querySelector(selector);
    this.images = [];
    this.currentImages = [];
    this.searchQuery = '';
    this.page = 0;
    this.observeEnable = true;
  }

  filterByQuery(query = '') {
    this.observeEnable = false;
    this.currentImages = query
      ? this.images.filter(image =>
          image.tags.toLowerCase().includes(query.toLowerCase()),
        )
      : this.images;
    this.renderImages();
  }

  addObserver() {
    const observerOptions = {
      rootMargin: '100px',
    };

    const observerHandler = entries => {
      if (!this.observeEnable) return;

      if (entries[0].isIntersecting) {
        this.page += 1;
        this.fetchImages(this.page);
      }
    };

    const observer = new IntersectionObserver(observerHandler, observerOptions);
    const observerElement = document.createElement('div');

    this.element.insertAdjacentElement('afterend', observerElement);
    observer.observe(observerElement);
  }

  renderImages(currentImages) {
    const imagesList = imagesListTemplate(currentImages);
    this.element.innerHTML = imagesList;
  }

  async fetchImages(page) {
    try {
      const { hits } = await imagesService.fetchImages(page);
      this.images = [...this.images, ...hits];
      this.currentImages = this.images;
      this.renderImages(this.images);
    } catch (error) {
      console.log(error);
    }
  }

  init() {
    this.addObserver();
  }
}

const images = new Images('.gallery');
images.init();

const searchHandler = ({ target }) => {
  if (target.name === 'query') {
    images.filterByQuery(target.value);
  }
};

searchForm.addEventListener('input', searchHandler);
