const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '21327574-a9e02909bbc977a72a3d5931a';

export default {
  async fetchImages(page = 1) {
    const rawResult = await fetch(
      `${BASE_URL}/?image_type=photo&orientation=horizontal&page=${page}&per_page=12&key=${API_KEY}`,
    );

    if (!rawResult.ok) {
      throw rawResult;
    }

    const result = await rawResult.json();
    return result;

    // return fetch(`${BASE_URL}/?key=${API_KEY}`).then(res => res.json());
  },
};
