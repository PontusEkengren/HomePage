import axios from 'axios';

export const postStartGameCall = () => {
  return axios.post('https://api.noopschallenge.com/pathbot/start');
};
