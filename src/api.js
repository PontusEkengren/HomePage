import axios from 'axios';

export const loadGame = () => {
  return axios.post('https://api.noopschallenge.com/pathbot/start');
};
export const move = (data, direction) => {
  return axios.post(
    `https://api.noopschallenge.com${data.locationPath}`,
    { direction },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};
