import styled from 'styled-components';

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

export const ContainerCenterColumn = styled.div`
  display: flex;
  justify-content: center;
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
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Dialog = styled.div`
  height: 90px;
`;

export const TextWindow = styled.div`
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
`;
