import imagesService from '../../services/apiService';
import imagesListTemplate from '../../templates/imagesList.hbs';

const imagesListRef = document.querySelector('.gallery');
const listObserverRef = document.querySelector('.list-observer');
let currentPage = 0;
let images = [];

const observerOptions = {
  rootMargin: '100px',
};

const observerHandler = entries => {
  if (entries[0].isIntersecting) {
    currentPage += 1;
    fetchImages(currentPage);
  }
};

const observer = new IntersectionObserver(observerHandler, observerOptions);
observer.observe(listObserverRef);

const renderList = images => {
  const imagesList = imagesListTemplate(images);
  console.log(imagesList);
  imagesListRef.insertAdjacentHTML('beforeend', imagesList);
};

const fetchImages = async page => {
  try {
    const { hits } = await imagesService.fetchImages(page);
    images = [...images, ...hits];
    renderList(images);
  } catch (error) {
    console.log(error);
  }
};
