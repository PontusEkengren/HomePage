import styled from 'styled-components';

export const Canvas = styled.canvas`
  background: DimGray;
`;

export const colours = {
  red: '#e60000',
  green: '#006400',
  black: '#000000',
  grey: '#808080',
};

export const Image = styled.img`
  margin-right: 12px;
  width: 42px;
  height: 42px;
`;

export const ContainerSpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 160px;
`;

export const ContainerCenter = styled.div`
  display: flex;
  justify-content: center;
  width: 160px;
`;

export const ContainerCenterColumn = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  outline: none;
  ${props => props.height && `height: ${props.height}px`};
`;

export const ContainerDialog = styled.div`
  min-width: 55%;
  max-width: 75%;
  outline: none;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Dialog = styled.div`
  height: 90px;
`;

export const ContainerLeaderboard = styled.div`
  margin: 40px;
`;

export const LeaderboardHeader = styled.h1`
  text-align: center;
`;

export const LeaderboardSore = styled.div`
  margin-left: 40px;
`;

export const Leaderboard = styled.div`
  justify-content: space-between;
  display: flex;
  margin-top: 12px;
`;

export const TextWindow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
`;
