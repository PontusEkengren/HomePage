import axios from 'axios';
const { REACT_APP_LABYRINTH_SERVER } = process.env;

export const loadGame = () => {
  return axios.post('https://api.noopschallenge.com/pathbot/start');
};
export const loadLeaderBoard = () => {
  console.log('dis', `${REACT_APP_LABYRINTH_SERVER}/labyrinth`)
  return axios.get(`${REACT_APP_LABYRINTH_SERVER}/labyrinth`);
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
