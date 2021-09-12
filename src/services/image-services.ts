import axios from 'axios';
import { REACT_APP_CLIENT_KEY } from '../utils/constant';

export const fetchImages = () => {
  const query = 'landscape';
  const orientation = 'landscape';
  const count = 1;
  const BASE_URL = `https://api.unsplash.com/photos/random?count=${count}&query=${query}&orientation=${orientation}&client_id=${REACT_APP_CLIENT_KEY}`;
  axios
    .get(BASE_URL)
    .then((res) => {
      const images = res.data.map((img: { id: any; urls: { thumb: any; full: any } }) => ({
        id: img.id,
        thumb: img.urls.thumb,
        full: img.urls.full
      }));
      if (images.length > 0) {
        document.body.style.backgroundImage = `url("${images[0].full}")`;
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundSize = 'cover';
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
