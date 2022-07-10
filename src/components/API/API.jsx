const API_KEY = '27573570-f402641a622ce8865d801365d';

function searchingApi(searchQuery, pageNumber) {
  return fetch(
    `https://pixabay.com/api/?q=${searchQuery}&page=${pageNumber}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error(`Ошибка :(`));
  });
}
export default searchingApi;
