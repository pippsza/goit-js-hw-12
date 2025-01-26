import axios from 'axios';

export const fetchPhotosByQuery = async (searchedQuery, currentPage) => {
  const axiosOptions = {
    params: {
      q: searchedQuery,
      key: '48288384-c73711b953ffb418f1a2cd50e',
      image_type: 'photo',
      orientation: 'horizontal',
      page: currentPage,
      per_page: 15,
      safesearch: 'true',
    },
  };

  const response = await axios.get(`https://pixabay.com/api/`, axiosOptions);

  return response.data;
};
