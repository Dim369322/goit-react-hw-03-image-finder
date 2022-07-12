const API_KEY = '27573570-f402641a622ce8865d801365d';

export const searchingApi = async (searchQuery, pageNumber) => {
  const response = await fetch(
    `https://pixabay.com/api/?q=${searchQuery}&page=${pageNumber}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  if (response.ok) {
    return await response.json();
  }
  return Promise.reject(new Error(`Ошибка :(`));
};
