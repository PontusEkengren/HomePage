import axios from 'axios';

export const loadGame = () => {
  return axios.post('https://api.noopschallenge.com/pathbot/start');
};
