const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '21327574-a9e02909bbc977a72a3d5931a';

// export default {
//   async fetchImages(page = 1, query = '') {
//     const rawResult = await fetch(
//       `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${query}&page=${page}&per_page=12&key=${API_KEY}`,
//     );

//     if (!rawResult.ok) {
//       throw rawResult;
//     }

//     const result = await rawResult.json();
//     return result;
//   },
// };

export default class PixabayApi {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImages() {
    const rawResult = await fetch(
      `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`,
    );
    const result = await rawResult.json();
    return result.hits;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
